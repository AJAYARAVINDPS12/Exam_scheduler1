const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json()); // Middleware to parse JSON request bodies
// Connect to MongoDB
mongoose.connect("mongodb+srv://ajayaravindps:ajay2006@examscheduler.zidke.mongodb.net/examscheduler?retryWrites=true&w=majority&appName=examscheduler")
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// User Schema
const UserSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String
});

const User = mongoose.model('users', UserSchema); // Collection name: 'users'

// Exam Schema
const ExamSchema = new mongoose.Schema({
    examName: String,
    subject: String,
    date: String,
    time: String,
    description: String,
    createdBy: String // User's email (for reference)
});

const Exam = mongoose.model('exams', ExamSchema); // Collection name: 'exams'

// ✅ Signup Route
app.post('/signup', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ error: 'User already exists' });

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword });

        await newUser.save();
        res.json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to register user' });
    }
});

// ✅ Login Route
app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ error: 'Invalid email or password' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ error: 'Invalid email or password' });

        const token = jwt.sign({ id: user._id, email: user.email }, "your_jwt_secret", { expiresIn: "1h" });

        res.json({ message: 'Login successful', token, user: { name: user.name, email: user.email } });
    } catch (error) {
        res.status(500).json({ error: 'Failed to login' });
    }
});

// ✅ Schedule Exam Route
app.post('/schedule-exam', async (req, res) => {
    try {
        console.log("Received request:", req.body);

        const { examName, subject, date, time, description, createdBy } = req.body;

        if (!examName || !subject || !date || !time || !createdBy) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const newExam = new Exam({ examName, subject, date, time, description, createdBy });
        await newExam.save();

        console.log("Exam scheduled successfully:", newExam);
        res.status(201).json({ message: "Exam scheduled successfully" });
    } catch (error) {
        console.error("Error scheduling exam:", error);
        res.status(500).json({ error: "Failed to schedule exam" });
    }
});

// ✅ Get All Scheduled Exams Route
// ✅ Get All Scheduled Exams for Logged-in User
app.get('/exams', async (req, res) => {
    try {
        const { createdBy } = req.query;
        if (!createdBy) {
            return res.status(400).json({ error: "User email is required" });
        }

        const exams = await Exam.find({ createdBy });
        res.json(exams); // Send all exams (past & upcoming)
    } catch (error) {
        console.error("Error fetching exams:", error);
        res.status(500).json({ error: 'Failed to fetch exams' });
    }
});

// ✅ Get Upcoming Exam Notifications
app.get('/notifications', async (req, res) => {
    try {
        const { createdBy } = req.query;
        if (!createdBy) {
            return res.status(400).json({ error: "User email is required" });
        }

        // Get today's date in YYYY-MM-DD format
        const today = new Date().toISOString().split('T')[0]; 
        console.log("📅 Today's date:", today);

        // Fetch upcoming exams
        const exams = await Exam.find({ createdBy, date: { $gte: today } });
        console.log("📌 Upcoming exams:", exams);

        // Format notifications
        const notifications = exams.map(exam => ({
            id: exam._id,
            message: `📢 Upcoming Exam: ${exam.examName} on ${exam.date} at ${exam.time}`,
            type: 'info',
            details: `📖 Subject: ${exam.subject}\n📝 Description: ${exam.description || 'No additional details.'}`
        }));

        res.json(notifications);
    } catch (error) {
        console.error("❌ Error fetching notifications:", error);
        res.status(500).json({ error: 'Failed to fetch notifications' });
    }
});


// Start Server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

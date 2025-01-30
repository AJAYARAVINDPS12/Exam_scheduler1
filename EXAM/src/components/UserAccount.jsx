import React, { useState } from 'react';
import './UserAccount.css';

const UserAccount = ({ user, onUpdateUser }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [updatedUser, setUpdatedUser] = useState({ ...user });
    const [updateMessage, setUpdateMessage] = useState(null);
    const [profilePic, setProfilePic] = useState(user.profilePicture || 'https://via.placeholder.com/150');
    const [changePassword, setChangePassword] = useState(false);
    const [passwordData, setPasswordData] = useState({ currentPassword: '', newPassword: '' });

    const handleEditClick = () => {
        setIsEditing(true);
        setUpdateMessage(null);
    };

    const handleSaveClick = async () => {
        try {
            // Simulate API call (replace with your actual API call)
            await new Promise(resolve => setTimeout(resolve, 500));
            onUpdateUser(updatedUser);
            setIsEditing(false);
            setUpdateMessage({ type: 'success', message: 'Account updated successfully!' });
        } catch (error) {
            console.error("Error updating account:", error);
            setUpdateMessage({ type: 'error', message: 'Error updating account. Please try again.' });
        }
    };

    const handlePasswordSave = async () => {
        try {
            // Simulate API call for changing password
            await new Promise(resolve => setTimeout(resolve, 500));
            setChangePassword(false);
            setPasswordData({ currentPassword: '', newPassword: '' });
            setUpdateMessage({ type: 'success', message: 'Password changed successfully!' });
        } catch (error) {
            console.error("Error changing password:", error);
            setUpdateMessage({ type: 'error', message: 'Error changing password. Please try again.' });
        }
    };

    const handleInputChange = (e) => {
        setUpdatedUser({ ...updatedUser, [e.target.name]: e.target.value });
    };

    const handlePasswordChange = (e) => {
        setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
    };

    const handleProfilePicChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfilePic(reader.result);
                setUpdatedUser({ ...updatedUser, profilePicture: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    if (!user) {
        return <div className="no-user">No user data available. Please login.</div>;
    }

    return (
        <div className="account-container">
            <div className="account-box">
                <h2 className="account-header">My Account</h2>
                {updateMessage && (
                    <div className={`update-message ${updateMessage.type}`}>
                        {updateMessage.message}
                    </div>
                )}
                <div className="profile-picture-container">
                    <img src={profilePic} alt="Profile" className="profile-picture" />
                    <div className="change-pic-button">
                        <label htmlFor="file-upload" className="upload-label">Change Picture</label>
                        <input type="file" id="file-upload" className="file-upload" onChange={handleProfilePicChange} />
                    </div>
                </div>

                {isEditing ? (
                    <div className="edit-form">
                        <div className="form-group">
                            <label htmlFor="firstName">First Name:</label>
                            <input type="text" id="firstName" name="firstName" value={updatedUser.firstName || ''} onChange={handleInputChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="lastName">Last Name:</label>
                            <input type="text" id="lastName" name="lastName" value={updatedUser.lastName || ''} onChange={handleInputChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="username">Username:</label>
                            <input type="text" id="username" name="username" value={updatedUser.username || ''} onChange={handleInputChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email:</label>
                            <input type="email" id="email" name="email" value={updatedUser.email || ''} onChange={handleInputChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="gender">Gender:</label>
                            <select id="gender" name="gender" value={updatedUser.gender || ''} onChange={handleInputChange}>
                                <option value="">Select</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="bio">Bio:</label>
                            <textarea id="bio" name="bio" value={updatedUser.bio || ''} onChange={handleInputChange} />
                        </div>
                        <div className="form-buttons">
                            <button className="save-button" onClick={handleSaveClick}>Save</button>
                            <button className="cancel-button" onClick={() => setIsEditing(false)}>Cancel</button>
                        </div>
                    </div>
                ) : (
                    <div className="user-info">
                        <p><strong>First Name:</strong> {user.firstName || 'N/A'}</p>
                        <p><strong>Last Name:</strong> {user.lastName || 'N/A'}</p>
                        <p><strong>Username:</strong> {user.username || 'N/A'}</p>
                        <p><strong>Email:</strong> {user.email || 'N/A'}</p>
                        <p><strong>Gender:</strong> {user.gender || 'N/A'}</p>
                        <p><strong>Bio:</strong> {user.bio || 'N/A'}</p>
                        <button className="edit-button" onClick={handleEditClick}>Edit Profile</button>
                    </div>
                )}

                {changePassword ? (
                    <div className="change-password-form">
                        <div className="form-group">
                            <label htmlFor="currentPassword">Current Password:</label>
                            <input
                                type="password"
                                id="currentPassword"
                                name="currentPassword"
                                value={passwordData.currentPassword}
                                onChange={handlePasswordChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="newPassword">New Password:</label>
                            <input
                                type="password"
                                id="newPassword"
                                name="newPassword"
                                value={passwordData.newPassword}
                                onChange={handlePasswordChange}
                            />
                        </div>
                        <div className="form-buttons">
                            <button className="save-button" onClick={handlePasswordSave}>Change Password</button>
                            <button className="cancel-button" onClick={() => setChangePassword(false)}>Cancel</button>
                        </div>
                    </div>
                ) : (
                    <button className="change-password-button" onClick={() => setChangePassword(true)}>Change Password</button>
                )}
            </div>
        </div>
    );
};

export default UserAccount;

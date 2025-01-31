import React from 'react'
import "../../css/SignUp.css"
import {Link} from "react-router-dom"
import { Link } from "react-router-dom"

const SignUp = ()=>{
  return(
    <div className="body">
    <div className="center">
const SignUp = () => {
   return (
      <div className="body">
         <div className="center">
            <div class="text">
               Login Form
            </div>
            <form action="#">
            <form action="http://localhost:">
               <div className="data">
                  <label>Email or Phone</label>
                  <input type="text" required/>
                  <input type="text" required />
               </div>
               <div className="data">
                  <label>Password</label>
                  <input type="password" required/>
                  <input type="password" required />
               </div>
               <div className="forgot-pass">
                  <a href="#">Forgot Password?</a> 
                  <a href="#">Forgot Password?</a>
               </div>
               <div className="btn">
                  <div className="inner"></div>
@@ -30,7 +30,7 @@ const SignUp = ()=>{
               </div>
            </form>
         </div>
         </div>
  )
      </div>
   )
}
export default SignUp;
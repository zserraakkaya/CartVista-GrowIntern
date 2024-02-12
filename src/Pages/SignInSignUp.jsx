// SignInSignUp.js

import React from "react";
import "./SignInSignUp.css";

const SignInSignUp = () => {
  return (
    <div className="sign-in-sign-up-container">
      <div className="sign-in">
        <h2>Sign In</h2>
        <form>
          <label>Email</label>
          <input type="email" placeholder="Enter your email" />
          <label>Password</label>
          <input type="password" placeholder="Enter your password" />
          <button type="submit">Sign In</button>
        </form>
      </div>
      <div className="sign-up">
        <h2>Sign Up</h2>
        <form>
          <label>First Name</label>
          <input type="text" placeholder="Enter your first name" />
          <label>Last Name</label>
          <input type="text" placeholder="Enter your last name" />
          <label>Email</label>
          <input type="email" placeholder="Enter your email" />
          <label>Password</label>
          <input type="password" placeholder="Enter your password" />
          <label>Password Again</label>
          <input type="password" placeholder="Enter your password again" />
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default SignInSignUp;

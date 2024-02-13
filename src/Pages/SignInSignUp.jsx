import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// css
import "./SignInSignUp.css";
// useAuth Context for signed in users
import { useAuth } from "../Context/AuthContext";

const SignInSignUp = () => {
  const { signIn } = useAuth();

  const navigate = useNavigate();

  const [signInData, setSignInData] = useState({
    signInEmail: "",
    signInPassword: "",
  });

  const [signUpData, setSignUpData] = useState({
    firstName: "",
    lastName: "",
    signUpEmail: "",
    signUpPassword: "",
    signUpPasswordAgain: "",
  });

  const handleSignInChange = (e) => {
    setSignInData({
      ...signInData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignUpChange = (e) => {
    setSignUpData({
      ...signUpData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignInSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:4000/api/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: signInData.signInEmail,
          password: signInData.signInPassword,
        }),
      });

      if (response.ok) {
        console.log("Sign in successful");
        const responseData = await response.json();
        signIn(responseData);
        navigate("/");
      } else {
        const errorData = await response.json();
        console.error("Sign in error:", errorData.error);
      }
    } catch (error) {
      console.error("Error during sign-in:", error);
    }
  };

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:4000/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: signUpData.firstName,
          lastName: signUpData.lastName,
          email: signUpData.signUpEmail,
          password: signUpData.signUpPassword,
        }),
      });

      if (response.ok) {
        console.log("Sign up successful");
      } else {
        const errorData = await response.json();
        console.error("Sign up error:", errorData.error);
      }
    } catch (error) {
      console.error("Error during sign-up:", error);
    }
  };

  return (
    <div className="sign-in-sign-up-container">
      <div className="sign-in">
        <h2>Sign In</h2>
        <form onSubmit={handleSignInSubmit}>
          <label>Email</label>
          <input
            type="email"
            name="signInEmail"
            placeholder="Enter your email"
            value={signInData.signInEmail}
            onChange={handleSignInChange}
          />
          <label>Password</label>
          <input
            type="password"
            name="signInPassword"
            placeholder="Enter your password"
            value={signInData.signInPassword}
            onChange={handleSignInChange}
          />
          <button type="submit">Sign In</button>
        </form>
      </div>
      <div className="sign-up">
        <h2>Sign Up</h2>
        <form onSubmit={handleSignUpSubmit}>
          <label>First Name</label>
          <input
            type="text"
            name="firstName"
            placeholder="Enter your first name"
            value={signUpData.firstName}
            onChange={handleSignUpChange}
          />
          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            placeholder="Enter your last name"
            value={signUpData.lastName}
            onChange={handleSignUpChange}
          />
          <label>Email</label>
          <input
            type="email"
            name="signUpEmail"
            placeholder="Enter your email"
            value={signUpData.signUpEmail}
            onChange={handleSignUpChange}
          />
          <label>Password</label>
          <input
            type="password"
            name="signUpPassword"
            placeholder="Enter your password"
            value={signUpData.signUpPassword}
            onChange={handleSignUpChange}
          />
          <label>Password Again</label>
          <input
            type="password"
            name="signUpPasswordAgain"
            placeholder="Enter your password again"
            value={signUpData.signUpPasswordAgain}
            onChange={handleSignUpChange}
          />
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default SignInSignUp;

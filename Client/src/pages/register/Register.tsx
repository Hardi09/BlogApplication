import "./register.css";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import config from "../../../config";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };

  const header = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const isEmailValid = (input: string) => {
    // Regular expression pattern for a valid email
    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    return emailPattern.test(input);
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Reset error messages
    setFirstNameError("");
    setLastNameError("");
    setEmailError("");
    setPasswordError("");

    // Regular expression pattern for a valid first name (only alphabetic characters)
    const namePattern = /^[A-Za-z]+$/;

    // Regular expression pattern for a special character
    const specialCharacterPattern = /[@#$%^&+=]/;

    // Basic client-side validation
    if (!firstName) {
      setFirstNameError("First name is required");
      return;
    } else if (!namePattern.test(firstName)) {
      setFirstNameError("First name should contain only alphabetic characters");
      return;
    }

    if (!lastName) {
      setLastNameError("Last name is required");
      return;
    } else if (!namePattern.test(lastName)) {
      setLastNameError("Last name should contain only alphabetic characters");
      return;
    }

    if (!isEmailValid(email)) {
      setEmailError("Invalid email address");
      return;
    }
    if (!password) {
      setPasswordError("Password is required");
      return;
    }
    if (firstNameError || lastNameError || emailError || passwordError) {
      return;
    }

    try {
      const response = await axios.post(
        `${config.SERVER_URL}/api/users/signup`,
        { firstName, lastName, email, password },
        header
      );
      const token = response.data.token;
      localStorage.setItem("token", token);
      console.log(response);
      navigate("/login");
    } catch (error) {
      // Handle registration errors, e.g., display an error message.
      console.error("Registration failed:", error);
    }
  };

  return (
    <div className="register">
      <span className="registerTitle">Register</span>
      <form className="registerForm" onSubmit={(e) => handleRegister(e)}>
        <label>First Name</label>
        <input
          className="registerInput"
          type="text"
          placeholder="Enter your first name..."
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        {firstNameError && <div className="error">{firstNameError}</div>}

        <label>Last Name</label>
        <input
          className="registerInput"
          type="text"
          placeholder="Enter your last name..."
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        {lastNameError && <div className="error">{lastNameError}</div>}

        <label>Email</label>
        <input
          className={`registerInput ${emailError && "errorInput"}`}
          type="text"
          placeholder="Enter your email..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {emailError && <div className="error">{emailError}</div>}

        <label>Password</label>
        <input
          className={`registerInput ${passwordError && "errorInput"}`}
          type="password"
          placeholder="Enter your password..."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {passwordError && <div className="error">{passwordError}</div>}

        <input
          value="Register"
          type="submit"
          className="registerButton"
        ></input>
      </form>
      <button className="registerLoginButton" onClick={handleLoginClick}>
        Login
      </button>
    </div>
  );
};

export default Register;

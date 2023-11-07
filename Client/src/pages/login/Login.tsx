import "./login.css";
import axios, { AxiosError } from "axios";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import config from "../../../config";
import { UserType } from "../../models/User";
import AuthContext, { AuthContextType } from "../../context/AuthContext";

interface CustomError extends Error {
  response: {
    status: number;
  };
}

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loginError, setLoginError] = useState(""); // Add login error state
  const navigate = useNavigate();

  const { login } = useContext(
    AuthContext
  ) as AuthContextType;

  const handleRegisterClick = () => {
    navigate("/register");
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

  const clearErrors = () => {
    setEmailError("");
    setPasswordError("");
    setLoginError("");
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    clearErrors(); // Clear any previous errors

    if (!isEmailValid(email)) {
      setEmailError("Invalid email address");
      return;
    }
    if (!email) {
      setEmailError("Please enter email");
      return;
    }
    if (!password) {
      setPasswordError("Password is required");
      return;
    }

    try {
      const response = await axios.post(
        `${config.SERVER_URL}/api/users/login`,
        { email, password },
        header
      );

      const data = response.data;
      localStorage.setItem("token", data.token);
      const user : UserType = {
        _id: data.id,
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
      }
      login(user);
      navigate("/");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const customError = error as AxiosError<CustomError>;
        if (customError.response && customError.response.status === 400) {
          setLoginError("User is not registered. Please register.");
        } else {
          setLoginError("Login failed. Please check your credentials.");
          console.error("Login failed:", error);
        }
      } else {
        setLoginError("Login failed. Please check your credentials.");
        console.error("Login failed:", error);
      }
    }
  };

  return (
    <div className="login">
      <span className="loginTitle">Login</span>
      <form className="loginForm" onSubmit={(e) => handleLogin(e)}>
        <label>Email</label>
        <input
          className={`loginInput ${emailError && "errorInput"}`}
          type="text"
          placeholder="Enter your email..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {emailError && <div className="error">{emailError}</div>}

        <label>Password</label>
        <input
          className={`loginInput ${passwordError && "errorInput"}`}
          type="password"
          placeholder="Enter your password..."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {passwordError && <div className="error">{passwordError}</div>}

        <input type="submit" value="Login" className="loginButton"></input>
      </form>
      <button className="loginRegisterButton" onClick={handleRegisterClick}>
        Register
      </button>
      {loginError && <div className="error">{loginError}</div>} {/* Display login error */}
    </div>
  );
};

export default Login;

import React, { useState, useEffect } from "react";
import { axiosClient } from "../utils/axiosClient";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import "./Signup.css"; 
function Signup() {
  document.title = "Sign Up";
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (localStorage.getItem("User")) {
      navigate("/");
    }
  }, [navigate]);

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      await axiosClient.post("/auth/signup", { username, email, password });
      toast.success("Signup Successful!");
      navigate("/login");
    } catch (error) {
      toast.error("Something went wrong!");
      console.log(error.message);
    }
  };

  return (
    <div className="signup-container">
      <div className="background-animate"></div>

      <div className="signup-box">
        <h1 className="signup-title">Create Account</h1>
        <div className="input-group">
          <input
            type="text"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
            className="input-field"
          />
        </div>
        <div className="input-group">
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            className="input-field"
          />
        </div>
        <div className="input-group">
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            className="input-field"
          />
        </div>
        <button onClick={submitForm} className="neon-button">Sign Up</button>
        <p className="signup-text">
          Already have an account? <a href="/login" className="signup-link">Login</a>
        </p>
      </div>
    </div>
  );
}

export default Signup;

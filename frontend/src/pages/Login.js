import React, { useEffect, useState, useRef } from "react";
import { axiosClient } from "../utils/axiosClient";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import LoadingBar from "react-top-loading-bar";
import "./Login.css"; 

document.title = "Login";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const ref = useRef(null);

  
  useEffect(() => {
    if (localStorage.getItem("User")) {
      navigate("/");
    }
  }, [navigate]);

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      ref.current.staticStart();
      const response = await axiosClient.post("/auth/login", {
        email,
        password,
      });

      if (response.data.statusCode !== 201) {
        toast.error(response.data.message);
        return;
      }

      toast.success("Successfully Logged In 🚀");
      localStorage.setItem("User", JSON.stringify(response.data.message));
      ref.current.complete();
      navigate("/");
    } catch (error) {
      console.log(error.message);
      toast.error("Login failed. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <LoadingBar color="orange" ref={ref} />

      {}
      <div className="background-animate"></div>

      {}
      <div className="login-box">
        <h1 className="login-title">⚡ EXPENSE TRACKER ⚡</h1>

        <div className="input-group">
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-field"
          />
        </div>

        <div className="input-group">
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field"
          />
        </div>

        {}
        <button onClick={submitForm} className="neon-button">
           LOGIN
        </button>

        {}
        <p className="signup-text">
          New here?{" "}
          <a href="/signup" className="signup-link">
            Create an Account
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;

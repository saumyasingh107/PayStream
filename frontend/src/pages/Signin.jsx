import axios from "axios";
import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const Data = {
        username: email,
        password: password,
      };
      const response = await axios.post(
        "http://localhost:3000/api/v1/user/signin",
        Data
      );
      if (response.status == 200) {
        setEmail("");
        setPassword("");
      }
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    } catch (err) {
      console.log("error while loging in");
    }
  };
  return (
    <div>
      <h1>Sign In</h1>
      <h4>Enter your credentials to access your account</h4>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="email"
          name=""
          id="email"
          value={email}
        />
        <br />
        <label htmlFor="passwrod">Password</label>
        <input
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="password"
          id="password"
          value={password}
        />
        <br />
        <button>Sign In</button>
        <p>not have an account?</p>
        <Link to="/signup">Sign in</Link>
      </form>
    </div>
  );
};

export default Signin;

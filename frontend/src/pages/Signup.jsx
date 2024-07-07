import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const Data = {
        username: email,
        password: password,
        firstname: firstname,
        lastname: lastname,
      };
      const response = await axios.post(
        "http://localhost:3000/api/v1/user/signup",
        Data
      );
      if (response.status == 200) {
        setEmail("");
        setFirstname("");
        setLastname("");
        setPassword("");
      }
    } catch (err) {
      console.log("error login in");
    }
  };

  return (
    <div>
      <h1 className="font-bold">Sign UP</h1>
      <h4>Enter your information to create an account</h4>
      <form onSubmit={handleSubmit}>
        <label htmlFor="firstname">First Name</label>
        <input
          className=" border border-black"
          type="text"
          id="firstname"
          placeholder="firstname"
          onChange={(e) => setFirstname(e.target.value)}
          value={firstname}
        />
        <br />
        <label htmlFor="lastname">Last Name</label>
        <input
          className=" border border-black"
          type="text"
          id="firstname"
          placeholder="lastname"
          onChange={(e) => setLastname(e.target.value)}
          value={lastname}
        />
        <br />
        <label htmlFor="Email">Email</label>
        <input
          className=" border border-black"
          type="text"
          id="firstname"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <br />
        <label htmlFor="password">Password</label>
        <input
          className=" border border-black"
          type="text"
          id="firstname"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <br />
        <button>Sign Up</button>
        <p>Already have an account</p>{" "}
        <Link className="underline underline-offset-2" to="/signin">
          Login
        </Link>
      </form>
    </div>
  );
};

export default Signup;

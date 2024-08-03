import axios from "axios";
import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { SubHeading } from "../components/SubHeading";
import { BottomWarning } from "../components/BottomWarning";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
        "https://paystream-1.onrender.com/api/v1/user/signin",
        Data
      );
      if (response.status == 200) {
        setEmail("");
        setPassword("");
        localStorage.setItem("firstName", response.data.firstName);
        localStorage.setItem("token", response.data.token);
        toast.success("Logged In");
        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);
      }
    } catch (err) {
      const errmsg =
        err.response && err.response.data && err.response.data.message
          ? err.response.data.message
          : "An error occurred. Please try again.";
      toast.error(errmsg);
    }
  };
  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-[30rem] text-center p-2 h-[28rem] px-4">
          <Heading label={"Sign in"} />
          <div className="pt-3">
            <SubHeading
              label={"Enter your credentials to access your account"}
            />
          </div>
          <form onSubmit={handleSubmit}>
            <div>
              <div className="text-sm font-medium text-left py-2">Email</div>
              <input
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="email"
                name=""
                id="email"
                value={email}
                className="w-full my-1 px-2 py-1 border rounded border-slate-200"
              />
            </div>
            <div>
              <div className="text-sm font-medium text-left py-2">Password</div>

              <input
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="password"
                id="password"
                value={password}
                className="w-full my-1 px-2 py-1 border rounded border-slate-200"
              />
            </div>
            <div className="pt-4 mt-7">
              <button
                className="w-full text-white bg-gray-800 hover:bg-gray-900
              focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium
              rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
              >
                Sign In
              </button>
            </div>
            <BottomWarning
              label={"Don't have an account?"}
              buttonText={"Sign up"}
              to={"/"}
            />
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Signin;

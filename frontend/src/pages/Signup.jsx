import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Heading } from "../components/Heading";
import { SubHeading } from "../components/SubHeading";
import { BottomWarning } from "../components/BottomWarning";
import { toast, ToastContainer } from "react-toastify";

const Signup = () => {
  const [firstname, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

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
        "https://paystream-1.onrender.com/api/v1/user/signup",
        Data
      );
      if (response.status == 200) {
        setEmail("");
        setfirstname("");
        setlastname("");
        setPassword("");
        localStorage.setItem("token", response.data.token);
        toast.success("Registeration Successful");
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
        <div className="rounded-lg bg-white w-[30rem] text-center p-2 h-max px-4">
          <Heading label={"Sign Up"} />
          <div className="my-2">
            <SubHeading
              label={"Enter your credentials to register an account"}
            />
          </div>

          <form onSubmit={handleSubmit}>
            <div>
              <div className="text-sm font-medium text-left py-2">
                First Name
              </div>

              <input
                type="text"
                id="firstname"
                placeholder="firstname"
                onChange={(e) => setfirstname(e.target.value)}
                value={firstname}
                className="w-full px-2 my-1 py-1 border rounded border-slate-200"
              />
            </div>
            <div>
              <div className="text-sm font-medium text-left py-2">
                Last Name
              </div>

              <input
                type="text"
                id="firstname"
                placeholder="lastname"
                onChange={(e) => setlastname(e.target.value)}
                value={lastname}
                className="w-full my-1 px-2 py-1 border rounded border-slate-200"
              />
            </div>
            <div>
              <div className="text-sm font-medium text-left py-2">Email</div>

              <input
                className="w-full px-2 my-1 py-1 border rounded border-slate-200"
                type="text"
                id="firstname"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>
            <div>
              <div className="text-sm font-medium text-left py-2">Password</div>

              <input
                type="password"
                id="firstname"
                placeholder="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className="w-full my-1 px-2 py-1 border rounded border-slate-200"
              />
            </div>
            <div className="pt-4">
              <button
                className="w-full text-white bg-gray-800 hover:bg-gray-900
              focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium
              rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
              >
                Sign Up
              </button>
            </div>
            <BottomWarning
              label={"Already a user?"}
              buttonText={"Sign in"}
              to={"/signin"}
            />
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Signup;

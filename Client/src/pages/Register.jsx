import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import { toast } from "react-toastify";

function Register() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((pre) => ({
      ...pre,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:3001/api/v1/register",
        values
      );
      toast.success(res.data.message);
      setValues({ username: "", email: "", password: "" });
      navigate('/login')
    } catch (error) {
      console.log("Error in Register: ", error);
      if (error.response) {
        const message =
          error.response.data.error ||
          error.response.data.message ||
          error.response.data.errors?.join(", ") ||
          "Something went wrong!";

        toast.error(message);
      } else {
        toast.error("No response from server!");
      }
    }
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <div className="w-[60vw] md:w-[50vw] lg:w-[30vw]">
        <h1 className="text-3xl font-bold text-center mb-1 text-blue-800">
          Taskify
        </h1>
        <h3 className="text-center font-semibol text-zinc-900">
          Register With Taskify
        </h3>
      </div>
      <div className="w-[60vw] md:w-[50vw] lg:w-[30vw] mt-4">
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="text"
            className="border rounded px-4 py-1 border-zinc-400 w-[100%] outline-none"
            placeholder="Username"
            name="username"
            value={values.username}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            className="border rounded px-4 py-1 border-zinc-400 w-[100%] outline-none"
            placeholder="Email"
            name="email"
            value={values.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            className="border rounded px-4 py-1 border-zinc-400 w-[100%] outline-none"
            placeholder="Password"
            name="password"
            value={values.password}
            onChange={handleChange}
            required
          />
          <button className="bg-blue-800 text-white font-semibold py-2 rounded hover-bg-blue-700 transition-all duration-300">
            Login
          </button>
          <p className="text-center font-semibold text-gray-900">
            Already have a account?{" "}
            <Link
              className="text-blue-400 underline hover:text-blue-800 transition-all duration-300"
              to={"/login"}
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;

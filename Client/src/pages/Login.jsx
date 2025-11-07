import React from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
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
        "http://localhost:3001/api/v1/login",
        values,
        {withCredentials: true}
      );
      localStorage.setItem("userLoggedIn","yes");
      navigate('/dashboard')
      toast.success(res.data.message);
      setValues({ email: "", password: "" });
    } catch (error) {
      console.log("Error in Login:", error);
      toast.error(error.response.data.error);
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
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            className="border rounded px-4 py-1 border-zinc-400 w-[100%] outline-none"
            placeholder="Email"
            name="email"
            onChange={handleChange}
            value={values.email}
            required
          />
          <input
            type="password"
            className="border rounded px-4 py-1 border-zinc-400 w-[100%] outline-none"
            placeholder="Password"
            name="password"
            onChange={handleChange}
            value={values.password}
            required
          />
          <button className="bg-blue-800 text-white font-semibold py-2 rounded hover-bg-blue-700 transition-all duration-300">
            Login
          </button>
          <p className="text-center font-semibold text-gray-900">
            Don't have an account?{" "}
            <Link
              className="text-blue-400 underline hover:text-blue-800 transition-all duration-300"
              to={"/register"}
            >
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;

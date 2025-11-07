import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { IoLogOutOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

function Header({ setAddTask }) {
  const navigate = useNavigate();

  const logout = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3001/api/v1/logout",
        {},
        { withCredentials: true }
      );
      toast.success(res.data.message);
      localStorage.removeItem("userLoggedIn");
      navigate("/login");
    } catch (error) {
      console.log("Error in logout");
      toast.error("Logout failed");
    }
  };

  return (
    <div className="flex px-12 py-4 items-center justify-between border-b">
      <div>
        <h1 className="text-2xl text-blue-800 font-semibold">Taskify</h1>
      </div>

      <div className="flex gap-8">
        <button
          type="button"
          className="hover:text-blue-800 transition-all duration-300"
          onClick={() => setAddTask(true)}
        >
          Add Task
        </button>

        <button
          className="text-2xl hover:text-red-600 transition-all duration-300"
          onClick={logout}
        >
          <IoLogOutOutline />
        </button>
      </div>
    </div>
  );
}

export default Header;

import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { IoMdClose } from "react-icons/io"; // 👈 added react-icon import

function EditTask({ data, setEditTask, setRefresh }) {
  const [value, setValues] = useState({
    title: data.title,
    priority: data.priority,
    status: data.status, 
    description: data.description,
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
      let res = await axios.put(
        `http://localhost:3001/api/v1/editTask/${data._id}`,
        value,
        { withCredentials: true }
      );

      toast.success("✅ Task Updated Successfully!");

      setEditTask(false);
      setRefresh((prev) => !prev);
    } catch (error) {
      console.log("Error in Task Editing: ", error);
      toast.error("❌ Failed to update task!");
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(
        `http://localhost:3001/api/v1/deleteTask/${data._id}`,
        { withCredentials: true }
      );
      toast.success("🗑️ Task Deleted!");
      setEditTask(false);
      setRefresh((prev) => !prev);
    } catch (error) {
      console.log("Error deleting task:", error);
      toast.error("❌ Failed to delete task!");
    }
  };

  return (
    <div className="bg-white rounded px-4 py-4 w-[40%] shadow-lg animate-fadeIn relative">
      {/* 👇 Cross icon in top-right corner */}
      <button
        onClick={() => setEditTask(false)}
        className="absolute top-3 right-3 text-zinc-500 hover:text-red-600 transition-all"
      >
        <IoMdClose size={24} />
      </button>

      <h1 className="text-center font-semibold text-xl mb-2">Edit Task</h1>
      <hr className="mb-4" />

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          className="border px-2 py-1 rounded border-zinc-300 outline-none"
          placeholder="Title"
          name="title"
          value={value.title}
          onChange={handleChange}
          required
        />

        <div className="flex items-center justify-between gap-4">
          <div className="w-full">
            <h3 className="mb-2">Select Priority</h3>
            <select
              name="priority"
              value={value.priority}
              onChange={handleChange}
              className="border px-2 py-1 rounded border-zinc-300 outline-none w-full"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div className="w-full">
            <h3 className="mb-2">Select Status</h3>
            <select
              name="status"
              value={value.status}
              onChange={handleChange}
              className="border px-2 py-1 rounded border-zinc-300 outline-none w-full"
            >
              <option value="yetToStart">YetToStart</option>
              <option value="InProgress">InProgress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        </div>

        <textarea
          name="description"
          value={value.description}
          onChange={handleChange}
          placeholder="Description"
          className="border px-2 py-1 rounded border-zinc-300 outline-none h-[25vh]"
        ></textarea>

        <div className="flex items-center justify-between gap-4">
          <button
            type="submit"
            className="w-full bg-blue-800 py-2 hover:bg-blue-700 transition-all duration-300 text-white rounded"
          >
            Save Changes
          </button>

          <button
            type="button"
            onClick={handleDelete}
            className="w-full border border-red-500 text-red-500 hover:bg-red-50 py-2 transition-all duration-300 rounded"
          >
            Delete
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditTask;

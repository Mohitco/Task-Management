import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";

function AddTask({ setAddTask, setRefresh }) {
  const [value, setValues] = useState({
    title: "",
    priority: "low",
    status: "yetToStart",
    description: "",
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
      let res = await axios.post(
        "http://localhost:3001/api/v1/addTask",
        value,
        { withCredentials: true }
      );

      toast.success("✅ Task Added Successfully!");

      // reset form
      setValues({
        title: "",
        priority: "low",
        status: "yetToStart",
        description: "",
      });

      // close modal
      setAddTask(false);

      // refresh dashboard
      setRefresh((prev) => !prev);
    } catch (error) {
      console.log("error in Task Creation: ", error);
      toast.error("❌ Failed to add task!");
    }
  };

  const handleCancel = (e) => {
    e.preventDefault();
    setAddTask(false);
  };

  return (
    <div className="bg-white rounded px-4 py-4 w-[40%] shadow-lg animate-fadeIn">
      <h1 className="text-center font-semibold text-xl">Add Task</h1>
      <hr className="mb-4 mt-2" />
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
              <option value="completed">Completed</option>
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
            Add Task
          </button>

          <button
            type="button"
            onClick={handleCancel}
            className="w-full border border-black hover:bg-zinc-100 py-2 transition-all duration-300 text-black rounded"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddTask;

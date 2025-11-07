import React, { useEffect, useState } from "react";
import Header from "../components/Dashboard/Header";
import AddTask from "../components/Dashboard/AddTask";
import SetTitle from "../components/Dashboard/SetTitle";
import YetToStart from "../components/Dashboard/YetToStart";
import InProgress from "../components/Dashboard/InProgress";
import Completed from "../components/Dashboard/Completed";
import EditTask from "../components/Dashboard/EditTask";
import axios from "axios";
import { toast } from "react-toastify";

function Dashboard() {
  const [addTask, setAddTask] = useState(false);
  const [editTask, setEditTask] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [Tasks, setTasks] = useState();
  const [refresh, setRefresh] = useState(false);

  // Fetch all tasks
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await axios.get("http://localhost:3001/api/v1/userDetails", {
          withCredentials: true,
        });
        setTasks(res.data.tasks);
      } catch (error) {
        console.log("Error in getting Task:", error);
        toast.error("❌ Failed to load tasks!");
      }
    };
    fetchDetails();
  }, [refresh]);

  return (
    <div className="w-full relative">
      {/* Header */}
      <div className="bg-white">
        <Header setAddTask={setAddTask} />
      </div>

      {/* Task Sections */}
      <div className="px-12 py-4 flex gap-12 bg-zinc-100 min-h-[89vh]">
        {/* Yet To Start */}
        <div className="w-1/3">
          <SetTitle title={"YetToStart"} />
          <div className="pt-2">
            {Tasks && (
              <YetToStart
                task={Tasks.yetToStart}
                setEditTask={setEditTask}
                setSelectedTask={setSelectedTask}
              />
            )}
          </div>
        </div>

        {/* In Progress */}
        <div className="w-1/3">
          <SetTitle title={"InProgress"} />
          <div className="pt-2">
            {Tasks && (
              <InProgress
                task={Tasks.InProgress}
                setEditTask={setEditTask}
                setSelectedTask={setSelectedTask}
              />
            )}
          </div>
        </div>

        {/* Completed */}
        <div className="w-1/3">
          <SetTitle title={"Completed"} />
          <div className="pt-2">
            {Tasks && (
              <Completed
                task={Tasks.Completed}
                setEditTask={setEditTask}
                setSelectedTask={setSelectedTask}
              />
            )}
          </div>
        </div>
      </div>

      {/* Add Task Modal */}
      {addTask && (
        <>
          <div className="fixed inset-0 bg-zinc-800 opacity-85"></div>
          <div className="fixed inset-0 flex items-center justify-center">
            <AddTask setAddTask={setAddTask} setRefresh={setRefresh} />
          </div>
        </>
      )}

      {/* Edit Task Modal */}
      {editTask && selectedTask && (
        <>
          <div className="fixed inset-0 bg-zinc-800 opacity-85"></div>
          <div className="fixed inset-0 flex items-center justify-center">
            <EditTask
              data={selectedTask}
              setEditTask={setEditTask}
              setRefresh={setRefresh}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default Dashboard;

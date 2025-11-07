import React from "react";
import TaskCard from "./TaskCard";

function Completed({ task, setEditTask, setSelectedTask }) {
  return (
    <div className="flex flex-col gap-2">
      {task &&
        task.map((item, key) => (
          <TaskCard
            key={key}
            data={item}
            setEditTask={setEditTask}
            setSelectedTask={setSelectedTask}
          />
        ))}
    </div>
  );
}

export default Completed;

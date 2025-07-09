import React from "react";
import { useSelector } from "react-redux";
import TaskCard from "./TaskCard";

export default function TaskBuckets() {
  const tasks = useSelector((state) => state.tasks.items);

  const grouped = {
    ongoing: [],
    success: [],
    failure: [],
  };

  tasks.forEach((task) => grouped[task.status]?.push(task));

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {["ongoing", "success", "failure"].map((status) => (
        <div key={status}>
          <h2 className="text-xl font-semibold mb-2 capitalize">{status}</h2>
          {grouped[status].map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      ))}
    </div>
  );
}

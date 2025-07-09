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
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {["ongoing", "success", "failure"].map((status) => (
        <div key={status} className="bg-white p-4 rounded shadow">
          <h2
            className={`text-xl font-semibold mb-3 capitalize ${
              status === "success"
                ? "text-green-600"
                : status === "failure"
                ? "text-red-600"
                : "text-yellow-600"
            }`}
          >
            {status}
          </h2>
          {grouped[status].length > 0 ? (
            grouped[status].map((task) => (
              <TaskCard key={task.id} task={task} />
            ))
          ) : (
            <p className="text-sm text-gray-400 italic">No tasks</p>
          )}
        </div>
      ))}
    </div>
  );
}

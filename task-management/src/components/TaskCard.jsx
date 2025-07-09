import React from "react";
import { useDispatch } from "react-redux";
import { deleteTask, updateTask } from "../store/taskSlice";

export default function TaskCard({ task }) {
  const dispatch = useDispatch();

  const handleToggleComplete = () => {
    dispatch(updateTask({ ...task, completed: !task.completed }));
  };

  const handleDelete = () => {
    dispatch(deleteTask(task.id));
  };

  const getTimeStatus = () => {
    const now = new Date();
    const deadline = new Date(task.deadline);
    const diff = deadline - now;
    if (diff < 0)
      return `Overdue by ${Math.abs(diff / 3600000).toFixed(1)} hrs`;
    return `Due in ${(diff / 3600000).toFixed(1)} hrs`;
  };

  return (
    <div className="border p-3 mb-3 rounded shadow-sm bg-gray-50 hover:bg-gray-100">
      <h3 className="font-semibold text-lg text-gray-800">{task.title}</h3>
      {task.description && (
        <p className="text-sm text-gray-600">{task.description}</p>
      )}
      <p className="text-sm mt-1 font-mono text-blue-700">{getTimeStatus()}</p>
      <div className="mt-2 space-x-2">
        <button
          onClick={handleToggleComplete}
          className={`px-3 py-1 text-sm rounded shadow ${
            task.completed
              ? "bg-yellow-500 text-white"
              : "bg-green-600 text-white"
          }`}
        >
          {task.completed ? "Mark Incomplete" : "Mark Complete"}
        </button>
        <button
          onClick={handleDelete}
          className="px-3 py-1 text-sm bg-red-500 text-white rounded shadow"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

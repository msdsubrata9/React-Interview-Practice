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
    <div className="border p-3 mb-2 rounded shadow-sm bg-white">
      <h3 className="font-bold text-lg">{task.title}</h3>
      <p className="text-sm text-gray-600">{task.description}</p>
      <p className="text-sm mt-1 text-blue-600">{getTimeStatus()}</p>
      <div className="mt-2 space-x-2">
        <button
          onClick={handleToggleComplete}
          className="px-2 py-1 bg-green-500 text-white rounded"
        >
          {task.completed ? "Mark Incomplete" : "Mark Complete"}
        </button>
        <button
          onClick={handleDelete}
          className="px-2 py-1 bg-red-500 text-white rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

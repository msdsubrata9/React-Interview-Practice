import React, { useEffect, useState } from "react";
import { Provider, useDispatch } from "react-redux";
import store from "./store";
import TaskForm from "./components/TaskForm";
import TaskBuckets from "./components/TaskBuckets";
import { setTasks, updateTimeStatuses } from "./store/taskSlice";

function AppContent() {
  const dispatch = useDispatch();
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await fetch("/api/tasks");
        const data = await res.json();
        dispatch(setTasks(data));
        dispatch(updateTimeStatuses());
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
      }
    };

    fetchTasks();

    const interval = setInterval(() => {
      dispatch(updateTimeStatuses());
    }, 1000);

    return () => clearInterval(interval);
  }, [dispatch]);

  return (
    <div className="p-4 mx-auto min-h-screen bg-gradient-to-br from-gray-100 to-blue-100">
      <h1 className="text-4xl font-bold mb-6 text-center text-blue-800">
        📝 Task Manager
      </h1>
      <div className="flex justify-center mb-6">
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded shadow"
        >
          + Add Task
        </button>
      </div>
      {showForm && <TaskForm onClose={() => setShowForm(false)} />}
      <TaskBuckets />
    </div>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

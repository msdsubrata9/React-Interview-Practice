import React, { useEffect } from "react";
import { Provider, useDispatch } from "react-redux";
import store from "./store";
import TaskForm from "./components/TaskForm";
import TaskBuckets from "./components/TaskBuckets";
import { setTasks, updateTimeStatuses } from "./store/taskSlice";

function AppContent() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await fetch("/api/tasks"); // or from local
        const data = await res.json();
        dispatch(setTasks(data));
        dispatch(updateTimeStatuses()); // 🩹 update statuses right away
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
    <div className="p-4 max-w-5xl mx-auto min-h-screen bg-gradient-to-br from-gray-100 to-blue-100">
      <h1 className="text-4xl font-bold mb-6 text-center text-blue-800">
        📝 Task Manager
      </h1>
      <TaskForm />
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

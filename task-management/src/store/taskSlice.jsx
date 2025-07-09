import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setTasks(state, action) {
      state.items = action.payload;
    },
    addTask(state, action) {
      state.items.push(action.payload);
    },
    updateTask(state, action) {
      const index = state.items.findIndex(
        (task) => task.id === action.payload.id
      );
      if (index !== -1) state.items[index] = action.payload;
    },
    deleteTask(state, action) {
      state.items = state.items.filter((task) => task.id !== action.payload);
    },
    updateTimeStatuses(state) {
      const now = new Date();
      state.items.forEach((task) => {
        if (!task.completed && new Date(task.deadline) < now) {
          task.status = "failure";
        } else if (task.completed) {
          task.status = "success";
        } else {
          task.status = "ongoing";
        }
      });
    },
  },
});

export const { setTasks, addTask, updateTask, deleteTask, updateTimeStatuses } =
  taskSlice.actions;

export default taskSlice.reducer;

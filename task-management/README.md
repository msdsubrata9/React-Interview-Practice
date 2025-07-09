# 📝 Task Manager App

A responsive and dynamic Task Manager built with **React + Redux Toolkit**, focused on intuitive UX, real-time feedback, and smart deadline handling.

![badge](https://img.shields.io/badge/Built%20With-React%20%2B%20Redux-blue)
![badge](https://img.shields.io/badge/Status-Completed-success)
![badge](https://img.shields.io/badge/Responsive-Mobile%20%26%20Desktop-lightgrey)

---

## 🔥 Features

### ✅ Dynamic & Intuitive UI

- Clean, minimal design using **Tailwind CSS**
- Mobile-first responsive layout
- Full-page modal for task creation
- Task list automatically updates in real time without page reload

### 📂 Smart Task Bucketing

Tasks are automatically categorized into:

- 🟡 **Ongoing** – Active tasks with future deadlines
- ✅ **Success** – Manually marked completed tasks
- ❌ **Failure** – Missed deadline, not completed

### 🕒 Real-Time Deadline Awareness

- Countdown indicator: `Due in X hrs` or `Overdue by Y hrs`
- Automatically moves tasks between buckets as time progresses

### 🧠 Client-side Logic with Redux Toolkit

- Task state managed globally with Redux
- Manual `createSlice` actions (no thunk or extraReducer!)
- Time-based status updates using `setInterval`

### 🔄 Full CRUD Functionality

- Add, edit, delete, and mark tasks as complete/incomplete
- Fully asynchronous with clean API fetch handling
- Loading/error state handling ready (optional)

---

## 🏗️ Tech Stack

- **Frontend:** React, Redux Toolkit, Tailwind CSS
- **State Management:** Redux (local state + global sync)
- **UX Enhancements:** Full-page modal, transitions, real-time feedback

---

## 🚀 Getting Started

1. Clone this repository:

```bash
git clone https://github.com/msdsubrata9/React-Interview-Practice/tree/main/task-management
cd task-manager
```

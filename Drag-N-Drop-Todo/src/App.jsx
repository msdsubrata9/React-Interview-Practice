import { useState } from 'react'
import './App.css';

const TODO = "TODO";
const DOING = "DOING";
const DONE = "DONE";

function App() {
  const [inputValue, setInputValue] = useState('');
  const [todos, setTodos] = useState([]);
  const [dragTask, setDragTask] = useState(null);
  const [updateItem, setUpdateItem] = useState(null);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (updateItem) {
        // user is coming for an update
        const obj = {
          title: inputValue,
          status: updateItem.status,
          id: updateItem.id
        }
        const copyTasks = [...todos];
        const filtered = copyTasks.filter((item) => item.id !== updateItem.id);
        setTodos(() => [...filtered, obj]);
        setUpdateItem(null);
      }
      else {
        const obj = {
          title: inputValue,
          status: TODO,
          id: Date.now()
        }
        setTodos((prevTodos) => [...prevTodos, obj]);
      }
      setInputValue("");
    }
  }

  const handleDrag = (e, todo) => {
    setDragTask(todo)
  }

  const handleDragOver = (e) => {
    e.preventDefault();
  }

  const handleDragNDrop = (status) => {
    let copyTodos = [...todos];
    copyTodos = copyTodos.map((item) => {
      if (dragTask.id === item.id) {
        item.status = status;
      }
      return item;
    });
    setTodos(copyTodos);
    setDragTask(null);
  }

  const handleOnDrop = (e) => {
    const status = e.target.getAttribute("data-status");

    if (status === TODO) {
      handleDragNDrop(TODO);
    }
    else if (status === DOING) {
      handleDragNDrop(DOING);
    }
    else if (status === DONE) {
      handleDragNDrop(DONE);
    }

  }

  const deleteTask = (todo) => {
    let copyTasks = [...todos];
    copyTasks = copyTasks.filter((task) => task.id !== todo.id);
    setTodos(copyTasks);
  }

  const updateTask = (todo) => {
    setUpdateItem(todo);
    setInputValue(todo.title)
  }

  return (
    <div className='App'>
      <h1>Drag and Drop Todo Application</h1>
      <input type="text" onKeyDown={handleKeyDown} value={inputValue} onChange={handleInputChange} />
      <div className='board'>
        <div className='todo' data-status={TODO} onDrop={handleOnDrop} onDragOver={handleDragOver}>
          <h2 className='todo-col'>Todo</h2>
          {
            todos.length > 0 && todos.map((todo) => {
              return (
                todo.status === TODO && <div onDrag={(e) => handleDrag(e, todo)} draggable={true} key={todo.id} className='task-item'>
                  {todo.title}
                  <div className='btns'>
                    <span onClick={() => updateTask(todo)} className='btn'>✏️</span>
                    <span onClick={() => deleteTask(todo)} className='btn'>❌</span>
                  </div>
                </div>)
            })
          }
        </div>
        <div className='doing' data-status={DOING} onDrop={handleOnDrop} onDragOver={handleDragOver}>
          <h2 className='doing-col'>Doing</h2>
          {
            todos.length > 0 && todos.map((todo) => {
              return (
                todo.status === DOING && <div onDrag={(e) => handleDrag(e, todo)} draggable={true} key={todo.id} className='task-item'>
                  {todo.title}
                  <div className='btns'>
                    <span onClick={() => updateTask(todo)} className='btn'>✏️</span>
                    <span onClick={() => deleteTask(todo)} className='btn'>❌</span>
                  </div>
                </div>)
            })
          }
        </div>
        <div className='done' data-status={DONE} onDrop={handleOnDrop} onDragOver={handleDragOver}>
          <h2 className='done-col'>Done</h2>
          {
            todos.length > 0 && todos.map((todo) => {
              return (
                todo.status === DONE && <div onDrag={(e) => handleDrag(e, todo)} draggable={true} key={todo.id} className='task-item'>
                  {todo.title}
                  <div className='btns'>
                    <span onClick={() => updateTask(todo)} className='btn'>✏️</span>
                    <span onClick={() => deleteTask(todo)} className='btn'>❌</span>
                  </div>
                </div>)
            })
          }
        </div>
      </div>
    </div>
  )
}

export default App

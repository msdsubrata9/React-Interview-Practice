import { useState } from "react";
import Filter from "./Filter";

export default function TodoList() {
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState([]);
  const [isEditedTodoId, setIsEditedTodoId] = useState(null);
  const [filter, setFilter] = useState("all");
  const [sortKey, setSortKey] = useState("Oldest First");

  const filteredKeys = ["All", "Completed", "Incomplete"];
  const sortKeys = ["Oldest First", "Newest First", "A-Z", "Z-A"];

  function handleSubmit(event) {
    event.preventDefault();
    const newTodos = [...todos];
    if (inputValue.trim() !== "") {
      newTodos.push({
        id: String(Date.now()),
        text: inputValue.trim(),
        isCompleted: false,
        createdAt: String(Date.now()),
      });
      setTodos(newTodos);
      setInputValue("");
    }
  }
  function handleInputChange(event) {
    let value = event.target.value;
    setInputValue(value);
  }

  function handleDeleteTodo(deleteTodoId) {
    return () => {
      setTodos((prevTodos) =>
        prevTodos.filter((todo) => todo.id !== deleteTodoId)
      );
    };
  }

  function handleEditTodo(editTodoId) {
    return () => {
      setIsEditedTodoId(editTodoId);
    };
  }

  function handleSaveTodo() {
    setIsEditedTodoId(null);
  }

  function handleEditTodoTextChange(editTodoId) {
    return (event) => {
      const value = event.target.value;

      setTodos((prevTodos) => {
        return prevTodos.map((todo) => {
          if (todo.id === editTodoId) {
            return { ...todo, text: value.trim() };
          }
          return todo;
        });
      });
    };
  }

  function handleCompletionToggle(completedTodoId) {
    return () => {
      setTodos((prevTodos) => {
        return prevTodos.map((todo) => {
          if (todo.id == completedTodoId) {
            return { ...todo, isCompleted: !todo.isCompleted };
          }
          return todo;
        });
      });
    };
  }

  function renderTodoList() {
    let filteredTodos = [...todos];

    if (filter === "Completed") {
      filteredTodos = todos.filter((todo) => todo.isCompleted === true);
    } else if (filter === "Incomplete") {
      filteredTodos = todos.filter((todo) => todo.isCompleted === false);
    }

    if (sortKey === "Oldest First") {
      filteredTodos = filteredTodos.sort((a, b) => {
        return a.createdAt - b.createdAt;
      });
    } else if (sortKey === "Newest First") {
      filteredTodos = filteredTodos.sort((a, b) => {
        return b.createdAt - a.createdAt;
      });
    } else if (sortKey === "A-Z") {
      filteredTodos = filteredTodos.sort((a, b) => {
        return a.text.localeCompare(b.text);
      });
    } else if (sortKey === "Z-A") {
      filteredTodos = filteredTodos.sort((a, b) => {
        return b.text.localeCompare(a.text);
      });
    }

    return filteredTodos;
  }
  function handleSelectedChange(option, type) {
    if (type === "filter") {
      setFilter(option);
    } else if (type === "sort") {
      setSortKey(option);
    }
  }

  console.log(todos);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" value={inputValue} onChange={handleInputChange} />
        <button type="submit">Add Todo</button>
      </form>
      <div className="filter__container">
        <Filter
          type="filter"
          onFilter={handleSelectedChange}
          optionValues={filteredKeys}
        />
        <Filter
          type="sort"
          onFilter={handleSelectedChange}
          optionValues={sortKeys}
        />
      </div>
      <div>
        {renderTodoList().map((todo) => {
          return (
            <div className="todo" key={todo.id}>
              <input
                type="checkbox"
                checked={todo.isCompleted === true}
                onChange={handleCompletionToggle(todo.id)}
              />
              <div className="todo__text">
                {isEditedTodoId === todo.id ? (
                  <input
                    type="text"
                    value={todo.text}
                    onChange={handleEditTodoTextChange(todo.id)}
                  />
                ) : (
                  todo.text
                )}
              </div>
              <button onClick={handleDeleteTodo(todo.id)}>Delete</button>

              {isEditedTodoId === todo.id ? (
                <button onClick={handleSaveTodo}>Save</button>
              ) : (
                <button onClick={handleEditTodo(todo.id)}>Edit</button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

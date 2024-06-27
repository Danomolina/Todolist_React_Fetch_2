import React, { useEffect, useState } from "react";
import Notification from "./Notification";
import TodoList from "./TodoList";

const Home = () => {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState("");
  const [message, setMessage] = useState(null);
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  useEffect(() => {
    fetch("https://playground.4geeks.com/todo/users/danomolina", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        console.log("Fetch GET response:", response); 
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Fetched todos:", data); 
        if (Array.isArray(data.todos)) {
          setTodos(data.todos);
        } else {
          setTodos([]);
        }
      })
      .catch((error) => console.error("Error fetching todos:", error));
  }, []);

  const handleAddTask = () => {
    if (task.trim() === "") return;
    const newTodos = [...todos, { label: task, done: false }];
    setTodos(newTodos);
    setTask("");
    updateTodos(newTodos);
    setMessage({
      text: "Nombre creado correctamente.",
      type: "success",
    });
  };

  const updateTodos = (newTodos) => {
    fetch("https://playground.4geeks.com/todo/users/danomolina", {
      method: "PUT",
      body: JSON.stringify(newTodos),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        console.log("Fetch PUT response:", response); 
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Updated todos:", data); 
        setMessage({
          text: "Todos actualizados correctamente.",
          type: "success",
        });
      })
      /* .catch((error) => {
        console.error("Error updating todos:", error);
        setMessage({
          text: "Error al actualizar los todos.",
          type: "danger",
        });
      }); */
  };

  const handleDelete = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
    updateTodos(newTodos);
    setMessage({
      text: "Nombre eliminado correctamente.",
      type: "success",
    });
  };

  const filteredTodos = todos.filter((todo) =>
    todo.label.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container">
      <div className="input-group my-3">
        <input
          type="text"
          className="form-control"
          placeholder="Inserte actividad"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button className="btn btn-primary" onClick={handleAddTask}>
          <i className="fas fa-save"></i>
        </button>
      </div>

      <ul className="list-group">
        <h3 className="badge bg-primary my-1 py-2 d-flex">
          <span>Buscar tareas</span>
          <span className="ms-auto">
            <i
              className="fas fa-search"
              onClick={() => setShowSearch(!showSearch)}
            ></i>
          </span>
        </h3>
        {showSearch && (
          <input
            type="search"
            className="form-control mb-3"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        )}
        {filteredTodos.map((todo, index) => (
          <li
            className="list-group-item d-flex justify-content-between"
            key={index}
          >
            <span>{todo.label}</span>
            <i
              className="fas fa-trash"
              onClick={() => handleDelete(index)}
            ></i>
          </li>
        ))}
      </ul>

      {message && (
        <Notification
          text={message.text}
          type={message.type}
          onClose={() => setMessage(null)}
        />
      )}
    </div>
  );
};

export default Home;

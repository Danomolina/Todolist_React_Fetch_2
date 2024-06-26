import React, { useState, useEffect } from 'react';
import TodoItem from './TodoItem';
import Notification from './Notification';

const TodoList = () => {
  const [inputValue, setInputValue] = useState('');
  const [todos, setTodos] = useState([]);
  const [notification, setNotification] = useState('');

  // Fetch todos when component mounts
  useEffect(() => {
    fetch('https://playground.4geeks.com/todo/users/danomolina')
      .then((response) => response.json())
      .then((data) => {
        if (data && data.todos) {
          setTodos(data.todos);
        } else {
          console.error('Unexpected response structure:', data);
          setTodos([]);
        }
      })
      .catch((error) => {
        console.error('Error fetching todos:', error);
        setTodos([]);
      });
  }, []);

  const handleAddTodo = () => {
    if (inputValue.trim() === '') {
      setNotification('El campo no puede estar vacío');
      return;
    }

    const newTodo = { label: inputValue, is_done: false, id: Date.now() };
    const newTodos = [...todos, newTodo];

    fetch('https://playground.4geeks.com/todo/users/danomolina', {
      method: 'PUT',
      body: JSON.stringify(newTodos),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setTodos(newTodos);
        setInputValue('');
        setNotification('Nombre creado correctamente.');
      })
      .catch((error) => console.error('Error updating todos:', error));
  };

  const handleDeleteTodo = (id) => {
    if (window.confirm(`Desea eliminar el item con ID ${id}?`)) {
      const newTodos = todos.filter((todo) => todo.id !== id);

      fetch('https://playground.4geeks.com/todo/users/danomolina', {
        method: 'PUT',
        body: JSON.stringify(newTodos),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setTodos(newTodos);
          setNotification('Nombre eliminado correctamente.');
        })
        .catch((error) => console.error('Error deleting todo:', error));
    }
  };

  return (
    <div className="todo-list">
      <div className="input-container">
        <input
          type="text"
          placeholder="Ingresar Tarea"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="form-control"
        />
        <button onClick={handleAddTodo} className="btn btn-primary">
          <i className="fas fa-save"></i>
        </button>
      </div>
      <div className="todos-container">
        <div className="todos-header bg-primary text-white p-2 mb-2">
          <span>Names:</span>
          <i className="fas fa-search"></i>
        </div>
        {todos.length === 0 ? (
          <div>No hay tareas, añadir tareas</div>
        ) : (
          todos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} onDelete={handleDeleteTodo} />
          ))
        )}
      </div>
      {notification && <Notification message={notification} />}
    </div>
  );
};

export default TodoList;

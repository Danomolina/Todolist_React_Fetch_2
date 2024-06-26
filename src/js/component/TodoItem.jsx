import React from 'react';

const TodoItem = ({ todo, onDelete }) => {
  return (
    <div className="todo-item d-flex justify-content-between align-items-center p-2 border-bottom">
      <span>{todo.label}</span>
      <button onClick={() => onDelete(todo.id)} className="btn btn-danger btn-sm">
        <i className="fas fa-trash"></i>
      </button>
    </div>
  );
};

export default TodoItem;

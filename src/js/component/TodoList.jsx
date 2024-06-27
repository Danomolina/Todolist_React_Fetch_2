import React, { useEffect, useState } from 'react';
import CustomAlert from './CustomAlert';
import TodoItem from './TodoItem';

const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [message, setMessage] = useState(null);
    const [search, setSearch] = useState("");
    const [showSearch, setShowSearch] = useState(false);

    useEffect(() => {
        fetch('https://playground.4geeks.com/todo/users/danomolina1')
            .then(response => response.json())
            .then(data => setTodos(data.todos))
            .catch(error => console.log('Error fetching todos:', error));
    }, []);

    const handleChange = (e) => {
        setInputValue(e.target.value);
    };

    const saveTodo = () => {
        const newTodo = { label: inputValue, is_done: false };
        const updatedTodos = [...todos, newTodo];
        updateTodos(updatedTodos);
        setInputValue("");
    };

    const updateTodos = (updatedTodos) => {
        fetch('https://playground.4geeks.com/todo/users/danomolina', {
            method: "PUT",
            body: JSON.stringify(updatedTodos),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())
            .then(data => {
                setTodos(updatedTodos);
                setMessage({
                    variant: 'success',
                    text: 'Nombre creado correctamente',
                    type: 'Success'
                });
            })
            .catch(error => console.log('Error updating todos:', error));
    };

    const handleDelete = (todo) => {
        const resp = window.confirm(`Desea eliminar el item ${todo.label}?`);
        if (resp) {
            const updatedTodos = todos.filter(t => t.label !== todo.label);
            updateTodos(updatedTodos);
        }
    };

    const clearTodos = () => {
        updateTodos([]);
    };

    return (
        <>
            <div className="d-flex w-50 mx-auto my-3 input-group">
                <input type="text" className="form-control" onChange={handleChange} value={inputValue} placeholder='Insert Name' />
                <button className='btn btn-primary' onClick={saveTodo}>
                    <i className="fas fa-save"></i>
                </button>
            </div>

            <ul className="list-group w-50 mx-auto">
                <h3 className='badge bg-primary my-1 py-2 d-flex'>
                    <span>Tareas:</span>
                    <span className='ms-auto'><i className="fas fa-search" onClick={() => setShowSearch(!showSearch)}></i></span>
                    <span className='ms-auto'><i className="fas fa-trash" onClick={clearTodos}></i></span>
                </h3>
                {
                    showSearch && (
                        <input type="search" placeholder='search...' className="form-control mb-3" value={search} onChange={(e) => setSearch(e.target.value)} />
                    )
                }
                {
                    todos.length === 0 ? (
                        <li className='list-group-item list-group-item-action d-flex justify-content-between'>
                            <span>No hay tareas, añadir tareas</span>
                        </li>
                    ) : (
                        todos.filter((todo) => todo.label.toLowerCase().includes(search.toLowerCase())).map((todo, index) => (
                            <TodoItem key={index} todo={todo} onDelete={handleDelete} />
                        ))
                    )
                }
            </ul>
            {
                message && (
                    <CustomAlert variant={message.variant} text={message.text} type={message.type} onClick={() => setMessage(null)} />
                )
            }
        </>
    );
};

export default TodoList;

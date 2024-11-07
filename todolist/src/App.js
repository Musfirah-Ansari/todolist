

import React, { useState } from "react";
import "./App.css";

function App() {
  // State to hold the list of todos
  const [todos, setTodos] = useState([]);

  // State to track search input
  const [search, setSearch] = useState("");

  // State for the form input fields
  const [newTodo, setNewTodo] = useState({
    title: "",
    details: "",
    dueDate: "",
  });

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTodo({
      ...newTodo,
      [name]: value,
    });
  };

  // Add new todo item
  const handleAddTodo = () => {
    if (newTodo.title && newTodo.details && newTodo.dueDate) {
      setTodos([...todos, { ...newTodo, id: Date.now() }]);
      setNewTodo({ title: "", details: "", dueDate: "" }); // Reset form
    } else {
      alert("Please fill in all fields");
    }
  };

  // Delete a todo item
  const handleDeleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // Edit a todo item
  const handleEditTodo = (id) => {
    const todo = todos.find((todo) => todo.id === id);
    setNewTodo({
      title: todo.title,
      details: todo.details,
      dueDate: todo.dueDate,
    });
    setTodos(todos.filter((todo) => todo.id !== id)); // Remove the item from the list temporarily
  };

  // Handle search filter
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  // Filtered todos based on search query
  const filteredTodos = todos.filter((todo) =>
    todo.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="App">
      <h1>Todo List</h1>

      {/* Search Box */}
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={handleSearchChange}
        className="search-input"
      />

      {/* Todo form */}
      <div className="todo-form">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={newTodo.title}
          onChange={handleInputChange}
        />
        <textarea
          name="details"
          placeholder="Details"
          value={newTodo.details}
          onChange={handleInputChange}
        ></textarea>
        <input
          type="date"
          name="dueDate"
          value={newTodo.dueDate}
          onChange={handleInputChange}
        />
        <button onClick={handleAddTodo}>Add</button>
      </div>

      {/* Todo List */}
      <ul className="todo-list">
        {filteredTodos.map((todo) => (
          <li key={todo.id} className="todo-item">
            <h3>{todo.title}</h3>
            <p>{todo.details}</p>
            <p>Due: {todo.dueDate}</p>
            <button onClick={() => handleEditTodo(todo.id)}>Edit</button>
            <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;


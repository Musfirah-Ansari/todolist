import React, { useState } from "react";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [search, setSearch] = useState("");
  const [newTodo, setNewTodo] = useState({
    title: "",
    details: "",
    dueDate: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTodo({
      ...newTodo,
      [name]: value,
    });
  };

  const handleAddTodo = () => {
    if (newTodo.title && newTodo.details && newTodo.dueDate) {
      setTodos([...todos, { ...newTodo, id: Date.now() }]);
      setNewTodo({ title: "", details: "", dueDate: "" });
    } else {
      alert("Please fill all the fields");
    }
  };

  const handleDeleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleEditTodo = (id) => {
    const todo = todos.find((todo) => todo.id === id);
    setNewTodo({
      title: todo.title,
      details: todo.details,
      dueDate: todo.dueDate,
    });
    setTodos(todos.filter((todo) => todo.id !== id)); 
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const filteredTodos = todos.filter((todo) =>
    todo.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="App">
      <h1>Todo List Task</h1>

      <input
        type="text"
        placeholder="Search here your todos"
        value={search}
        onChange={handleSearchChange}
        className="search-input"
      />

      <div className="todo-form">
        <input
          type="text"
          name="title"
          placeholder="Title of your todos"
          value={newTodo.title}
          onChange={handleInputChange}
        />
        <textarea
          name="details"
          placeholder="description of your todos"
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

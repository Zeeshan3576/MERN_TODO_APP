import { useEffect, useState } from "react";
import axios from "axios";
import "./styles.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/todos")
      .then((res) => setTodos(res.data))
      .catch((err) => console.log(err));
  }, []);

  const addTodo = () => {
    if (!title.trim()) return;
    axios
      .post("http://localhost:8000/api/todos", { title })
      .then((res) => setTodos([...todos, res.data]))
      .catch((err) => console.log(err));
    setTitle("");
  };

  const toggleComplete = (id, completed) => {
    axios
      .put(`http://localhost:8000/api/todos/${id}`, { completed: !completed })
      .then((res) => {
        setTodos(todos.map((todo) => (todo._id === id ? res.data : todo)));
      })
      .catch((err) => console.log(err));
  };

  const deleteTodo = (id) => {
    axios
      .delete(`http://localhost:8000/api/todos/${id}`)
      .then(() => setTodos(todos.filter((todo) => todo._id !== id)))
      .catch((err) => console.log(err));
  };

  return (
    <div className="app">
      <div className="todo-container">
        <h1>To-Do List</h1>

        <div className="input-section">
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter a task..." />
          <button onClick={addTodo}>Add</button>
        </div>

        <ul>
          {todos.map((todo) => (
            <li key={todo._id} className={todo.completed ? "completed" : ""}>
              <span onClick={() => toggleComplete(todo._id, todo.completed)} style={{ cursor: "pointer" }}>
                {todo.title}
              </span>
              <button className="delete-btn" onClick={() => deleteTodo(todo._id)}>
                ✖
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;

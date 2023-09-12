import { useState, useEffect } from "react";
import Form from "./components/form/form";
import TodoList from "./components/todoList/todoList";
import { ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";

function App() {
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState("all");
  const [filteredTodos, setFilteredTodos] = useState([]);

  useEffect(() => {
    const getLocalTodos = () => {
      if (localStorage.getItem("todos") === null) {
        localStorage.setItem("todos", JSON.stringify([]));
      } else {
        const todoLocal = JSON.parse(localStorage.getItem("todos"));
        setTodos(todoLocal);
      }
    };

    getLocalTodos();
  }, []);

  useEffect(() => {
    const handleFilter = () => {
      switch (status) {
        case "completed":
          setFilteredTodos(todos.filter((todo) => todo.completed === true));
          break;
        case "uncompleted":
          setFilteredTodos(todos.filter((todo) => todo.completed === false));
          break;
        default:
          setFilteredTodos(todos);
          break;
      }
    };

    handleFilter();

    const saveLocalTodos = () => {
      localStorage.setItem("todos", JSON.stringify(todos));
    };

    saveLocalTodos();
  }, [todos, status]);

  return (
    <div className="app-container">
      <ToastContainer />
      <header>
        <h2>My Todo App</h2>
      </header>
      <Form
        inputText={inputText}
        setInputText={setInputText}
        todos={todos}
        setTodos={setTodos}
        setStatus={setStatus}
      />
      {todos.length && filteredTodos.length ? (
        <TodoList
          setInputText={setInputText}
          todos={todos}
          setTodos={setTodos}
          filteredTodos={filteredTodos}
        />
      ) : (
        <div className="no-tasks">
          <p>No tasks yet...</p>
        </div>
      )}

      <footer>
        <span>&copy; korenstudios 2023-{new Date().getFullYear()} &copy;</span>
        <div>
          <Link to="https://www.linkedin.com/in/koren-naamany/" target="_blank">
            <i className="fa-brands fa-linkedin"></i>
          </Link>
          <Link to="https://github.com/korenstudios" target="_blank">
            <i className="fa-brands fa-github"></i>
          </Link>
          <Link to="mailto:korenstudios@gmail.com">
            <i className="fas fa-inbox"></i>
          </Link>
        </div>
      </footer>
    </div>
  );
}

export default App;

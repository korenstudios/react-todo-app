import { useState } from "react";
import { toast } from "react-toastify";

const Todo = ({ text, todo, todos, setTodos }) => {
  const [showFall, setShowFall] = useState(false);

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      setShowFall(true);

      setTimeout(() => {
        setTodos(todos.filter((elem) => elem.id !== todo.id));
      }, 1000);

      toast.success("Task deleted!");
    }
  };

  const handleComplete = () => {
    setTodos(
      todos.map((item) => {
        if (item.id === todo.id) {
          return {
            ...item,
            completed: !item.completed,
          };
        }
        return item;
      })
    );
  };

  return (
    <div
      className={`todo ${todo.completed ? "completed" : ""} ${
        showFall ? "fall" : ""
      }`}
    >
      <li className="todo-item">{text}</li>
      <button onClick={handleComplete} className="complete-btn">
        <i className="fas fa-check"></i>
      </button>
      <button onClick={handleDelete} className="trash-btn">
        <i className="fas fa-trash"></i>
      </button>
    </div>
  );
};

export default Todo;

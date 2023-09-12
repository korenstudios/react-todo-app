import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";

const Form = ({ inputText, setInputText, todos, setTodos, setStatus }) => {
  const handleInput = (e) => {
    setInputText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (inputText === "") {
      alert("Please Enter Task.");
      return;
    }

    setTodos([
      ...todos,
      {
        text: inputText,
        completed: false,
        id: uuidv4(),
      },
    ]);
    setInputText("");
  };

  const handleDeleteAll = (e) => {
    e.preventDefault();

    if (!todos.length) {
      alert("No tasks submitted.");
      return;
    }

    if (window.confirm("Are you sure you want to delete all tasks?")) {
      setTodos([]);

      toast.success("All tasks deleted!");
    }
  };

  const handleStatus = (e) => {
    setStatus(e.target.value);
  };

  return (
    <form>
      <input
        onChange={handleInput}
        value={inputText}
        type="text"
        className="todo-input"
      />
      <button onClick={handleSubmit} className="todo-button add" type="submit">
        <i className="fas fa-plus-square"></i>
      </button>
      <button
        onClick={handleDeleteAll}
        className="todo-button delete-all"
        type="submit"
      >
        <i className="fas fa-trash"></i>
      </button>
      <div className="select">
        <select onChange={handleStatus} name="todos" className="filter-todo">
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="uncompleted">Uncompleted</option>
        </select>
      </div>
    </form>
  );
};

export default Form;

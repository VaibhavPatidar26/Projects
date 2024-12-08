import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import "./App.css";

function App() {
  const [todo, settodo] = useState("");
  const [todos, settodos] = useState([]);
  const [filter, setFilter] = useState("all")

  // Load todos from localStorage when the app mounts
  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
        const parsedTodos = JSON.parse(storedTodos);
       
          settodos(parsedTodos);
    }
  }
  , []);


  useEffect(() => {
    if (todos.length > 0) {
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  }, [todos]);

  const handleCheck = (e) => {
    const id = e.target.name;
    const index = todos.findIndex((item) => item.id === id);
    const newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    settodos(newTodos);
  };

  function handleAdd() {
    if (todo.trim() !== "") {
      settodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
      settodo("");
    }
  }

  function handleDelete(id) {
    settodos(todos.filter((item) => item.id !== id));
  }

  function handleEdit(id) {
    const editTodo = todos.find((item) => item.id === id);
    settodo(editTodo.todo);
    settodos(todos.filter((item) => item.id !== id));
  }

  const filteredTodos = todos.filter((item) => {
    if (filter === "completed") {
      return item.isCompleted;
    } else if (filter === "pending") {
      return !item.isCompleted;
    }
    return true; 
  });

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-lg shadow-2xl p-8">
        <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
          TODO APP
        </h1>
        <div className="flex gap-2 mb-6">
          <input
            className="flex-1 p-3 rounded-lg border-2 border-gray-300 focus:ring focus:ring-indigo-300 outline-none text-gray-700"
            type="text"
            placeholder="Enter a task..."
            value={todo}
            onChange={(e) => settodo(e.target.value)}
          />
          <button
            onClick={handleAdd}
            disabled={todo.length < 3}
            className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition transform hover:scale-105 flex items-center gap-2"
          >
            ADD
          </button>
        </div>

        
        <div className="flex justify-center gap-3 mb-6">
          <button
            className={`px-4 py-2 rounded-lg ${
              filter === "all"
                ? "bg-indigo-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
            onClick={() => setFilter("all")}
          >
            All
          </button>
          <button
            className={`px-4 py-2 rounded-lg ${
              filter === "completed"
                ? "bg-indigo-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
            onClick={() => setFilter("completed")}
          >
            Completed
          </button>
          <button
            className={`px-4 py-2 rounded-lg ${
              filter === "pending"
                ? "bg-indigo-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
            onClick={() => setFilter("pending")}
          >
            Pending
          </button>
        </div>

        <div className="space-y-4">
          {filteredTodos.length > 0 ? (
            filteredTodos.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center p-4 rounded-lg shadow-md bg-gray-100"
              >
                <input
                  name={item.id}
                  onChange={handleCheck}
                  type="checkbox"
                  checked={item.isCompleted}
                />
                <span
                  className={`text-lg ${
                    item.isCompleted ? "line-through text-gray-500" : "text-gray-800"
                  }`}
                >
                  {item.todo}
                </span>

                <div className="flex space-x-3">
                  <button
                    onClick={() => handleEdit(item.id)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-600 transition flex items-center gap-1"
                  >
                 EDIT
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition flex items-center gap-1"
                  >
                    DELETE
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">
              No tasks found! Try a different filter.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;

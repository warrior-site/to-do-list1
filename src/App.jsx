import React, { useState } from "react";

const App = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [todos, setTodos] = useState([]);
  const [isFormVisible, setFormVisible] = useState(false);
  const [editingTodoIndex, setEditingTodoIndex] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [showCompleted, setShowCompleted] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() && description.trim()) {
      setTodos([...todos, { title, description, completed: false, timestamp: null }]);
      setTitle("");
      setDescription("");
      setFormVisible(false);
    }
  };

  const toggleFormVisibility = () => {
    setFormVisible((prev) => !prev);
  };

  const editTodo = (index) => {
    const todo = todos[index];
    setEditTitle(todo.title);
    setEditDescription(todo.description);
    setEditingTodoIndex(index);
  };

  const saveTodo = () => {
    const updatedTodos = todos.map((todo, index) =>
      index === editingTodoIndex
        ? { ...todo, title: editTitle, description: editDescription }
        : todo
    );
    setTodos(updatedTodos);
    setEditingTodoIndex(null);
    setEditTitle("");
    setEditDescription("");
  };

  const cancelEdit = () => {
    setEditingTodoIndex(null);
    setEditTitle("");
    setEditDescription("");
  };

  const toggleCompletion = (index) => {
    const updatedTodos = todos.map((todo, idx) =>
      idx === index
        ? { ...todo, completed: !todo.completed, timestamp: !todo.completed ? new Date().toLocaleString() : null }
        : todo
    );
    setTodos(updatedTodos);
  };

  const deleteTodo = (index) => {
    const updatedTodos = todos.filter((_, idx) => idx !== index);
    setTodos(updatedTodos);
  };

  const toggleFilter = () => {
    setShowCompleted((prev) => !prev);
  };

  const filteredTodos = showCompleted ? todos.filter((todo) => todo.completed) : todos;

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <div
      className={`h-screen w-full flex flex-col  ${
        isDarkMode ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      <div
        className={`rounded-xl shadow-lg w-full p-6 sm:p-8 ${
          isDarkMode ? "bg-gray-700 text-white" : "bg-gray-100 text-gray-900"
        }`}
      >
        <h1 className="text-2xl sm:text-3xl font-semibold text-center mb-4">To-Do List</h1>

        <button
          onClick={toggleDarkMode}
          className={`w-full sm:w-1/2 lg:w-1/6 py-2 mb-4 mr-2 font-bold rounded-lg bg-gradient-to-br from-purple-600 to-blue-500 hover:opacity-90 transition`}
        >
          {isDarkMode ? "Light Mode" : "Dark Mode"}
        </button>

        <button
          onClick={toggleFormVisibility}
          className="w-full sm:w-1/2 lg:w-1/6 py-2 font-bold rounded-lg mb-4 bg-gradient-to-br from-pink-500 to-white hover:opacity-90"
        >
          {isFormVisible ? "Cancel" : "Add Note"}
        </button>
      </div>

      {isFormVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <form
            onSubmit={handleSubmit}
            className={`bg-white dark:bg-gray-700 p-4 sm:p-6 rounded-lg shadow-lg space-y-4 w-full max-w-lg ${
              isDarkMode ? "text-black" : "text-black"
            }`}
          >
            <h2 className="text-xl sm:text-2xl font-bold text-center">Add a New Note</h2>

            <div>
              <label className="block font-medium mb-2" htmlFor="title">
                Title
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter the title"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="block font-medium mb-2" htmlFor="description">
                Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter the description"
                rows="4"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div className="flex flex-col sm:flex-row sm:space-x-4">
              <button
                type="submit"
                className="w-full sm:w-1/2 py-2 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-400"
              >
                Submit
              </button>
              <button
                type="button"
                onClick={toggleFormVisibility}
                className="w-full sm:w-1/2 py-2 bg-red-500 text-white font-bold rounded-lg hover:bg-red-400"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <button
        onClick={toggleFilter}
        className="w-full sm:w-1/2 lg:w-1/4 mt-4 py-2 px-4 text-white font-bold rounded-lg bg-gradient-to-br from-blue-300 to-blue-100 hover:opacity-90"
      >
        {showCompleted ? "Show All" : "filter"}
      </button>

      <div className="mt-6 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {filteredTodos.map((todo, index) => (
          <div
            key={index}
            className={`p-4 rounded-md shadow-md transition ${
              isDarkMode ? "bg-gray-600 text-white" : "bg-gray-200 text-gray-700"
            }`}
          >
            {editingTodoIndex === index ? (
              <div>
                <div>
                  <label className="block font-medium mb-2" htmlFor="edit-title">
                    Title
                  </label>
                  <input
                    type="text"
                    id="edit-title"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div className="mt-2">
                  <label className="block font-medium mb-2" htmlFor="edit-description">
                    Description
                  </label>
                  <textarea
                    id="edit-description"
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    rows="4"
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div className="mt-4 flex flex-col sm:flex-row sm:space-x-2">
                  <button
                    onClick={saveTodo}
                    className="w-full sm:w-1/2 py-2 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-400"
                  >
                    Save
                  </button>
                  <button
                    onClick={cancelEdit}
                    className="w-full sm:w-1/2 py-2 bg-red-500 text-white font-bold rounded-lg hover:bg-red-400"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row sm:justify-between">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleCompletion(index)}
                    className="mr-2"
                  />
                  <div>
                    <h3
                      className={`font-semibold ${todo.completed ? "line-through" : ""}`}
                    >
                      {todo.title}
                    </h3>
                    <p className={todo.completed ? "line-through" : ""}>{todo.description}</p>
                    {todo.completed && todo.timestamp && (
                      <p className="text-sm text-gray-500">Completed on: {todo.timestamp}</p>
                    )}
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => editTodo(index)}
                    className="text-blue-500 font-medium hover:text-blue-400"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteTodo(index)}
                    className="text-red-500 font-medium hover:text-red-400"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;

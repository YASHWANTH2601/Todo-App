import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import TodoList from "./pages/TodoList";
import ProtectedRoute from "./components/ProtectedRoute";
import TodoForm from "./pages/TodoForm";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/todos"
          element={<ProtectedRoute element={<TodoList />} />}
        />
        <Route
          path="/todos/add"
          element={<ProtectedRoute element={<TodoForm />} />}
        />
      </Routes>
    </Router>
  );
}

export default App;

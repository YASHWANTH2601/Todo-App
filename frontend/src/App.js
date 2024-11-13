import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import TodoList from "./components/TodoList";
import ProtectedRoute from "./components/ProtectedRoute";
import TodoForm from "./components/TodoForm";
import RedirectRoute from "./components/RedirectRoute";
function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <RedirectRoute element={<Login />} />
          }
        />
        <Route
          path="/login"
          element={
            <RedirectRoute element={<Login />} />
          }
        />
        <Route path="/signup" element={<RedirectRoute element={<Signup />} />} />
        <Route
          path="/todos"
          element={<ProtectedRoute elements={<TodoList />} />}
        />
        <Route
          path="/todos/add"
          element={<ProtectedRoute elements={<TodoForm />} />}
        />
      </Routes>
    </Router>
  );
}

export default App;

import React, { useState, useEffect } from "react";

const TodoList = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    setTodos([]);
    const fetchTodos = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found");
        return;
      }

      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/todos/`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch todos");
        }

        const data = await response.json();
        console.log(data);

        setTodos(data);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };
    fetchTodos();
  }, []);

  return (
    <>
      <h1>todo</h1>
      <ul>
        {todos.length === 0 ? (
          <p>No todos available.</p>
        ) : (
          todos.map((todo) => (
            <li key={todo._id}>
              {todo.title} - {todo.status}
            </li>
          ))
        )}
      </ul>
    </>
  );
};

export default TodoList;

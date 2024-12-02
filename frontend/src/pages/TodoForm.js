import React, { useState } from "react";

const TodoForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("pending");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
      console.error("No token found. User needs to log in.");
      return;
    }

    const newTodo = {
      title,
      description,
      status,
    };

    try {
      const url = `${process.env.REACT_APP_API_URL}/todos/`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newTodo),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Todo created:", data);
        // Reset form fields after successful creation
        setTitle("");
        setDescription("");
        setStatus("pending");
      } else {
        const error = await response.json();
        console.error("Error:", error.message);
      }
    } catch (error) {
      // console.log(error);
      console.error("Error creating todo:", error);
    }
  };

  return (
    <div>
      <h2>Create a New Todo</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description</label>
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Status</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <div>
          <button type="submit">Create Todo</button>
        </div>
      </form>
    </div>
  );
};

export default TodoForm;

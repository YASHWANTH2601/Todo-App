import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import dotenv from "dotenv"
// dotenv.config()
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    const userDetails = { email, password };
    e.preventDefault();
    const url = `${process.env.REACT_APP_API_URL}/users/login`;

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userDetails),
    };
    try {
      const response = await fetch(url, options);
      const data = await response.json();

      if (response.ok && data.token) {
        localStorage.setItem("token", data.token);
        setEmail("");
        setPassword("");
        setError("");
        console.log(data.token);
        navigate("/todos");
      } else {
        setError(data.message || "Login failed");
      }
    } catch (error) {
      console.error(error);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;

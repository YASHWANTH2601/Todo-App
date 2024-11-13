// client/src/components/Signup.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    const userDetails = { email, password,username }
    // const url = `http://localhost:5000/api/users/signup`;
    const url = `${process.env.REACT_APP_API_URL}/users/signup`;
    
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify( userDetails ),
    }
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error('Signup failed');
      }
      const data = await response.json();
      console.log(data);
      
      console.log('Signup successful:', data);

      // Clear the form fields
      setUsername("");
      setEmail("");
      setPassword("");

      // Redirect to login page after successful signup
      navigate("/login");
    } catch (error) {
      console.error("Error during signup:", error.message);
    }
  };

  return (
    <form onSubmit={handleSignup}>
      <h2>Signup</h2>
      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
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
      <button type="submit" >Signup</button>
    </form>
  );
}

export default Signup;

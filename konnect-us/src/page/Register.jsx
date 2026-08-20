import React, { useState } from "react";
import axios from "axios";
const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  async function register(e) {
    e.preventDefault();
    try {
      const response = await axios.post("/register", {
        username,
        password,
      });
      console.log("Registration successful:", response.data);
      setUsername("");
      setPassword("");
    } catch (error) {
      console.error("Registration failed:", error.message);
    }
  }
  return (
    <form className="block m-auto w-80" onSubmit={register}>
      <h2 className="text-4xl text-center mb-4 text-[#638889]">Register</h2>
      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        type="text"
        placeholder="Username"
        className="block w-full p-2 w-full mb-2 rounded-md bg-white text-black monospace border"
      />
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        placeholder="Password"
        className="block w-full p-2 mb-2 rounded-md bg-white text-black monospace border"
      />
      <button className="block w-full p-2">Register</button>
    </form>
  );
};

export default Register;

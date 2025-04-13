import React, { useState } from "react";

const Login = ({ onLoginSuccess }) => {
  const [password, setPassword] = useState("");
  const correctPassword = "kaliRoot"; // Predefined correct password

  const handleLogin = () => {
    if (password === correctPassword) {
      onLoginSuccess();
    } else {
      alert("Incorrect password!");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-900">
      <div className="p-6 bg-gray-800 text-white rounded-lg shadow-lg">
        <h2 className="text-lg mb-4">Login to KaliOS</h2>
        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="bg-[#333] text-white p-2 rounded-md mb-4"
        />
        <button
          onClick={handleLogin}
          className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-md"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;

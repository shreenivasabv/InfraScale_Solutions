import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Admin.css";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

const handleLogin = async (e) => {
    e.preventDefault();

    try {
      console.log("Attempting login with:", email); // Test if button click triggers
      
      const res = await axios.post(
        "http://localhost:5000/api/admin/login",
        { email, password }
      );

      console.log("Login Response:", res.data); // Test if backend responds
      
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        navigate("/admin/dashboard");
      }
    } catch (err) {
      // Print the specific backend error to the console and screen
      const errorMessage = err.response?.data?.message || "Server connection failed";
      console.error("Backend Error Object:", err.response); 
      alert(`Login Failed: ${errorMessage}`); 
    }
  };

  return (
    <div className="admin-login-container">
      <form className="admin-login-form" onSubmit={handleLogin}>
        <h2>Admin Login</h2>

        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default AdminLogin;

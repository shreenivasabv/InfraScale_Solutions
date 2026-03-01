import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./MemberAuth.css";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

function MemberLogin() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${API_BASE}/api/member-auth/login`,
        form
      );

      localStorage.setItem("token", res.data.token);

      navigate("/member-dashboard");

    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Member Login</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            required
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <input
            type="password"
            required
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

          <button type="submit">Login</button>
        </form>

        <p>
          Don’t have an account?{" "}
          <span onClick={() => navigate("/member-register")}>
            Register
          </span>
        </p>
      </div>
    </div>
  );
}

export default MemberLogin;
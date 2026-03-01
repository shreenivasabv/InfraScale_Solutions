import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./MemberAuth.css";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

function MemberRegister() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${API_BASE}/api/member-auth/register`,
        form
      );

      alert(res.data.message);
      navigate("/member-login");

    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
  <div className="auth-container">
    <div className="auth-box">
      <h2>Activate Account</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          required
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="Password"
          required
          value={form.password}
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <button type="submit">
          Activate Account
        </button>
      </form>
    </div>
  </div>
);
}

export default MemberRegister;
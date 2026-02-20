import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import "./AdminAbout.css";


const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";
function AdminAbout() {
  const [about, setAbout] = useState({});
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const res = await axios.get(`${API_BASE}/api/about`);
        setAbout(res.data);
      } catch {
        toast.error("Failed to load About content");
      } finally {
        setLoading(false);
      }
    };

    fetchAbout();
  }, []);

  const saveAbout = async () => {
    try {
      await axios.put(
        `${API_BASE}/api/about`,
        about,
        { headers: { Authorization: token } }
      );
      toast.success("About page updated 🚀");
    } catch {
      toast.error("Update failed");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="dashboard-view">
      <h1>Manage About Page</h1>
      <Toaster position="top-right" />
      <div className="about-admin-section">
        <input
          placeholder="Heading"
          value={about.heading || ""}
          onChange={(e) =>
            setAbout({ ...about, heading: e.target.value })
          }
        />
        {/* Values array editor */}
        <div style={{ margin: '16px 0' }}>
          <label>Core Values</label>
          <ArrayField
            values={about.values || []}
            setValues={vals => setAbout({ ...about, values: vals })}
          />
        </div>

        <textarea
          rows="4"
          placeholder="Description"
          value={about.description || ""}
          onChange={(e) =>
            setAbout({ ...about, description: e.target.value })
          }
          />

        <textarea
          rows="3"
          placeholder="Mission"
          value={about.mission || ""}
          onChange={(e) =>
            setAbout({ ...about, mission: e.target.value })
          }
        />

        <textarea
          rows="3"
          placeholder="Vision"
          value={about.vision || ""}
          onChange={(e) =>
            setAbout({ ...about, vision: e.target.value })
          }
        />

        <button className="save-btn" onClick={saveAbout}>
          Save About Page
        </button>
      </div>
    </div>
  );
}

export default AdminAbout;

function ArrayField({ values, setValues }) {
  const [input, setInput] = useState("");
  return (
    <div>
      <div style={{ display: "flex", gap: "8px", marginBottom: 8 }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Add value"
        />
        <button type="button" onClick={() => {
          if (input) {
            setValues([...values, input]);
            setInput("");
          }
        }}>Add</button>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
        {values.map((val, idx) => (
          <span key={idx} style={{ background: '#eee', padding: '4px 8px', borderRadius: 4 }}>
            {val} <button type="button" onClick={() => setValues(values.filter((_, i) => i !== idx))}>x</button>
          </span>
        ))}
      </div>
    </div>
  );
}
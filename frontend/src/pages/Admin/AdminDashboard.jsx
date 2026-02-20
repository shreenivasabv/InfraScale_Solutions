import React, { useRef, useEffect, useState } from 'react';
import axios from "axios";
import toast from "react-hot-toast";
import "./Admin.css"; 

function AdminDashboard() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const messageSectionRef = useRef(null);
  const token = localStorage.getItem("token");

  const fetchMessages = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/contact", {
        headers: { Authorization: token }
      });
      setMessages(res.data);
    } catch (err) {
      toast.error("Failed to load messages.");
    } finally {
      setLoading(false);
    }
  };

  const deleteMessage = async (id) => {
    if (!window.confirm("Are you sure you want to delete this query?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/contact/${id}`, {
        headers: { Authorization: token }
      });
      
      setMessages(messages.filter(msg => msg._id !== id));
      toast.success("Message deleted");
    } catch (err) {
      toast.error("Failed to delete message");
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const scrollToMessages = () => {
    messageSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="dashboard-view">
      <header className="dashboard-header">
        <div className="header-text">
          <h1>Admin Dashboard</h1>
          <p className="subtitle">Overview & Control Panel</p>
        </div>
        <button className="queries-btn" onClick={scrollToMessages}>
          <span className="icon">✉</span> View Queries ({messages.length})
        </button>
      </header>

      <section ref={messageSectionRef} className="messages-section">
        <h2>User Queries</h2>
        
        {loading ? (
          <p>Loading messages...</p>
        ) : messages.length > 0 ? (
          <div className="messages-grid">
            {messages.map((msg) => (
              <div key={msg._id} className="admin-message-card">
                <div className="msg-header">
                  <strong>{msg.name}</strong>
                  <div className="msg-actions">
                    <span>{new Date(msg.createdAt).toLocaleDateString()}</span>
                    <button 
                      className="delete-icon-btn" 
                      onClick={() => deleteMessage(msg._id)}
                      title="Delete Query"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
                <p className="msg-sub">{msg.email} | {msg.subject}</p>
                <p className="msg-text">{msg.message}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="empty-state">No messages found.</p>
        )}
      </section>
    </div>
  );
}

export default AdminDashboard;
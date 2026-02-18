import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import "./ContactMessages.css"; 

function MessagesPage() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  const fetchMessages = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/contact", {
        headers: { Authorization: token }
      });
      setMessages(res.data);
    } catch (err) {
      toast.error("Failed to load messages. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  const deleteMessage = async (id) => {
  if (!window.confirm("Are you sure?")) return;

  try {
    // Ensure the URL is exactly like this:
    await axios.delete(`http://localhost:5000/api/contact/${id}`, {
      headers: { Authorization: token }
    });
    
    // Refresh the local list so the count decreases
    setMessages(messages.filter(msg => msg._id !== id));
    toast.success("Deleted");
  } catch (err) {
    console.error(err);
    toast.error("Failed to delete. Check console.");
  }
};

  useEffect(() => {
    fetchMessages();
  }, []);

  if (loading) return <div className="loader">Loading Inbox...</div>;

  return (
    <div className="messages-container">
      <header className="messages-header" id="contact-messages">
        <h1>Contact Enquiries</h1>
        <p>Total Messages: {messages.length}</p>
      </header>

      <div className="messages-list">
        {messages.length > 0 ? (
          messages.map((msg) => (
            <div key={msg._id} className="message-item">
              <div className="msg-top">
                <span className="msg-sender">{msg.name}</span>
                <span className="msg-date">
                  {new Date(msg.createdAt).toLocaleDateString()}
                </span>
              </div>
              <div className="msg-email">{msg.email}</div>
              <div className="msg-subject">Subject: {msg.subject}</div>
              <div className="msg-body">
                <p>{msg.message}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="empty-state">No messages available.</div>
        )}
      </div>
    </div>
  );
}

export default MessagesPage;
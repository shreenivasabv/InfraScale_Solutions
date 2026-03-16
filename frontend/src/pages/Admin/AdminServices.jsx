import { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import "./AdminServices.css";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

function AdminServices() {

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    summary: ""
  });

  const [image, setImage] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addService = async (e) => {
    e.preventDefault();

    if (submitting) return; // prevent double submit

    if (!image) {
      return toast.error("Please upload an image.");
    }

    if (!form.category) {
      return toast.error("Please select a category.");
    }

    try {
      setSubmitting(true);

      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("description", form.description);
      formData.append("summary", form.summary);
      formData.append("category", form.category);
      formData.append("image", image);

      const token = localStorage.getItem("token");

      await axios.post(`${API_BASE}/api/services`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        }
      });

      toast.success(`Success! "${form.title}" has been added.`);

      setForm({
        title: "",
        description: "",
        category: "",
        summary: ""
      });

      setImage(null);
      e.target.reset();

    } catch (err) {
      const errorMsg = err.response?.data?.message || "Server Error";
      toast.error(errorMsg);
      console.error("Detailed Error:", err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="admin-services-container">
      <Toaster position="top-right" reverseOrder={false} />

      <h2>Add New Service</h2>

      <form className="service-form" onSubmit={addService}>

        <div className="form-group">
          <label>Service Title</label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Category</label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            required
            className="category-select"
          >
            <option value="">Select a Category</option>
            <option value="Virtualization">Virtualization</option>
            <option value="StorageBackup">Storage & Backup</option>
            <option value="DevOps">DevOps</option>
            <option value="Office365">Office 365</option>
          </select>
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Summary</label>
          <textarea
            name="summary"
            value={form.summary}
            onChange={handleChange}
            placeholder="Short summary for hover preview"
          />
        </div>

        <div className="form-group">
          <label>Upload Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            required
          />
        </div>

        <button
          type="submit"
          className="add-service-btn"
          disabled={submitting}
        >
          {submitting ? "Uploading..." : "Upload & Add Service"}
        </button>

      </form>
    </div>
  );
}

export default AdminServices;
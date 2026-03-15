import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import "./AdminServices.css";
import { BASE, buildUrl } from "../../services/api";

function AdminDetailedServices() {
  const [form, setForm] = useState({
    title: "",
    slug: "",
    heroDescription: "",
    fullDescription: "",
    overview: "",
  });

  const [technologies, setTechnologies] = useState([]);
  const [useCases, setUseCases] = useState([]);
  const [lists, setLists] = useState([]);

  const fetchAll = useCallback(async () => {
    try {
      const base = BASE || import.meta.env.VITE_API_URL || "http://localhost:5000";
      const res = await axios.get(`${base}/api/detailed-services`);
      const data = res.data;
      const list = Array.isArray(data) ? data : (Array.isArray(data?.detailedServices) ? data.detailedServices : []);
      setLists(list);
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    void fetchAll();
  }, [fetchAll]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this service?")) return;
    try {
      const token = localStorage.getItem("token");
      const base = BASE || import.meta.env.VITE_API_URL || "http://localhost:5000";
      await axios.delete(`${base}/api/detailed-services/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Service removed");
      fetchAll();
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const payload = { ...form, technologies, useCases };
      const base = BASE || import.meta.env.VITE_API_URL || "http://localhost:5000";
      
      await axios.post(`${base}/api/detailed-services`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success("Service added");
      setForm({ title: "", slug: "", heroDescription: "", fullDescription: "", overview: "" });
      setTechnologies([]);
      setUseCases([]);
      fetchAll();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add");
    }
  };

  return (
    <div className="admin-detailed-container">
      <Toaster position="top-right" />
      
      <div className="admin-card">
        <h2 className="section-title">New Detailed Service</h2>
        <form className="service-form" onSubmit={submit}>
          <div className="form-grid">
            <div className="form-group">
              <label>Service Title</label>
              <input name="title" value={form.title} onChange={handleChange} required placeholder="e.g. Cloud Security" />
            </div>
            <div className="form-group">
              <label>URL Slug</label>
              <input name="slug" value={form.slug} onChange={handleChange} required placeholder="e.g. cloud-security" />
            </div>
          </div>

          <div className="form-group">
            <label>Summary  </label>
            <textarea name="heroDescription" value={form.heroDescription} onChange={handleChange} rows="2" placeholder="Brief intro..." />
          </div>

          <div className="form-group">
            <label>Overview</label>
            <textarea name="overview" value={form.overview} onChange={handleChange} rows="3" placeholder="Deep dive into the service..." />
          </div>

          <div className="array-section-grid">
            <div className="form-group">
              <label>Core Technologies</label>
              <ArrayField items={technologies} setItems={setTechnologies} placeholder="Add tech (React, AWS...)" />
            </div>
            <div className="form-group">
              <label>Use Cases</label>
              <ArrayField items={useCases} setItems={setUseCases} placeholder="Add scenario..." />
            </div>
          </div>

          <button type="submit" className="submit-btn">Create Service</button>
        </form>
      </div>

      <div className="admin-card list-card">
        <h3 className="section-title">Active Services</h3>
        <div className="table-responsive">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>URL Slug</th>
                <th className="text-right">Manage</th>
              </tr>
            </thead>
            <tbody>
              {lists.map((d) => (
                <tr key={d._id}>
                  <td className="font-bold">{d.title}</td>
                  <td className="slug-cell">{d.slug}</td>
                  <td className="text-right">
                    <button className="delete-btn-sm" onClick={() => handleDelete(d._id)}>Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function ArrayField({ items, setItems, placeholder }) {
  const [input, setInput] = useState("");
  const handleAdd = () => {
    if (input.trim()) {
      setItems(prev => [...prev, input.trim()]);
      setInput("");
    }
  };
  return (
    <div className="array-input-wrapper">
      <div className="input-row">
        <input value={input} onChange={(e) => setInput(e.target.value)} placeholder={placeholder} 
               onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAdd())} />
        <button type="button" onClick={handleAdd} className="add-btn-sm">Add</button>
      </div>
      <div className="chip-container">
        {items.map((it, idx) => (
          <div key={idx} className="chip">
            {it} 
            <button type="button" onClick={() => setItems(p => p.filter((_, i) => i !== idx))}>&times;</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminDetailedServices;
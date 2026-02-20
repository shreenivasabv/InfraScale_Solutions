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
    architectureImage: "",
  });

  const [technologies, setTechnologies] = useState([]);
  const [benefits, setBenefits] = useState([]);
  const [useCases, setUseCases] = useState([]);
  const [faqs, setFaqs] = useState([]);

  const [lists, setLists] = useState([]);

  const fetchAll = useCallback(async () => {
    try {
      const base = BASE || import.meta.env.VITE_API_URL || "http://localhost:5000";
      const res = await axios.get(`${base}/api/detailed-services`);
      const data = res.data;
      const list = Array.isArray(data) ? data : (Array.isArray(data?.detailedServices) ? data.detailedServices : []);
      // Normalize architectureImage to full URL for display
      const normalized = list.map(item => ({
        ...item,
        architectureImage: buildUrl(base, item.architectureImage) || item.architectureImage
      }));
      setLists(normalized);
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    // Fetch data on mount  
    void fetchAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  // array helpers handled inline in ArrayField and FaqField components

  const submit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const payload = {
        ...form,
        technologies,
        benefits,
        useCases,
        faqs,
      };

      const base = BASE || import.meta.env.VITE_API_URL || "http://localhost:5000";
      await axios.post(`${base}/api/detailed-services`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success("Detailed service added");
      setForm({ title: "", slug: "", heroDescription: "", fullDescription: "", overview: "", architectureImage: "" });
      setTechnologies([]);
      setBenefits([]);
      setUseCases([]);
      setFaqs([]);
      fetchAll();
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to add");
    }
  };

  return (
    <div className="admin-services-container">
      <Toaster position="top-right" />
      <h2>Detailed Services</h2>

      <form className="service-form" onSubmit={submit}>
        <div className="form-group">
          <label>Title</label>
          <input name="title" value={form.title} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Slug (unique)</label>
          <input name="slug" value={form.slug} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Hero Description</label>
          <textarea name="heroDescription" value={form.heroDescription} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Full Description</label>
          <textarea name="fullDescription" value={form.fullDescription} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Overview</label>
          <textarea name="overview" value={form.overview} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Architecture Image URL</label>
          <input name="architectureImage" value={form.architectureImage} onChange={handleChange} />
        </div>

        {/* Dynamic arrays UI (simple) */}
        <div className="form-group">
          <label>Technologies</label>
          <ArrayField items={technologies} setItems={setTechnologies} placeholder="Add technology" />
        </div>

        <div className="form-group">
          <label>Benefits</label>
          <ArrayField items={benefits} setItems={setBenefits} placeholder="Add benefit" />
        </div>

        <div className="form-group">
          <label>Use Cases</label>
          <ArrayField items={useCases} setItems={setUseCases} placeholder="Add use case" />
        </div>

        <div className="form-group">
          <label>FAQs</label>
          <FaqField faqs={faqs} setFaqs={setFaqs} />
        </div>

        <button type="submit" className="add-service-btn">Add Detailed Service</button>
      </form>

      <hr />

      <h3>Existing Detailed Services</h3>
      <div className="detailed-list">
        {lists.map((d) => (
          <div key={d._id} className="detailed-item">
            <strong>{d.title}</strong>
            <span className="small">{d.slug}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ArrayField({ items, setItems, placeholder }) {
  const [input, setInput] = useState("");
  return (
    <div>
      <div style={{ display: "flex", gap: "8px" }}>
        <input value={input} onChange={(e) => setInput(e.target.value)} placeholder={placeholder} />
        <button type="button" onClick={() => { if (input) { setItems(p => [...p, input]); setInput(""); } }}>Add</button>
      </div>
      <div style={{ marginTop: 8 }}>
        {items.map((it, idx) => (
          <div key={idx} className="chip">{it} <button type="button" onClick={() => setItems(p => p.filter((_, i) => i !== idx))}>x</button></div>
        ))}
      </div>
    </div>
  );
}

function FaqField({ faqs, setFaqs }) {
  const [q, setQ] = useState("");
  const [a, setA] = useState("");
  const add = () => {
    if (!q || !a) return;
    setFaqs(p => [...p, { question: q, answer: a }]);
    setQ(""); setA("");
  };
  return (
    <div>
      <input placeholder="Question" value={q} onChange={(e) => setQ(e.target.value)} />
      <input placeholder="Answer" value={a} onChange={(e) => setA(e.target.value)} />
      <button type="button" onClick={add}>Add FAQ</button>
      <div style={{ marginTop: 8 }}>
        {faqs.map((f, i) => (
          <div key={i} className="chip">{f.question} — {f.answer} <button type="button" onClick={() => setFaqs(p => p.filter((_, idx) => idx !== i))}>x</button></div>
        ))}
      </div>
    </div>
  );
}

export default AdminDetailedServices;

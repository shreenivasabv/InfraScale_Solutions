import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManagePartners = () => {
  const [partners, setPartners] = useState([]);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPartners();
  }, []);

  const fetchPartners = async () => {
    const res = await axios.get('http://localhost:5000/api/partners');
    setPartners(res.data);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please select a certificate image");

    const formData = new FormData();
    formData.append('image', file);

    setLoading(true);
    try {
      await axios.post('http://localhost:5000/api/partners/add', formData);
      setFile(null);
      fetchPartners();
      alert("Certificate uploaded successfully!");
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this certificate?")) {
      await axios.delete(`http://localhost:5000/api/partners/${id}`);
      fetchPartners();
    }
  };

  return (
    <div className="manage-container">
      <h2 className="admin-title">Manage Partner Certificates</h2>
      
      <div className="admin-card">
        <form onSubmit={handleUpload} className="upload-form">
          <input 
            type="file" 
            onChange={(e) => setFile(e.target.files[0])} 
            className="file-input"
          />
          <button type="submit" disabled={loading} className="btn-primary">
            {loading ? "Uploading..." : "Add Certificate"}
          </button>
        </form>
      </div>

      <div className="data-table">
        <div className="table-header">
          <span>Certificate Preview</span>
          <span>Actions</span>
        </div>
        {partners.map(p => (
          <div key={p._id} className="table-row">
            <img src={p.image} alt="Cert" style={{ height: '50px' }} />
            <button onClick={() => handleDelete(p._id)} className="btn-delete">Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManagePartners;
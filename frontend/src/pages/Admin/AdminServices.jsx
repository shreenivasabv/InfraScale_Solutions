import { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast"; // Import Toaster
import "./AdminServices.css";

function AdminServices() {
  const [form, setForm] = useState({ title: "", description: "" });
  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addService = async (e) => {
    e.preventDefault();
    
    if (!image) return toast.error("Please upload an image.");

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("image", image); 

    try {
      const token = localStorage.getItem("token");
      
      await axios.post("http://localhost:5000/api/services", formData, {
        headers: { 
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data" 
        }
      });
      
      // This success alert will now be visible
      toast.success(`Success! "${form.title}" has been added.`);
      
      setForm({ title: "", description: "" });
      setImage(null);
      e.target.reset(); 
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Server Error";
      toast.error(errorMsg); // This error alert will now be visible
      console.error("Detailed Error:", err);
    }
  };

  return (
    <div className="admin-services-container">
      {/* Add the Toaster component here to enable alerts */}
      <Toaster position="top-right" reverseOrder={false} />
      
      <h2>Add New Service</h2>
      <form className="service-form" onSubmit={addService}>
        <div className="form-group">
          <label>Service Title</label>
          <input name="title" value={form.title} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea name="description" value={form.description} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Upload Image</label>
          <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} required />
        </div>
        <button type="submit" className="add-service-btn">Upload & Add Service</button>
      </form>
    </div>
  );
}

export default AdminServices;
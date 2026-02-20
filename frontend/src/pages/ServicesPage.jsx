import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import "./ServicesPage.css"; 

const API = import.meta.env.VITE_API_URL;

function ServicesPage() {
  const { categoryName } = useParams(); // This captures the name from the URL
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  // ServicesPage.jsx
useEffect(() => {
  console.log("DEBUG: Frontend category captured:", categoryName);

  const fetchServices = async () => {
    setLoading(true);
    try {
      // Use the standardized URL that matches your backend
      const url = `${API}/api/services?category=${categoryName}`;
      console.log("DEBUG: Axios calling URL:", url);

      const res = await axios.get(url);
      setServices(res.data); // Update the state with database results
    } catch (err) {
      console.error("Error fetching services:", err);
      toast.error("Failed to load services.");
    } finally {
      setLoading(false);
    }
  };

  if (categoryName) {
    fetchServices();
  }
}, [categoryName]); // Re-run whenever the user clicks a different solution link
  
  
 // Re-runs when you click a different link in the Navbar

  if (loading) return <div className="loader">Loading {categoryName}...</div>;

  return (
    <section className="services-section">
      <Toaster position="top-center" />
      <h1 className="section-title">{categoryName} Services</h1>
      <div className="services-grid">
        {services.length > 0 ? (
          services.map((service) => {
            const slug = service.slug || (service.title || "").toLowerCase().replace(/\s+/g, "-");
            return (
              <div key={service._id} className="service-card" onClick={() => navigate(`/services/details/${slug}`)} style={{ cursor: 'pointer' }}>
                <div className="card-image-container">
                  <img src={`${API}/${service.image}`} alt={service.title} />
                </div>
                <div className="card-content">
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                </div>
              </div>
            );
          })
        ) : (
          <p className="empty-state">No services found for {categoryName}.</p>
        )}
      </div>
    </section>
  );
}

export default ServicesPage;
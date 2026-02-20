import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import API, { BASE, buildUrl } from "../services/api";
import toast, { Toaster } from "react-hot-toast";
import "./ServicesPage.css"; 

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
      const base = BASE || import.meta.env.VITE_API_URL || "http://localhost:5000";
      const url = `${base}/api/services?category=${encodeURIComponent(categoryName)}`;
      console.log("DEBUG: Axios calling URL:", url);

      const res = await axios.get(url);
      const data = res.data;
      // Normalize response to an array
      setServices(Array.isArray(data) ? data : (Array.isArray(data?.services) ? data.services : []));
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
          {Array.isArray(services) && services.length > 0 ? (
            services.map((service) => {
              const slug = service.slug || (service.title || "").toLowerCase().replace(/\s+/g, "-");

              const handleClick = async () => {
                const base = BASE || import.meta.env.VITE_API_URL || "http://localhost:5000";
                try {
                  // Check if a DetailedService exists for this slug
                  await axios.get(`${base}/api/detailed-services/${encodeURIComponent(slug)}`);
                  navigate(`/services/details/${slug}`);
                } catch (err) {
                  // Not found or server error -> fallback
                  console.warn("No detailed page for", slug, err?.response?.status);
                  toast("Detailed page not available. Showing service list.");
                  navigate(`/services`);
                }
              };

              return (
                <div key={service._id} className="service-card" onClick={handleClick} style={{ cursor: 'pointer' }}>
                  <div className="card-image-container">
                    <img src={buildUrl(BASE, service.image) || "/placeholder.png"} alt={service.title} />
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
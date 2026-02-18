import React, { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast"; // Added for the alert
import "./Virtualization.css";

function Virtualization() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/services");
        setServices(res.data);
        // Trigger alert only when data is successfully fetched
        if (res.data.length > 0) {
          toast.success("Gallery Updated: Services loaded successfully!");
        }
      } catch (err) {
        console.error("Error fetching virtualization services:", err);
        toast.error("Failed to load services. Check backend connection.");
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  if (loading) return <div className="loader">Loading Services...</div>;

  return (
    <section className="virtualization-section">
      {/* The Toaster component must be present to render the alerts */}
      <Toaster position="top-center" reverseOrder={false} />
      
      <h1 className="section-title">Virtualization Services</h1>
      
      <div className="services-grid">
        {services.length > 0 ? (
          services.map((service) => (
            <div key={service._id} className="service-card">
              <div className="card-image-container">
                <img 
                  src={`http://localhost:5000/${service.image}`} 
                  alt={service.title} 
                />
              </div>
              <div className="card-content">
                <h3>{service.title}</h3>
                <p className="service-desc">{service.description}</p>
                <div className="card-footer">
                  <span className="spec">Type: {service.category || 'Enterprise'}</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="empty-state">No virtualization services found.</p>
        )}
      </div>
    </section>
  );
}

export default Virtualization;
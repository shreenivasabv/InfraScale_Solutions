import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE, buildUrl } from "../services/api";
import toast, { Toaster } from "react-hot-toast";
import "./ServicesPage.css";

function ServicesPage() {
  const { categoryName } = useParams();
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);

        const base =
          BASE || import.meta.env.VITE_API_URL || "http://localhost:5000";

        const res = await axios.get(
          `${base}/api/services?category=${encodeURIComponent(categoryName)}`
        );

        const data = res.data;

        setServices(
          Array.isArray(data)
            ? data
            : Array.isArray(data?.services)
            ? data.services
            : []
        );
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
  }, [categoryName]);

  if (loading)
    return <div className="loader">Loading {categoryName}...</div>;

  return (
    <section className="services-section">
      <Toaster position="top-center" />
      <h1 className="section-title">{categoryName} Services</h1>

      <div className="services-grid">
        {services.length > 0 ? (
          services.map((service) => {
            const slug =
              service.slug ||
              service.title?.toLowerCase().replace(/\s+/g, "-");

            return (
              <div
                key={service._id}
                className="service-card"
                style={{ cursor: "pointer" }}
              >
                <div className="card-image-container">
                  <img
                    src={buildUrl(BASE, service.image) || "/sample.png"}
                    alt={service.title}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/sample.png";
                    }}
                  />

                    {/* HOVER SUMMARY OVERLAY */}
                 <div className="card-hover-summary">
                  <h3>{service.title}</h3>
                  <p>{service.summary?.trim() ? service.summary : service.description}</p>
                </div>
                </div>

                <div className="card-content">
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                </div>

                
              </div>
            );
          })
        ) : (
          <p className="empty-state">
            No services found for {categoryName}.
          </p>
        )}
      </div>
    </section>
  );
}

export default ServicesPage;
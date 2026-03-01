import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./DetailedServicePage.css";

const API_BASE =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

function DetailedServicePage() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!slug) return;

    const fetchService = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await axios.get(
          `${API_BASE}/api/detailed-services/${slug}`
        );

        setService(res.data);
      } catch (err) {
        console.error("Detailed service error:", err);
        setError("Unable to load service details");
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [slug]);

  if (loading) {
    return (
      <div className="service-page">
        <div className="loading">Loading...</div>
      </div>
    );
  }

  if (error || !service) {
    return (
      <div className="service-page">
        <div className="error">
          <h2>{error || "Service not found"}</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="service-page">

      <div className="service-container">

        <button
          className="back-btn"
          onClick={() => navigate("/services")}
        >
          ← Back to Services
        </button>

        {/* TITLE */}
        <h1 className="service-title">{service.title}</h1>

        {/* IMAGE */}
        {service.architectureImage && (
          <div className="service-image-wrapper">
            <img
              src={service.architectureImage}
              alt="Service"
            />
          </div>
        )}

        {/* INTRODUCTION */}
        {service.heroDescription && (
          <section>
            <h2>Introduction</h2>
            <p>{service.heroDescription}</p>
          </section>
        )}

        {/* OVERVIEW */}
        {service.overview && (
          <section>
            <h2>Overview</h2>
            <p>{service.overview}</p>
          </section>
        )}

        {/* TECHNOLOGIES */}
        {Array.isArray(service.technologies) && service.technologies.length > 0 && (
          <section>
            <h2>Technologies</h2>
            <ul>
              {service.technologies.map((tech, i) => (
                <li key={i}>{tech}</li>
              ))}
            </ul>
          </section>
        )}

        {/* BENEFITS */}
        {Array.isArray(service.benefits) && service.benefits.length > 0 && (
          <section>
            <h2>Benefits</h2>
            <ul>
              {service.benefits.map((benefit, i) => (
                <li key={i}>{benefit}</li>
              ))}
            </ul>
          </section>
        )}

        {/* USE CASES */}
        {Array.isArray(service.useCases) && service.useCases.length > 0 && (
          <section>
            <h2>Use Cases</h2>
            <ul>
              {service.useCases.map((useCase, i) => (
                <li key={i}>{useCase}</li>
              ))}
            </ul>
          </section>
        )}

      </div>
    </div>
  );
}

export default DetailedServicePage;
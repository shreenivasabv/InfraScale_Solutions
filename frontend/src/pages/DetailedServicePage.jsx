import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./DetailedServicePage.css";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

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
        const res = await axios.get(`${API_BASE}/api/detailed-services/${slug}`);
        setService(res.data);
      } catch (err) {
        setError("Unable to load service details");
      } finally {
        setLoading(false);
      }
    };
    fetchService();
  }, [slug]);

  if (loading) return <div className="loader">Loading Service...</div>;

  return (
    <div className="service-page">
      {/* HERO SECTION */}
      <header className="service-hero">
        <div className="content-width">
          <button className="back-link" onClick={() => navigate("/services")}>
            ← Back to Our Expertise
          </button>
          <h1 className="service-title">{service.title}</h1>
          <p className="hero-desc">{service.heroDescription}</p>
        </div>
      </header>

      <div className="content-width main-grid">
        {/* LEFT COLUMN: VISUALS & OVERVIEW */}
        <div className="main-content">
          {service.architectureImage && (
            <div className="image-card">
              <img src={service.architectureImage} alt="Architecture" />
              <p className="caption">System Architecture Diagram</p>
            </div>
          )}

          <section className="section-card">
            <h2>Overview</h2>
            <p>{service.overview}</p>
          </section>
        </div>

        {/* RIGHT COLUMN: LISTS (Technologies & Benefits) */}
        <aside className="sidebar">
          {service.technologies?.length > 0 && (
            <div className="side-card">
              <h3>Core Technologies</h3>
              <div className="tag-container">
                {service.technologies.map((tech, i) => (
                  <span key={i} className="tech-tag">{tech}</span>
                ))}
              </div>
            </div>
          )}

          {service.benefits?.length > 0 && (
            <div className="side-card accent">
              <h3>Key Benefits</h3>
              <ul className="check-list">
                {service.benefits.map((benefit, i) => (
                  <li key={i}>{benefit}</li>
                ))}
              </ul>
            </div>
          )}
        </aside>
      </div>

      {/* USE CASES SECTION (FULL WIDTH BELOW) */}
      {service.useCases?.length > 0 && (
        <div className="content-width">
          <section className="use-case-section">
            <h2>Use Cases</h2>
            <div className="use-case-grid">
              {service.useCases.map((useCase, i) => (
                <div key={i} className="use-case-card">{useCase}</div>
              ))}
            </div>
          </section>
        </div>
      )}
    </div>
  );
}

export default DetailedServicePage;
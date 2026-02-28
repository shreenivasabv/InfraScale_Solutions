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
      <div className="service-detail-page">
        <div className="loading">Loading...</div>
      </div>
    );
  }

  if (error || !service) {
    return (
      <div className="service-detail-page">
        <div className="error">
          <h2>{error || "Service not found"}</h2>
          <button onClick={() => navigate("/services")}>
            Back to Services
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="service-detail-page">

      <div className="service-detail-container">
        <div className="service-header">
          <h1>{service.title}</h1>
        </div>

        {service.heroDescription && (
          <section>
            <h2>Introduction</h2>
            <p>{service.heroDescription}</p>
          </section>
        )}

        {service.overview && (
          <section>
            <h2>Overview</h2>
            <p>{service.overview}</p>
          </section>
        )}

        {service.technologies?.length > 0 && (
          <section>
            <h3>Technologies</h3>
            <ul>
              {service.technologies.map((tech, i) => (
                <li key={i}>{tech}</li>
              ))}
            </ul>
          </section>
        )}

        {service.benefits?.length > 0 && (
          <section>
            <h3>Benefits</h3>
            <ul>
              {service.benefits.map((benefit, i) => (
                <li key={i}>{benefit}</li>
              ))}
            </ul>
          </section>
        )}

        {service.useCases?.length > 0 && (
          <section>
            <h3>Use Cases</h3>
            <ul>
              {service.useCases.map((useCase, i) => (
                <li key={i}>{useCase}</li>
              ))}
            </ul>
          </section>
        )}

        {service.architectureImage && (
          <section>
            <h3>Architecture</h3>
            <img
              src={service.architectureImage}
              alt="Architecture"
              style={{ maxWidth: "100%" }}
            />
          </section>
        )}

        {service.faqs?.length > 0 && (
          <section>
            <h3>FAQs</h3>
            {service.faqs.map((faq, i) => (
              <div key={i}>
                <strong>{faq.question}</strong>
                <p>{faq.answer}</p>
              </div>
            ))}
          </section>
        )}
      </div>
    </div>
  );
}

export default DetailedServicePage;
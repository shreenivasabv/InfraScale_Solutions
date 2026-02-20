import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import API, { BASE, buildUrl } from "../services/api";
import "./ServiceDetail.css";

export default function DetailedServicePage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const base = BASE || import.meta.env.VITE_API_URL || "http://localhost:5000";
        const res = await axios.get(`${base}/api/detailed-services/${encodeURIComponent(slug)}`);
        const d = res.data;
        // Normalize architecture image url
        if (d && d.architectureImage) {
          d.architectureImage = buildUrl(base, d.architectureImage) || d.architectureImage;
        }
        setItem(d);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [slug]);

  if (loading) return <div className="service-detail-page"><div className="loading">Loading...</div></div>;
  if (!item) return (
    <div className="service-detail-page">
      <p>Not found</p>
      <button onClick={() => navigate('/services')}>Back</button>
    </div>
  );

  return (
    <div className="service-detail-page">
      <button className="back-link" onClick={() => navigate('/services')}>← Back to Services</button>

      <div className="service-detail-container">
        <div className="service-header">
          <h1>{item.title}</h1>
          <p className="service-category">{item.slug}</p>
        </div>

        {item.heroDescription && (
          <div className="service-description">
            <h2>Intro</h2>
            <p>{item.heroDescription}</p>
          </div>
        )}

        {item.overview && (
          <div>
            <h2>Overview</h2>
            <p>{item.overview}</p>
          </div>
        )}

        {item.technologies?.length > 0 && (
          <div>
            <h3>Technologies</h3>
            <ul>{item.technologies.map((t,i)=> <li key={i}>{t}</li>)}</ul>
          </div>
        )}

        {item.benefits?.length > 0 && (
          <div>
            <h3>Benefits</h3>
            <ul>{item.benefits.map((b,i)=> <li key={i}>{b}</li>)}</ul>
          </div>
        )}

        {item.useCases?.length > 0 && (
          <div>
            <h3>Use Cases</h3>
            <ul>{item.useCases.map((u,i)=> <li key={i}>{u}</li>)}</ul>
          </div>
        )}

        {item.architectureImage && (
          <div>
            <h3>Architecture</h3>
            <img
              src={item.architectureImage || "/placeholder.png"}
              alt="architecture"
              style={{ maxWidth: '100%' }}
              onError={e => {
                e.target.onerror = null;
                e.target.src = "/placeholder.png";
              }}
            />
          </div>
        )}

        {item.faqs?.length > 0 && (
          <div>
            <h3>FAQs</h3>
            {item.faqs.map((f,i)=> (
              <div key={i} className="faq">
                <strong>{f.question}</strong>
                <p>{f.answer}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

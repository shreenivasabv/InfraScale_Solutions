import { useEffect, useState } from "react";
import axios from "axios";
import "./Services.css";

function Services() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/services")
      .then(res => setServices(res.data));
  }, []);

  return (
    <div className="services-page">
      <h1>Our Services</h1>

      <div className="services-grid">
        {services.map(service => (
          <div className="service-card" key={service._id}>
            <img src={service.image} alt={service.title} />
            <div className="overlay">
              <h2>{service.title}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Services;

import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './OurPartners.css';

const OurPartners = () => {
  const [partnerLogos, setPartnerLogos] = useState([]);
  const sectionRef = useRef(null);

  useEffect(() => {
    // Fetch data
    const fetchPartners = async () => {
      try {
        const base = import.meta.env.VITE_API_URL || "http://localhost:5000";

        const response = await axios.get(`${base}/api/partners`);
        const logoUrls = response.data.map(partner => partner.image);
        setPartnerLogos(logoUrls);
      } catch (error) {
        console.error("Error fetching partner logos:", error);
      }
    };
    fetchPartners();

    // Scroll Reveal Logic
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      },
      { threshold: 0.1 } // Triggers when 10% of the section is visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const gridSlots = Array(10).fill(null);

  return (
    <section className="our-partners-section" ref={sectionRef} id='partners'>
      <div className="partners-header-container">
        <h2 className="partners-main-heading">Our Certificates</h2>
        <div className="accent-line"></div>
      </div>

      <div className="partners-fixed-grid">
        {gridSlots.map((_, index) => (
          <div 
            key={index} 
            className={`partner-block ${!partnerLogos[index] ? 'is-empty' : ''}`}
            style={{ transitionDelay: `${index * 100}ms` }} // Staggered entrance
          >
            {partnerLogos[index] && (
              <img 
                src={partnerLogos[index]} 
                alt={`Partner ${index + 1}`} 
                className="partner-logo-img" 
              />
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default OurPartners;
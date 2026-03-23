import "./AboutCompany.css";

function AboutCompany() {
  return (
    <div className="about-wrapper">

      <section className="about-section card">
              <h2>About InfraScale</h2>
              <p>
                InfraScale is an enterprise-focused IT solutions provider specializing in 
                virtualization, cloud architecture, storage, backup, disaster recovery, 
                and DevOps transformation. We design secure, scalable, and high-performance 
                infrastructure solutions tailored for modern businesses.
              </p>
        </section>

      <section className="mission-vision">
        <div>
          <h3>Our Mission</h3>
          <p>
            To empower enterprises with resilient, optimized, and future-ready 
            IT infrastructure that drives innovation and sustainable growth.
          </p>
        </div>

        <div>
          <h3>Our Vision</h3>
          <p>
            To become a globally trusted infrastructure transformation partner 
            known for technical excellence, reliability, and strategic innovation.
          </p>
        </div>
      </section>

            <section className="values">
                  <div className="card">
                    <h3>Our Core Values</h3>
                    <ul>
                      <li>Technical Excellence</li>
                      <li>Integrity & Transparency</li>
                      <li>Customer-Centric Approach</li>
                      <li>Innovation & Continuous Improvement</li>
                      <li>Security & Reliability First</li>
                    </ul>
                  </div>
            </section>

    </div>
  );
}

export default AboutCompany;
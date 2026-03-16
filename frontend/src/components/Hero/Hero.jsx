import "./Hero.css";

function Hero() {
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (!section) return;

    const headerOffset = 110;
    const elementPosition = section.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.scrollY - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  };

  return (
    <section
      id="home"
      className="hero"
      style={{
        backgroundImage: `url('/hero-bg.png')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
      }}
    >
      <div className="hero-overlay">
        <div className="hero-content">
          <h1>We Don’t Just Manage IT. <br /> We Engineer Resilience.</h1>

          <p className="hero-text">
            Most IT firms provide support. We provide architectural mastery.
            From the physical rack-and-stack to complex multi-cloud migrations,
            our elite team of certified engineers builds the bedrock your business grows on.
          </p>

          <div className="hero-buttons">
            <button
              className="btn btn-primary"
              onClick={() => scrollToSection("contact")}
            >
              Get a Infrastructure Health Check
            </button>

            <button
              className="btn btn-outline"
              onClick={() => scrollToSection("techstack")}
            >
              Our Tech Stack
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
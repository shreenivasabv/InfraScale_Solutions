import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";
import "./SubNavbar.css";

function SubNavbar() {
  const [active, setActive] = useState("");
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      setShow(scrollY > 300);

      const sections = document.querySelectorAll("section");
      let current = "";

      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        if (scrollY >= sectionTop - 120) {
          current = section.getAttribute("id");
        }
      });

      setActive(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className={`subnav ${show ? "visible" : ""}`}>
  
  {/* 🔥 TITLE TOP CENTER */}
  <div className="subnav-title">
    What We have in this Page
  </div>

  {/* 🔥 ROW */}
  <div className="subnav-row">

    {/* LINKS CENTER */}
    <div className="subnav-links">
      <a href="#domains" className={active === "domains" ? "active" : ""}>
        Domains
      </a>
      <a href="#techstack" className={active === "tech" ? "active" : ""}>
        Tech Stack
      </a>
      <a href="#partners" className={active === "partners" ? "active" : ""}>
        Our Certifications
      </a>
      <a href="#contact" className={active === "contact" ? "active" : ""}>
        Contact
      </a>
    </div>

    {/* ARROW RIGHT */}
    <button className="scroll-top-btn" onClick={scrollToTop}>
      <FaArrowUp />
    </button>

  </div>
</div>
  );
}

export default SubNavbar;
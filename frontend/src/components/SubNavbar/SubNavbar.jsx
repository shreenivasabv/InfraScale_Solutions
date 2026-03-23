import { useEffect, useState } from "react";
import "./SubNavbar.css";

function SubNavbar() {
  const [active, setActive] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section");
      let current = "";

      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 120) {
          current = section.getAttribute("id");
        }
      });

      setActive(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="subnav">

    <div className="subnav-header">
      <h1>What We have in this Page</h1>
    </div>        
     
      <a href="#domains" className={active === "domains" ? "active" : ""}>
        Domains
      </a>
      <a href="#tech" className={active === "tech" ? "active" : ""}>
        Tech Stack
      </a>
      <a href="#partners" className={active === "partners" ? "active" : ""}>
        Partners
      </a>
      <a href="#contact" className={active === "contact" ? "active" : ""}>
        Contact
      </a>
    </div>
  );
}

export default SubNavbar;
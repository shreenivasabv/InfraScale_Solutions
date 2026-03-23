import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import "./Navbar.css";

function Navbar() {
  const [openMenu, setOpenMenu] = useState(null);
  const [showAdminMenu, setShowAdminMenu] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");
  const adminRef = useRef(null);

  const handleMouseEnter = (menu) => setOpenMenu(menu);
  const handleMouseLeave = () => setOpenMenu(null);

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === "dark" ? "light" : "dark"));
  };

  const toggleAdminMenu = () => {
    setShowAdminMenu(!showAdminMenu);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (adminRef.current && !adminRef.current.contains(event.target)) {
        setShowAdminMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="navbar">

      {/* LOGO */}
      <div className="logo">
        <Link to="/" className="logo-link">
          <img src="/company_logo.png" alt="Logo" className="company-logo" />
          <span className="logo-text">INFRASCALE IT SOLUTIONS</span>
        </Link>
      </div>

      {/* NAV LINKS */}
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>

        <li
          className="dropdown"
          onMouseEnter={() => handleMouseEnter("about")}
          onMouseLeave={handleMouseLeave}
        >
          <span>About Us ▾</span>
          {openMenu === "about" && (
            <ul className="dropdown-menu">
              <li><Link to="/about/company">Company</Link></li>
              <li><Link to="/partners">Our Certifications</Link></li>
            </ul>
          )}
        </li>

        <li
          className="dropdown"
          onMouseEnter={() => handleMouseEnter("solutions")}
          onMouseLeave={handleMouseLeave}
        >
          <span>Our Services ▾</span>
          {openMenu === "solutions" && (
            <ul className="dropdown-menu">
              <li><Link to="/services/Virtualization">Virtualization</Link></li>
              <li><Link to="/services/StorageBackup">Storage & Backup</Link></li>
            </ul>
          )}
        </li>

        <li><a href="#contact">Contact Us</a></li>
      </ul>

      {/* RIGHT ACTIONS */}
      <div className="navbar-actions">

        {/* THREE DOT MENU */}
        <div className="three-dot-container" ref={adminRef}>
          <div className="three-dot" onClick={toggleAdminMenu}>⋮</div>

          {showAdminMenu && (
            <div className="admin-dropdown">
              <Link to="/admin-login" onClick={() => setShowAdminMenu(false)}>
                Admin Login
              </Link>
            </div>
          )}
        </div>

        {/* THEME TOGGLE */}
        <button
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label="Toggle Theme"
        >
          {theme === "dark" ? <FaSun /> : <FaMoon />}
        </button>

      </div>
    </nav>
  );
}

export default Navbar;
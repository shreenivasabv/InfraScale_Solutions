import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import "./App.css";

/* PUBLIC PAGES */
import Home from "./pages/Home";
import ContactPage from "./pages/ContactPage";
import AboutCompany from "./pages/AboutCompany";
import Services from "./components/Services/Services";
import ServicesPage from "./pages/ServicesPage";
import Team from "./components/Team/Team";

/* NAVBAR */
import Navbar from "./components/Navbar/Navbar";

/* ADMIN */
import AdminLogin from "./pages/Admin/AdminLogin";
import AdminLayout from "./pages/Admin/AdminLayout";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminTeam from "./pages/Admin/AdminTeam";
import AdminServices from "./pages/Admin/AdminServices";
import AdminAbout from "./pages/Admin/AdminAbout";
import ManagePartners from "./pages/Admin/ManagePartners";

/* PROTECTED ROUTE */
import ProtectedRoute from "./components/ProtectedRoute";

function AppContent() {
  const location = useLocation();

  /* Hide navbar on admin pages */
  const hideNavbar =
    location.pathname.startsWith("/admin") ||
    location.pathname === "/admin-login";

  return (
    <>
      {!hideNavbar && <Navbar />}

      <Routes>

        {/* ---------- PUBLIC WEBSITE ---------- */}

        <Route path="/" element={<Home />} />

        <Route path="/contact" element={<ContactPage />} />

        <Route path="/about/company" element={<AboutCompany />} />

        <Route path="/services" element={<Services />} />

        <Route path="/services/:categoryName" element={<ServicesPage />} />

        <Route path="/team" element={<Team />} />

        {/* ---------- ADMIN LOGIN ---------- */}

        <Route path="/admin-login" element={<AdminLogin />} />

        {/* ---------- PROTECTED ADMIN ---------- */}

        <Route
          path="/admin/*"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />

          <Route path="team" element={<AdminTeam />} />

          <Route path="services" element={<AdminServices />} />

          <Route path="about" element={<AdminAbout />} />

          <Route path="partners" element={<ManagePartners />} />
        </Route>

      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import ContactPage from "./pages/ContactPage";
import AboutCompany from "./pages/AboutCompany";
import Team from "./components/Team/Team";
import Services from "./components/Services/Services";
import AdminLogin from "./pages/Admin/AdminLogin";
import AdminLayout from "./pages/Admin/AdminLayout";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminTeam from "./pages/Admin/AdminTeam";
import AdminServices from "./pages/Admin/AdminServices";
import AdminDetailedServices from "./pages/Admin/AdminDetailedServices";
import ManagePartners from "./pages/Admin/ManagePartners";
import DetailedServicePage from "./pages/DetailedServicePage";
import AdminAbout from "./pages/Admin/AdminAbout";
import ProtectedRoute from "./components/ProtectedRoute"; 
import ServicesPage from "./pages/ServicesPage";
import Navbar from "./components/Navbar/Navbar"; 
import MemberLogin from "./pages/TeamMember/MemberLogin";
import MemberRegister from "./pages/TeamMember/MemberRegister";
import MemberDashboard from "./pages/TeamMember/MemberDashboard";
import MemberDetailPage from "./pages/MemberDeatilPage";

function AppContent() {
  const location = useLocation();

  // Logic to hide Navbar on Admin, Login, and Dashboard routes
  const hideNavbar = 
    location.pathname.startsWith("/admin") || 
    location.pathname === "/admin-login" ||
    location.pathname === "/member-login" ||
    location.pathname === "/member-register" ||
    location.pathname === "/member-dashboard";

  return (
    <>
      {!hideNavbar && <Navbar />}

      <Routes>
        {/* --- PUBLIC WEBSITE ROUTES --- */}
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/about/company" element={<AboutCompany />} />
        <Route path="/services" element={<Services />} />
        <Route path="/team" element={<Team />} />
        <Route path="/services/:categoryName" element={<ServicesPage />} />
        <Route path="/team/:id" element={<MemberDetailPage />} />
        <Route path="/detailed-services/:slug" element={<DetailedServicePage />} />
        
        {/* --- MEMBER AUTHENTICATION ROUTES --- */}
        <Route path="/member-login" element={<MemberLogin />} />
        <Route path="/member-register" element={<MemberRegister />} />
        
        {/* --- PROTECTED MEMBER ROUTES --- */}
        <Route 
          path="/member-dashboard" 
          element={
            <ProtectedRoute>
              <MemberDashboard />
            </ProtectedRoute>
          } 
        />
        
        {/* --- ADMIN AUTHENTICATION --- */}
        <Route path="/admin-login" element={<AdminLogin />} />

        {/* --- PROTECTED ADMIN ROUTES --- */}
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          {/* Sub-routes render inside AdminLayout's <Outlet /> */}
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="team" element={<AdminTeam />} />
          <Route path="services" element={<AdminServices />} />
          <Route path="detailed-services" element={<AdminDetailedServices />} />
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
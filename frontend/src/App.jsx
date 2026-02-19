import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ContactPage from "./pages/ContactPage";
import Company from "./pages/Company";
import Team from "./components/Team/Team";
import Services from "./components/Services/Services";
import AdminLogin from "./pages/Admin/AdminLogin";
import AdminLayout from "./pages/Admin/AdminLayout";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminTeam from "./pages/Admin/AdminTeam";
import AdminServices from "./pages/Admin/AdminServices";
import ProtectedRoute from "./components/protectedRoute";
import ServicesPage from "./pages/ServicesPage";  


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/about/company" element={<Company />} />
        <Route path="/services" element={<Services />} />
        <Route path="/team" element={<Team />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/services/:categoryName" element={<ServicesPage />} />

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
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ContactPage from "./pages/ContactPage";
import Virtualization from "./pages/Virtualization";
import StorageBackup from "./pages/StorageBackup";
import DevOps from "./pages/Devops";
import Company from "./pages/Company";
import Team from "./components/Team/Team";
import Services from "./components/Services/Services";
import AdminLogin from "./pages/Admin/AdminLogin";
import AdminLayout from "./pages/Admin/AdminLayout";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminTeam from "./pages/Admin/AdminTeam";
import AdminServices from "./pages/Admin/AdminServices";
import ProtectedRoute from "./components/protectedRoute";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/services/virtualization" element={<Virtualization />} />
        <Route path="/services/storage-backup" element={<StorageBackup />}   />
        <Route path="/services/devops" element={<DevOps />} />
        <Route path="/about/company" element={<Company />} />
        <Route path="/services" element={<Services />} />
        <Route path="/team" element={<Team />} />
        <Route path="/admin-login" element={<AdminLogin />} />

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

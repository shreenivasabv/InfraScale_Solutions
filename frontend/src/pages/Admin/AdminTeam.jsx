import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import "./AdminTeam.css"; // Complete this import

function AdminTeam() {
  const [members, setMembers] = useState([]);
  const [form, setForm] = useState({
    name: "",
    designation: "",
    specialization: "",
    experience: "",
    features: ""
  });
  const [image, setImage] = useState(null);

  const token = localStorage.getItem("token");

  const fetchMembers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/team");
      setMembers(res.data);
    } catch (err) {
      toast.error("Failed to fetch members");
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) return toast.error("Please upload an image");

    const formData = new FormData();
    // Append fields individually to ensure proper formatting
    formData.append("name", form.name);
    formData.append("designation", form.designation);
    formData.append("specialization", form.specialization);
    formData.append("experience", form.experience);
    formData.append("features", JSON.stringify(form.features.split(",").map(f => f.trim())));
    formData.append("image", image);

    try {
      await axios.post("http://localhost:5000/api/team", formData, {
        headers: { 
          Authorization: token,
          "Content-Type": "multipart/form-data" 
        }
      });

      toast.success("Member Added");
      // Reset form
      setForm({ name: "", designation: "", specialization: "", experience: "", features: "" });
      setImage(null);
      e.target.reset(); 
      fetchMembers();
    } catch (err) {
      toast.error(err.response?.data?.message || "Error adding member");
    }
  };

  const deleteMember = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/team/${id}`, {
        headers: { Authorization: token }
      });
      toast.success("Deleted");
      fetchMembers();
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="admin-team-container">
      <h2>Manage Team</h2>

      <form onSubmit={handleSubmit}>
        <input 
          placeholder="Name" 
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })} 
          required 
        />
        <input 
          placeholder="Designation" 
          value={form.designation}
          onChange={(e) => setForm({ ...form, designation: e.target.value })} 
          required 
        />
        <input 
          placeholder="Specialization" 
          value={form.specialization}
          onChange={(e) => setForm({ ...form, specialization: e.target.value })} 
        />
        <input 
          placeholder="Experience" 
          value={form.experience}
          onChange={(e) => setForm({ ...form, experience: e.target.value })} 
        />
        <input 
          placeholder="Features (comma separated)" 
          value={form.features}
          onChange={(e) => setForm({ ...form, features: e.target.value })} 
        />
        <input type="file" onChange={(e) => setImage(e.target.files[0])} required />
        <button type="submit">Add Member</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Designation</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {members.map((member) => (
            <tr key={member._id}>
              <td>{member.name}</td>
              <td>{member.designation}</td>
              <td>
                <button className="delete-btn" onClick={() => deleteMember(member._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminTeam;
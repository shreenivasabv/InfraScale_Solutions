import { useEffect, useState } from "react";
import axios from "axios";
import "./Team.css";
import placeholder from "../../assets/placeholder.png";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

function Team() {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const res = await axios.get(`${API_BASE}/api/team`);
        setMembers(res.data || []);
      } catch (err) {
        console.error("Error fetching team:", err);
        setMembers([]);
      }
    };

    fetchMembers();
  }, []);

  return (
    <div className="team-page">
      <h1>Our Team</h1>

      <div className="team-grid">
        {members.length === 0 ? (
          <p>No team members available.</p>
        ) : (
          members.map((member) => (
            <div className="team-card" key={member._id}>
              <img
                src={
                  member.image
                    ? `${API_BASE}/uploads/${member.image}`
                    : placeholder
                }
                alt={member.name}
                className="team-image"
                onError={(e) => (e.target.src = placeholder)}
              />

              <h3>{member.name}</h3>
              <p className="designation">{member.designation}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Team;
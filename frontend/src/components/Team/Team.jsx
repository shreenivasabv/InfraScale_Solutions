import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Team.css";
import MemberAccessButton from "../MemberAccessButton/MemberAccessButton";
import placeholder from "../../assets/placeholder.png";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

function Team() {
  const [members, setMembers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const res = await axios.get(`${API_BASE}/api/team`);
        setMembers(res.data || []);
      } catch (err) {
        console.error("❌ Error fetching team:", err);
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
          <p className="no-members">No team members available.</p>
        ) : (
          members.map((member) => {
            // Safely handle features
            let features = [];
            if (Array.isArray(member.features)) {
              features = member.features;
            } else {
              try {
                features = JSON.parse(member.features || "[]");
              } catch {
                features = [];
              }
            }

            return (
              <div
                className="team-card"
                key={member._id}
                onClick={() => navigate(`/team/${member._id}`)}
              >
                <img
                  src={
                    member.image && member.image.startsWith("http")
                      ? member.image
                      : placeholder
                  }
                  alt={member.name}
                  className="team-image"
                  onError={(e) => {
                    e.target.src = placeholder;
                  }}
                />

                <h3>{member.name}</h3>
                <p className="designation">{member.designation}</p>
                <p>
                  <strong>Specialization:</strong>{" "}
                  {member.specialization || "N/A"}
                </p>
                <p>
                  <strong>Experience:</strong>{" "}
                  {member.experience || 0} Years
                </p>

                {features.length > 0 && (
                  <ul>
                    {features.map((f, i) => (
                      <li key={i}>{f}</li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })
        )}
      </div>

      <MemberAccessButton />
    </div>
  );
}

export default Team;
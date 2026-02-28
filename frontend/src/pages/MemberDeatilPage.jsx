import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./MemberDetailPage.css";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

function MemberDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMember = async () => {
      try {
        const res = await axios.get(`${API_BASE}/api/team/${id}`);
        setMember(res.data);
      } catch (err) {
        console.error("Failed to fetch member:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMember();
  }, [id]);

  if (loading) {
    return <div className="member-detail-page">Loading...</div>;
  }

  if (!member) {
    return (
      <div className="member-detail-page">
        <h2>Member not found</h2>
        <button onClick={() => navigate("/team")}>
          Back to Team
        </button>
      </div>
    );
  }

  return (
    <div className="member-detail-page">
      <button className="back-btn" onClick={() => navigate("/team")}>
        ← Back to Team
      </button>

      <div className="member-detail-container">
        <div className="member-header">
          <img
            src={
              member.image
                ? `${API_BASE}/uploads/${member.image}`
                : "/placeholder.png"
            }
            alt={member.name}
          />

          <div>
            <h1>{member.name}</h1>
            <p className="designation">{member.designation}</p>
            <p className="specialization">{member.specialization}</p>
            <p className="experience">
              {member.experience} Years Experience
            </p>
          </div>
        </div>

        {member.features?.length > 0 && (
          <section>
            <h2>Skills</h2>
            <ul>
              {member.features.map((skill, i) => (
                <li key={i}>{skill}</li>
              ))}
            </ul>
          </section>
        )}

        {member.projects?.length > 0 && (
          <section>
            <h2>Projects</h2>
            {member.projects.map((proj, i) => (
              <div key={i} className="project-card">
                <h3>{proj.title}</h3>
                <p>{proj.technologies?.join(", ")}</p>
              </div>
            ))}
          </section>
        )}

        {member.workExperience?.length > 0 && (
          <section>
            <h2>Work Experience</h2>
            {member.workExperience.map((exp, i) => (
              <div key={i} className="experience-card">
                <h3>{exp.company}</h3>
                <p>{exp.designation}</p>
                <span>{exp.duration}</span>
              </div>
            ))}
          </section>
        )}
      </div>
    </div>
  );
}

export default MemberDetailPage;
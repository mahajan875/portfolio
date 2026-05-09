import { useEffect, useState } from "react";
import axios from "axios";
import "./Projects.css";

export default function Projects() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API}/api/projects`)
      .then(res => setData(res.data));
  }, []);

  return (
    <div className="projects-container">
      <h2 className="projects-title">My Projects</h2>

      <div className="projects-grid">
        {data.map(p => (
          <div className="project-card" key={p._id}>
            
            {p.image && (
              <img
                src={`${process.env.REACT_APP_API}/uploads/${p.image}`}
                alt="project"
                className="project-image"
              />
            )}

            <h3>{p.title}</h3>
            <p>{p.description}</p>

            <div className="tech">
              {p.technologies?.map((t, i) => (
                <span key={i}>{t}</span>
              ))}
            </div>

            <div className="links">
              <a href={p.githubUrl} target="_blank">GitHub</a>
              <a href={p.liveUrl} target="_blank">Live</a>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}
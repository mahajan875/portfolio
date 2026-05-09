import { useEffect, useState } from "react";
import axios from "axios";

export default function Skills() {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API}/api/skills`)
      .then(res => setSkills(res.data));
  }, []);

  return (
    <div>
      <h2>Skills</h2>

      <div className="grid">
        {skills.map(s => (
          <div className="card" key={s._id}>
            <h3>{s.name}</h3>
            <p>{s.category}</p>
            <p>{s.proficiency}%</p>
          </div>
        ))}
      </div>
    </div>
  );
}
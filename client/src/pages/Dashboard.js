import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  const [section, setSection] = useState("skills");

  const [skills, setSkills] = useState([]);
  const [projects, setProjects] = useState([]);

  const [form, setForm] = useState({
    name: "",
    category: "",
    proficiency: ""
  });

  const [projectForm, setProjectForm] = useState({
    title: "",
    description: "",
    technologies: "",
    githubUrl: "",
    liveUrl: "",
    image: null
  });

  const [editId, setEditId] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchSkills();
    fetchProjects();
  }, []);

  // ================= LOGOUT =================
  const logout = () => {
    if (window.confirm("Logout?")) {
      localStorage.removeItem("token");
      navigate("/admin");
    }
  };

  // ================= SKILLS =================
  const fetchSkills = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API}/api/skills`);
    setSkills(res.data);
  };

  const handleSubmit = async () => {
    try {
      if (editId) {
        await axios.put(
          `${process.env.REACT_APP_API}/api/skills/${editId}`,
          form,
          {
            headers: { Authorization: "Bearer " + token }
          }
        );
        setEditId(null);
      } else {
        await axios.post(
          `${process.env.REACT_APP_API}/api/skills`,
          { ...form, icon: form.name },
          {
            headers: { Authorization: "Bearer " + token }
          }
        );
      }

      setForm({ name: "", category: "", proficiency: "" });
      fetchSkills();

    } catch (err) {
      alert(err.response?.data);
    }
  };

 const deleteSkill = async (id) => {
  try {
    await axios.delete(
      `${process.env.REACT_APP_API}/api/skills/${id}`,
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      }
    );

    alert("Deleted");
    fetchSkills();

  } catch (err) {
    console.log(err.response?.data);
    alert("Error: " + err.response?.data);
  }
};
  const editSkill = (s) => {
    setForm({
      name: s.name,
      category: s.category,
      proficiency: s.proficiency
    });
    setEditId(s._id);
  };

  // ================= PROJECTS =================
  const fetchProjects = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API}/api/projects`);
    setProjects(res.data);
  };

  const addProject = async () => {
    const formData = new FormData();

    Object.keys(projectForm).forEach(key => {
      formData.append(key, projectForm[key]);
    });

    await axios.post(
      `${process.env.REACT_APP_API}/api/projects`,
      formData,
      {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "multipart/form-data"
        }
      }
    );

    setProjectForm({
      title: "",
      description: "",
      technologies: "",
      githubUrl: "",
      liveUrl: "",
      image: null
    });

    fetchProjects();
  };

  const deleteProject = async (id) => {
    await axios.delete(
      `${process.env.REACT_APP_API}/api/projects/${id}`,
      {
        headers: {
          Authorization: "Bearer " + token
        }
      }
    );

    fetchProjects();
  };

  // ================= UI =================
  return (
    <div className="dashboard">

      {/* SIDEBAR */}
      <div className="sidebar">
        <h2>Admin</h2>

        <button onClick={() => setSection("skills")}>Skills</button>
        <button onClick={() => setSection("projects")}>Projects</button>

        <hr />

        <button onClick={logout}>Logout</button>
      </div>

      {/* MAIN */}
      <div className="main">

        <h2>{section.toUpperCase()}</h2>

        {/* ================= SKILLS ================= */}
        {section === "skills" && (
          <>
            <div className="card">
              <input
                placeholder="Skill"
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
              />

              <input
                placeholder="Category"
                value={form.category}
                onChange={e => setForm({ ...form, category: e.target.value })}
              />

              <input
                type="number"
                placeholder="Proficiency"
                value={form.proficiency}
                onChange={e => setForm({ ...form, proficiency: e.target.value })}
              />

              <button onClick={handleSubmit}>
                {editId ? "Update" : "Add"}
              </button>
            </div>

            <div className="grid">
              {skills.map(s => (
                <div className="card" key={s._id}>
                  <h3>{s.name}</h3>
                  <p>{s.category}</p>
                  <p>{s.proficiency}%</p>

                  <button onClick={() => editSkill(s)}>Edit</button>
                  <button onClick={() => deleteSkill(s._id)}>Delete</button>
                </div>
              ))}
            </div>
          </>
        )}

        {/* ================= PROJECTS ================= */}
        {section === "projects" && (
          <>
            <div className="card">
              <h3>Add Project</h3>

              <input
                placeholder="Title"
                value={projectForm.title}
                onChange={e => setProjectForm({ ...projectForm, title: e.target.value })}
              />

              <input
                placeholder="Description"
                value={projectForm.description}
                onChange={e => setProjectForm({ ...projectForm, description: e.target.value })}
              />

              <input
                placeholder="Technologies (React, Node)"
                value={projectForm.technologies}
                onChange={e => setProjectForm({ ...projectForm, technologies: e.target.value })}
              />

              <input
                placeholder="GitHub URL"
                value={projectForm.githubUrl}
                onChange={e => setProjectForm({ ...projectForm, githubUrl: e.target.value })}
              />

              <input
                placeholder="Live URL"
                value={projectForm.liveUrl}
                onChange={e => setProjectForm({ ...projectForm, liveUrl: e.target.value })}
              />

              <input
                type="file"
                onChange={e => setProjectForm({ ...projectForm, image: e.target.files[0] })}
              />

              <button onClick={addProject}>Add Project</button>
            </div>

            <div className="grid">
              {projects.length > 0 ? (
                projects.map(p => (
                  <div className="card" key={p._id}>
                    <h3>{p.title}</h3>
                    <p>{p.description}</p>

                    {p.image && (
                      <img
                        src={`${process.env.REACT_APP_API}/uploads/${p.image}`}
                        alt="project"
                        style={{ width: "100%", borderRadius: "8px" }}
                      />
                    )}

                    {p.technologies && (
                      <p><b>Tech:</b> {p.technologies.join(", ")}</p>
                    )}

                    <div>
                      {p.githubUrl && (
                        <a href={p.githubUrl} target="_blank" rel="noreferrer">
                          <button>GitHub</button>
                        </a>
                      )}

                      {p.liveUrl && (
                        <a href={p.liveUrl} target="_blank" rel="noreferrer">
                          <button>Live</button>
                        </a>
                      )}
                    </div>

                    <button onClick={() => deleteProject(p._id)}>
                      Delete
                    </button>
                  </div>
                ))
              ) : (
                <p>No projects added</p>
              )}
            </div>
          </>
        )}

      </div>
    </div>
  );
}
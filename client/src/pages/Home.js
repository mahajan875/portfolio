import { Link } from "react-router-dom";
import Skills from "../components/Skills";
import Projects from "../components/Projects";
import Contact from "../components/Contact";

export default function Home() {
  return (
    <>
      {/* 🔥 NAVBAR */}
      <div style={{ display: "flex", justifyContent: "space-between", padding: "10px", background: "#1e293b" ,borderRadius:"15px"}}>
        <h2>Portfolio</h2>

        <Link to="/dashboard" style={{ color: "white", textDecoration: "none" }}>
          Dashboard
        </Link>
      </div>

      <h1>Welcome</h1>

      <Skills />
      <Projects />
      <Contact />
    </>
  );
}
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [data, setData] = useState({});
  const navigate = useNavigate();

  const login = async () => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/auth/login`,
        data
      );

      localStorage.setItem("token", res.data.token);

      alert("Login successful");

      navigate("/dashboard");

    } catch (err) {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Admin Login</h2>

        <input
          placeholder="Email"
          onChange={e => setData({ ...data, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={e => setData({ ...data, password: e.target.value })}
        />

        <button onClick={login}>Login</button>
      </div>
    </div>
  );
}
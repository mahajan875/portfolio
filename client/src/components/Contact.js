import { useState } from "react";
import axios from "axios";

export default function Contact() {
  const [form, setForm] = useState({ email: "", message: "" });

  const submit = async () => {
    await axios.post(`${process.env.REACT_APP_API}/api/contact`, form);
    alert("Message Sent");
  };

  return (
    <div>
      <h2>Contact</h2>

      <div className="card">
        <input
          placeholder="Email"
          onChange={e => setForm({ ...form, email: e.target.value })}
        />

        <textarea
          placeholder="Message"
          onChange={e => setForm({ ...form, message: e.target.value })}
        />

        <button onClick={submit}>Send</button>
      </div>
    </div>
  );
}
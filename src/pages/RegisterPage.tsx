import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../slices/userSlice";
import { useNavigate } from "react-router-dom";

const RegisterPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [cell, setCell] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || !name) return alert("Please fill in all required fields!");
    await dispatch(registerUser({ email, password, name, surname, cell }));
    alert("User registered successfully!");
    navigate("/home");
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f0fff0", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <form onSubmit={handleSubmit} style={{ background: "white", padding: "2rem", borderRadius: "8px", boxShadow: "0 0 10px rgba(0,0,0,0.1)" }}>
        <h1 style={{ color: "#006400", marginBottom: "1rem" }}>Register</h1>
        <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} style={{ display:"block", marginBottom:"0.5rem", padding:"0.4rem", width:"100%" }} />
        <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} style={{ display:"block", marginBottom:"0.5rem", padding:"0.4rem", width:"100%" }} />
        <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} style={{ display:"block", marginBottom:"0.5rem", padding:"0.4rem", width:"100%" }} />
        <input placeholder="Surname" value={surname} onChange={e => setSurname(e.target.value)} style={{ display:"block", marginBottom:"0.5rem", padding:"0.4rem", width:"100%" }} />
        <input placeholder="Cell" value={cell} onChange={e => setCell(e.target.value)} style={{ display:"block", marginBottom:"0.5rem", padding:"0.4rem", width:"100%" }} />
        <button type="submit" style={{ backgroundColor: "#006400", color: "white", padding: "0.5rem 1rem", border: "none", cursor:"pointer", width:"100%", marginTop:"0.5rem" }}>Register</button>
      </form>
    </div>
  );
};

export default RegisterPage;
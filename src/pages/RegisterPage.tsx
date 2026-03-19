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
    await dispatch(registerUser({ email, password, name, surname, cell }));
    alert("User registered!");
    navigate("/home");
  };

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>

        <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
        <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
        <input placeholder="Surname" value={surname} onChange={e => setSurname(e.target.value)} />
        <input placeholder="Cell" value={cell} onChange={e => setCell(e.target.value)} />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterPage;
import { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../slices/userSlice";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [cell, setCell] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    const newUser = {
      name,
      surname,
      email,

      cell,

      password,
    };

    try {
      await dispatch(registerUser(newUser)).unwrap();
      alert("Registration successful!");
      navigate("/");
    } catch (err) {
      alert("Registration failed");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1 style={{ color: "green" }}>ReaReka Register</h1>

      <form onSubmit={handleRegister}>
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br /><br />

        <input
          placeholder="Surname"
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
        />
        <br /><br />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br /><br />

        <input
          placeholder="Cell Number"
          value={cell}
          onChange={(e) => setCell(e.target.value)}
        />
        <br /><br />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br /><br />

        <button style={{ backgroundColor: "green", color: "white" }}>
          Register
        </button>
      </form>

      <br />

      <p>Already have an account?</p>
      <button onClick={() => navigate("/")}>
        Login here
      </button>
    </div>
  );
};

export default RegisterPage;
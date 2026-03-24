import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../slices/userSlice";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const dispatch = useDispatch();


  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await dispatch(loginUser({ email, password })).unwrap();
      navigate("/home");
    } catch (err) {
      alert("Invalid credentials");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1 style={{ color: "green" }}>ReaReka Login</h1>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br /><br />

        <input
          type="password"
          placeholder=
          "Password"

          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br /><br />

        <button style={{ backgroundColor: "green", color: "white" }}>
          Login
        </button>
      </form>

      <br />

      <p>Don't have an account?</p>
      
      <button onClick={() => navigate("/register")}>
        Register here
      </button>
    </div>
  );
};




export default LoginPage;
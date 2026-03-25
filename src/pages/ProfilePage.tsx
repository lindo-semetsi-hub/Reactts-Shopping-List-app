import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";


import { updateUser, logout } from "../slices/userSlice";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const currentUser = useSelector((state: RootState) => state.user.currentUser);

  const [name, setName] = useState(currentUser?.name || "");
  const [surname, setSurname] = useState(currentUser?.surname || "");
  const [email, setEmail] = useState(currentUser?.email || "");
  const [cell, setCell] = useState(currentUser?.cell || "");
  
  const [password, setPassword] = useState(currentUser?.password || "");

  const handleUpdate = () => {
    const updatedUser = { name, surname, email, cell, password };

    dispatch(updateUser(updatedUser));

    alert("Profile update successfully");
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  if (!currentUser) {
    return <h2>No user logged in</h2>;
  }









  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ color: "green" }}>Your Profile</h1>

      <input value={name} onChange={(e) => setName(e.target.value)} />
      <br /><br />

      <input value={surname} onChange={(e) => setSurname(e.target.value)} />
      <br /><br />

      <input value={email} onChange={(e) => setEmail(e.target.value)} />
      <br /><br />

      <input value={cell} onChange={(e) => setCell(e.target.value)} />
      <br /><br />

      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br /><br />

      <button onClick={handleUpdate} style={{ background: "green", color: "white" }}>
        Update Profile
      </button>

      <br /><br />

      <button onClick={() => navigate("/home")}>
        Back to Home
      </button>

      <br /><br />

      <button onClick={handleLogout} style={{ background: "red", color: "white" }}>
        Logout
      </button>
    </div>
  );
};

export default ProfilePage;
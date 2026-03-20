import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";

//import {useNavigate } from 'react-router-dom';
import {useEffect} from 'react'

//const naigate = useNavigate();

//useEffect(() => {
  if (!currentUser) {
    navigate("/");
  }
 //}, [currentUser,navigate]);

const ProfilePage: React.FC = () => {
  const currentUser = useSelector((state: RootState) => state.user.currentUser);

  if (!currentUser) return <h1 style={{ padding:"2rem", color:"#006400" }}>No user logged in</h1>;

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f0fff0", padding:"2rem", fontFamily:"Arial" }}>
      <h1 style={{ color:"#006400" }}>Profile</h1>
      <div style={{ background:"white", padding:"1rem", borderRadius:"8px", width:"300px", boxShadow:"0 0 10px rgba(0,0,0,0.1)" }}>
        <p><strong>Email:</strong> {currentUser.email}</p>
        <p><strong>Name:</strong> {currentUser.name} {currentUser.surname}</p>
        <p><strong>Cell:</strong> {currentUser.cell}</p>
      </div>
    </div>
  );
};

export default ProfilePage;
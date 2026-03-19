import React from "react";
import { useSelector } from

"react-redux";

import { RootState } from "../store";

const ProfilePage: React.FC = () => {
  const currentUser = useSelector((state: RootState) => state.user.currentUser);

  if (!currentUser) return <h1>No user logged in</h1>;

  return (
    <div>
      <h1>Profile</h1>
      <p>Email: {currentUser.email} </p>
      <p>Name: {currentUser.name} {currentUser.surname}</p>
      <p>Cell: {currentUser.cell}</p>
    </div>
  );
};

export default ProfilePage;
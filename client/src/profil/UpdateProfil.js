import React from "react";
import LeftNav from "../components/LeftNav";
import { useSelector } from "react-redux";
import UploadImg from "./UploadImg";

const UpdateProfil = () => {
  const userData = useSelector((state) => state.userReducer);
  return (
    <div className="profil-contailer">
      <LeftNav />
      <h1>Profil de {userData.results[0].user_firstname}</h1>
      <div className="update-container">
        <div className="left-part">
          <h3>Photo de profil</h3>
          <img src={userData.results[0].user_picture} alt="user-pic" />
          <UploadImg />
        </div>
      </div>
    </div>
  );
};

export default UpdateProfil;

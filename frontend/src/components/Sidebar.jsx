import React from "react";
import AuthHooks from './hooks/AuthHooks';
import { useNavigate, NavLink } from 'react-router-dom';
import {IoLogOut, IoPerson, IoCar, IoPricetag, IoHome } from "react-icons/io5";
import logo from "../logo.PNG";

const Sidebar = () => {
  // TAKE TOKEN EMPLOYÉ INFO
  const navigate = useNavigate();
  const { userInfo, logOutUser } = AuthHooks();
  React.useEffect(() => {
    console.log(" generation Sidebar")
  }, []);
  const logOut = () => {
    console.log("Deconnection utilisateur employé ")
    logOutUser();
    navigate("/")
  }

  return (
    <div >
      <aside className="menu pl-2 has-shadow ">
        <p className="menu-label">General</p>
        <ul className="menu-list">
          <li>
            <NavLink to={"/home"}>
              <IoHome /> Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to={"/produit"}>
              <IoPricetag /> Produit
            </NavLink>
          </li>
          <li>
            <NavLink to={"/voiture"}>
              <IoCar />Voiture
            </NavLink>
          </li>
          <li>
            <NavLink to={"/profil"}>
              <IoPerson /> Profil
            </NavLink>
          </li>
          
          <li>
          <p >{ userInfo.nom } { userInfo.prenoms } <br/> {userInfo.mail}</p>
          </li>
        </ul>
        <ul className="menu-list">
          <li>
            <img height={150} width={150} src={logo} alt="logo" />
          </li>
        </ul>
        <ul className="menu-list">
          <li>
            <button onClick={logOut} className="button is-white">
              <IoLogOut /> Deconnecter 
            </button>
          </li>
        
        </ul>
      </aside>
    </div>
  );
};

export default Sidebar;
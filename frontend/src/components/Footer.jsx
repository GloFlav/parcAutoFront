import React from "react";
import AuthHooks from './hooks/AuthHooks';
// import { useNavigate, NavLink } from 'react-router-dom';
// import logo from "../onn.PNG";

const Footer = () => {
  // const navigate = useNavigate();
  // const { logOutUser } = AuthHooks();
  React.useEffect(() => {
    console.log(" generation Footer")
  }, []);
  
  const { userInfo } = AuthHooks();
  React.useEffect(() => {
  // console.log("redirection produit")
  }, []);
  return (
    <div>
      <nav
        className="navbar is-fixed-bottom has-shadow is-centered "
        role="navigation"
        aria-label="main navigation"
      >
        <div id="navbarBasicExample" className="navbar-menu"> 
        <div className="navbar-center">
            <div className="navbar-item">
            <div >
                <p>Here is the ONN's nindo</p>
            <p className="has-text-centered">
            | Employé : { userInfo.nom } { userInfo.prenoms } { userInfo.matricule} |
            Mail : {userInfo.mail} |
            Unité : {userInfo.appelation} | Fonction : {userInfo.roles} | Rang : {userInfo.rang} |
            © Glo Flavien </p>
            </div>
            </div>
        </div>
        </div>
    </nav>
    </div>
  );
};

export default Footer;

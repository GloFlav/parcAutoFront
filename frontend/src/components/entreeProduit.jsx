import React from 'react';
import {/* useNavigate,*/ NavLink } from 'react-router-dom';
import AuthHooks from './hooks/AuthHooks';
import background from "./../background.jpg";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const Produit = () => {
const { userInfo } = AuthHooks();
  React.useEffect(() => {
    console.log("redirection produit")
  }, []);
  
  if(userInfo.nom && userInfo.mail){
      return (
        <React.Fragment>
              <div className="columns mt-6"> Entrée  Produit is here </div>
              
        </React.Fragment>
      );
  }
  else return <><div>chargement spinner </div></>
}

export default Produit;

import React from "react";
import AuthHooks from './hooks/AuthHooks';
import { useNavigate, NavLink } from 'react-router-dom';
import logo from "../onn.PNG";

const Navbar = () => {
  const navigate = useNavigate();
  const { logOutUser } = AuthHooks();
  React.useEffect(() => {
    console.log(" genration Navbar")
  }, []);
  const logOut = () => {
    console.log("Deconection utilisateur employé ")
    logOutUser();
    navigate("/")
  }
  return (
    <div>
      <nav
        className="navbar is-fixed-top has-shadow  "
        role="navigation"
        aria-label="main navigation"
      >
        <div className="navbar-brand is-fullheigth">
          <NavLink to="/home" className="navbar-item">
            <img  src={logo} alt="onn" />
          </NavLink>
        </div>
        <div id="navbarBasicExample" className="navbar-menu"> 
          <div className="navbar-end">
            <div className="navbar-item">
              <div className="title is-3">
                ONN STOCK FLOAT BOARD
              </div>
            </div>
          </div>
        </div>
        <div id="navbarBasicExample" className="navbar-menu"> 
          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                <button onClick={logOut} className="button is-light">
                  Deconnecter
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;

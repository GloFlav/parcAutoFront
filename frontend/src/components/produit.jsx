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
              <div className="columns mt-6">
                <div className="column is-2">
                  <Sidebar />
                </div>
                <Navbar />
                <div className="column has-background-light" style={{ 
                  backgroundImage: `url(${background})`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              width: '100vw',
              height: '100vh'
            }}>
              <div className="container">
  
                <form className="box" style={{opacity: 0}}></form>
                <form className="box" style={{opacity: 0}}></form>
    
                <form  className="box"  style={{
                  backgroundColor: 'blue',
                  opacity: 0.8
                }}>
                  <p className="has-text-centered">
                    <NavLink  to={"/DEP"} className="title is-6" style={{
                      color: "black",
                      background: 'white',
                      opacity: 0.8
                    }}>
                        |DEMANDE ENTRÉE PRODUIT|
                    </NavLink>
                    ...
                    <NavLink  to={"/memorandum"} className="title is-6" style={{
                      color: "black",
                      background: 'white',
                      opacity: 0.8
                    }}>
                        |MEMORANDUM|
                    </NavLink>
                  </p>
                </form>
  
                <form  className="box"  style={{
                  backgroundColor: 'yellow',
                  opacity: 0.8
                }}>
                  <p className="has-text-centered">
                    <NavLink  to={"/entreeProduit"} className="title is-6" style={{
                      color: "black",
                      background: 'white',
                      opacity: 0.8
                    }}>
                        |ENTRÉE PRODUIT|
                    </NavLink>
                    ...
                    <NavLink  to={"/sortieProduit"} className="title is-6" style={{
                      color: "black",
                      background: 'white',
                      opacity: 0.8
                    }}>
                        |SORTIE PRODUIT|
                    </NavLink>
                  </p>
                </form>
  
                <form  className="box"  style={{
                  backgroundColor: 'green',
                  opacity: 0.8
                }}>
                <p className="has-text-centered">
                  <NavLink  to={"/listProduit"} className="title is-6" style={{
                      color: "black",
                      background: 'white',
                      opacity: 0.8
                  }}>
                      |LISTE PRODUIT|
                  </NavLink>
                  ...
                  <NavLink  to={"/historiqueProduit"} className="title is-6" style={{
                      color: "black",
                      background: 'white',
                      opacity: 0.8
                  }}>
                      |HISTORIQUE|
                  </NavLink>
                </p>
                </form>
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
                        | Employé : { userInfo.nom } { userInfo.prenoms } |
                        Mail : {userInfo.mail} |
                        Unité : {userInfo.appelation} | Fonction : {userInfo.roles} | Rang : {userInfo.rang} |
                        © Glo Flavien </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </nav>
              </div>
            </div>
          </div>
        </React.Fragment>
      );
  }
  else return <><div>chargement spinner </div></>
}

export default Produit;

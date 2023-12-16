import React from 'react';
import {/* useNavigate,*/ NavLink } from 'react-router-dom';
import AuthHooks from './hooks/AuthHooks';
import background from "./../background.jpg";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";


const Voiture = () => {
const { userInfo } = AuthHooks();
  React.useEffect(() => {
    console.log("redirection voiture")
  }, []);
  
  if(userInfo.nom && userInfo.mail){
    if(userInfo.idUnite === 1 || userInfo.idUnite === 2){
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
        
                    <form  className="box is-2"  style={{
                      backgroundColor: 'blue',
                      opacity: 0.8
                    }}>
                      <p className="has-text-centered">
                        <NavLink  to={"/demandeUtilisationVoiture"} className="title is-6" style={{
                          color: "black",
                          background: 'white',
                          opacity: 0.8
                        }}>
                            |DEMANDE UTILISATTION VOITURE|
                        </NavLink>
                        ...
                        <NavLink  to={"/demandeEntretien"} className="title is-6" style={{
                          color: "black",
                          background: 'white',
                          opacity: 0.8
                        }}>
                            |DEMANDE ENTRETIEN|
                        </NavLink>
                      </p>
                    </form>
      
                    <form  className="box"  style={{
                      backgroundColor: 'yellow',
                      opacity: 0.8
                    }}>
                      <p className="has-text-centered">
                        <NavLink  to={"/listVoiture"} className="title is-6" style={{
                          color: "black",
                          background: 'white',
                          opacity: 0.8
                        }}>
                            |LISTE VOITURE|
                        </NavLink>
                        ...
                        <NavLink  to={"/deplacement"} className="title is-6" style={{
                          color: "black",
                          background: 'white',
                          opacity: 0.8
                        }}>
                            |DEPLACEMENT|
                        </NavLink>
                      </p>
                    </form>
      
                    <form  className="box"  style={{
                      backgroundColor: 'green',
                      opacity: 0.8
                    }}>
                    <p className="has-text-centered">
                      <NavLink  to={"/marque"} className="title is-6" style={{
                          color: "black",
                          background: 'white',
                          opacity: 0.8
                      }}>
                          |MARQUE|
                      </NavLink>
                      
                      <NavLink  to={"/modele"} className="title is-6" style={{
                          color: "black",
                          background: 'white',
                          opacity: 0.8
                      }}>
                          |MODELE|
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
                      </p>
                      <p>© Glo Flavien </p>
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
    }else{
      return(
        <div> non admin ni log</div>
      )
    }
  }
  else return <><div>chargement spinner </div></>
}

export default Voiture;

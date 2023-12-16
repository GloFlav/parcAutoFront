import React from 'react';
import {/* useNavigate,*/ NavLink } from 'react-router-dom';
import AuthHooks from '../hooks/AuthHooks';
import {IoPricetag, IoCar, IoPerson } from "react-icons/io5";
import logo from "../../onn.PNG";
import background from "../../background.jpg";
import Navbar from "../Navbar";

const HomePage = () => {
const { userInfo } = AuthHooks();
  React.useEffect(() => {
    console.log("build Homepage ")
  }, []);
  
  if(userInfo.nom && userInfo.mail){
    return (
      <React.Fragment>
        <div className="columns mt-6">
          <Navbar />
          <section  className="hero is-fullheight is-fullwidth" style={{ 
            backgroundImage: `url(${background})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            width: '100vw',
            height: '100vh'
          }}>
            <div className="hero-body is-centered">
              <div className="container is-centered">
                <div className="columns is-centered">
                  <div id="navbarBasicExample" className="navbar-menu is-centered">
                    <div className="column is-4 is-fullwidth">
                      <form  className="box"  style={{
                        backgroundColor: 'blue',
                        opacity: 0.8
                      }}>
                        <NavLink  to={"/produit"} className="title is-4" style={{
                          color: "black"
                        }}>
                          <p className="has-text-centered">
                            <IoPricetag />
                            PRODUIT & STOCK 
                          </p>
                        </NavLink>
                      </form>
                    </div>

                    <div className="column is-4 is-fullwidth">
                      <form  className="box"  style={{
                        backgroundColor: 'green',
                        opacity: 0.8
                      }}>
                        <NavLink  to={"/voiture"} className="title is-4" style={{
                          color: "black"
                        }}>
                          <p className="has-text-centered">
                            <IoCar /> PARC AUTOMOBILE
                          </p>
                        </NavLink>
                      </form>
                    </div>

                    <div className="column is-4 is-fullwidth">
                      <form  className="box"  style={{
                        backgroundColor: 'yellow',
                        opacity: 0.8
                      }}>
                        <NavLink  to={"/profil"} className="title is-4" style={{
                          color: "black"
                        }}>
                          <p className="has-text-centered">
                            <IoPerson /> PROFIL
                          </p>
                        </NavLink>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
              <div className="container">
                <div className="navbar-end">
                  <div id="navbarBasicExample" className="navbar-menu " >
                    <div className="column is-3 is-fullwidth" >
                      <form   className="box"   style={{ 
                        // backgroundImage: `url(${logo})`,
                        backgroundPosition: 'center',
                        opacity: 0.4,
                        backgroundSize: 'cover',
                      }}>
                        <div className="field"  style={{
                          // opacity: 0.7,
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          <label className="label" style={{color: "black"}}>
                              <p>
                              Employé : { userInfo.nom } { userInfo.prenoms } <br/>
                              Mail : {userInfo.mail} <br/>
                              Unité : {userInfo.appelation} <br/>
                              Fonction : {userInfo.roles} <br/>
                              Rang : {userInfo.rang}
                            </p>
                          </label>
                          
                          <div className="field mt-3">
                            <img src={logo} alt="logo" />
                          </div>
                        </div>
                      </form>
                    </div>
                </div>
              </div>
            </div>
            <div className="container">
              <div className="navbar-end">
                
              </div>
            </div>
          </section>
        </div >
      </React.Fragment>
    );
  }
  else return <><div>chargement spinner </div></>
}

export default HomePage;

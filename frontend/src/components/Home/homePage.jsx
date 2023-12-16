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
        <Navbar />

        <div>
          <section  className="hero is-fullwidth" style={{ 
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
              <NavLink  to={"/produit"} className="title is-6" style={{
                color: "black"
              }}>
                <p className="has-text-centered">
                  <IoPricetag />
                  PRODUIT & STOCK 
                </p>
              </NavLink>
            </form>

            <form  className="box"  style={{
              backgroundColor: 'yellow',
              opacity: 0.8
            }}>
              <NavLink  to={"/voiture"} className="title is-6" style={{
                color: "black"
              }}>
                <p className="has-text-centered">
                  <IoCar /> PARC AUTOMOBILE
                </p>
              </NavLink>
            </form>

            <form  className="box"  style={{
              backgroundColor: 'green',
              opacity: 0.8
            }}>
              <NavLink  to={"/profil"} className="title is-6" style={{
                color: "black"
              }}>
                <p className="has-text-centered">
                  <IoPerson /> PROFIL
                </p>
              </NavLink>
            </form>
            <form className="columns is-centered " style={{ 
              // backgroundImage: `url(${logo})`,
              backgroundPosition: 'center',
              backgroundColor: 'white',
              opacity: 0.5,
              backgroundSize: 'cover',
              padding: '1rem',
              position: 'fixed',
              bottom: 0,
              left: 0,
              width: '100%'
            }}>
              <div className="title is-6"  style={{
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <label className="label" style={{color: "black"}}>
                <p className="has-text-centered">
                    Employé : { userInfo.nom } { userInfo.prenoms } <br/>
                    Mail : {userInfo.mail} <br/>
                    Unité : {userInfo.appelation}, Fonction : {userInfo.roles} , Rang : {userInfo.rang}
                  </p>
                </label>
              </div>
            </form>
            </div>
          </section>
        </div >
      </React.Fragment>
    );
  }
  else return <><div>chargement spinner </div></>
}

export default HomePage;

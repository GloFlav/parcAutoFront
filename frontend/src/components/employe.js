import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Button from "react-bootstrap/Button";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import background from "../background.jpg";

export default function Employe() {

  // TAKE TOKEN EMPLOYÉ INFO
  const u_info = {
    u_token: localStorage.token,
    u_nom: localStorage.nom,
    u_prenomS: localStorage.prenoms,
    u_attribut: localStorage.idFonction,
    u_photoPDP: localStorage.photoIdentite,
    u_numCompte: localStorage.matricule,
    u_etatCompte: localStorage.etatCompte,
  };

  const handleShowEdit = () => setShowEdit(true);
  const [setShowEdit] = useState(false);
  const [setInputs] = useState([]);
  const [users, setUsers] = useState([]);
  const userToken = localStorage.getItem("token");

  useEffect(() => {
    getUsers();
  }, []);

  function getUsers() {
    axios
      .get("http://localhost:5000/api/employe/employes")
      .then(function (response) {
        setUsers(response.data);
      });
  }

  function getOneUsers(id) {
    axios
      .get(`http://localhost:5000/api/utilisateur/${id}`)
      .then(function (response) {
        handleShowEdit();
        setInputs(response.data[0]);
      });
  }

  const [contenuTab, setContenuTab] = useState(true);
  function rechercheUtilisateur(event) {
    const valeur = event.target.value;
    if (!valeur) {
      getUsers();
      setContenuTab(true);
    } else {
      axios
        .get(`http://localhost:5000/api/employe/recherche/${valeur}`)
        .then((response) => {
          if (response.data.success) {
            setUsers(response.data.res);
            setContenuTab(true);
          } else {
            setUsers(response.data.res);
            setContenuTab(false);
          }
        });
    }
  } /** HORS SERVICE POUR L'INSTANT */

  const deleteUser = (id) => {
    axios
      .put(`http://localhost:5000/api/utilisateur/${id}`)
      .then(function (response) {
        getUsers();
        toast.success(`Suppr Reussi`);
      });
  };

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
          backgroundRepeat: 'no-repeat'
        }}>
        <div style={{ background: 'white', opacity: 0.8 }}>          
          <div>
            <div  className="navbar-end">
              <h2>
                <div className="column is-2">
                  <span> </span> <span> </span>
                </div>
                <p >Personnel RH :  { userToken ? ( <>{ u_info.u_nom } </> ) : ( <> Veuillez vous connecter </>)}</p>
                  Liste des Employé
                  <span> </span> <span> </span>
                  <label>
                  <input
                      type="text"
                      name="values"
                      className="form-control form-control-sm"
                      onChange={rechercheUtilisateur}
                      placeholder="rechercher un produit ...."
                    />
                  </label>
                </h2>
              </div>
            </div>
                {/*  ----- TABLEAU LISTE DES PRODUITS ----- */}
                <div className="table-responsive text-nowrap"style={{ 
                  opacity : 0.9
                }} >
                <table className='table is-striped is-fullwidth' >
                  <thead>
                    <tr>
                      <th scope="col">Matricule</th>
                      <th scope="col">Nom complet </th>
                      <th scope="col">Mail </th>
                      <th scope="col">Fonction </th>
                      <th scope="col">etat Compte</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {contenuTab ? (
                      users.map((user, key) => (
                        <tr key={key}>
                          <th scope="row">{user.matricule} </th>
                          <td>{user.nom}  {user.prenoms}</td>
                          <td>{user.mail}</td>
                          <td>{user.idFonction}</td>
                          <td>{user.etatCompte}</td>
                          <td className="mr-4">
                            <button
                              type="button"
                              className="btn btn-outline-primary btn-sm m-0 waves-effect"
                              variant="primary"
                              onClick={() => getOneUsers(user.numCompte)}
                            >
                              <i
                                className="fas fa-edit mr-2 grey-text"
                                aria-hidden="true"
                              ></i>
                              EDIT
                            </button>
                            <span> </span>
                            <Button
                              className="btn btn-sm btn-danger"
                              onClick={() => deleteUser(user.numCompte)}
                            >
                              delete
                            </Button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td> La liste est vide .... </td>
                      </tr>
                    )}
                  </tbody>
                </table>
            <div className="navbar-end">
            <span> </span>
            <label>
              <Button
                className="btn btn-sm btn-primary"
                variant="primary"
                onClick={() => {window.location.pathname="/nouvelEmploye"}}
              >
                Ajout Nouveau Produit
              </Button>
            </label>
            </div>
          </div>
        </div>
        </div>
      </div>
    </React.Fragment>
  );
}

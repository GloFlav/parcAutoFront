import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import background from "../background.jpg";
import ReactPaginate from 'react-paginate';

export default function Stock() {

  // TAKE TOKEN EMPLOYÉ INFO
  const u_info = {
    u_token: localStorage.token,
    u_nom: localStorage.nom,
    u_prenoms: localStorage.prenoms,
    u_attribut: localStorage.idFonction,
    u_photoPDP: localStorage.photoIdentite,
    u_numCompte: localStorage.matricule,
    u_etatCompte: localStorage.etatCompte,
  };

  const handleShowEdit = () => setShowEdit(true);
  const [setShowEdit] = useState(false);
  const [ setInputs] = useState([]);
  const [products, setProducts] = useState([]);
  const userToken = localStorage.getItem("token");

  useEffect(() => {
    getProducts();
  }, []);

  function getProducts() {
    axios
      .get("http://localhost:5000/api/stock/produits")
      .then(function (response) {
        setProducts(response.data);
      });
  }

  function getOneProducts(id) {
    axios
      .get(`http://localhost:5000/api/stock/produit/${id}`)
      .then(function (response) {
        handleShowEdit();
        setInputs(response.data[0]);
      });
  }

  const [contenuTab, setContenuTab] = useState(true);
  function rechercheProduit(event) {
    const valeur = event.target.value;
    if (!valeur) {
      getProducts();
      setContenuTab(true);
    } else {
      axios
        .get(`http://localhost:5000/api/stock/recherche/${valeur}`)
        .then((response) => {
          if (response.data.success) {
            setProducts(response.data.res);
            setContenuTab(true);
          } else {
            setProducts(response.data.res);
            setContenuTab(false);
          }
        });
    }
  }

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
                  Liste des Produits
                  <span> </span> <span> </span>
                  <label>
                  <input
                      type="text"
                      name="values"
                      className="form-control form-control-sm"
                      onChange={rechercheProduit}
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
                      <th scope="col">Code Immatricule</th>
                      <th scope="col">Designation</th>
                      <th scope="col">Quantité Disponible </th>
                      <th scope="col">Quantité Seuille </th>
                      <th scope="col">Activité</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {contenuTab ? (
                      products.map((product, key) => (
                        <tr key={key}>
                          <th scope="row">{product.codeImmatricule} </th>
                          <td>{product.nomProduit} </td>
                          <td>{product.quantiteActuelle}  {product.unite}</td>
                          <td>{product.quantiteSeuille}  {product.unite}</td>
                          <td className="mr-4">
                          <button
                              type="button"
                              className="btn btn-outline-primary btn-sm m-0 waves-effect"
                              variant="primary"
                              onClick={() => getOneProducts(product.codeImmatricule)}
                            >
                              <i
                                className="fas fa-edit mr-2 grey-text"
                                aria-hidden="true"
                              ></i>
                              BDE
                            </button>
                            <span> </span>
                            <Button
                              className="btn btn-sm btn-danger"
                              onClick={() => getOneProducts(product.codeImmatricule)}
                            >
                              BDS
                            </Button>
                          </td><td className="mr-4">
                            <button
                              type="button"
                              className="btn btn-outline-primary btn-sm m-0 waves-effect"
                              variant="primary"
                              onClick={() => getOneProducts(product.codeImmatricule)}
                            >
                              <i
                                className="fas fa-edit mr-2 grey-text is-centered"
                                aria-hidden="true"
                              ></i>
                              MODIFIER
                            </button>
                            <span> </span>
                            <Button
                              className="btn btn-sm btn-danger"
                              // onClick={() => deleteUser(user.numCompte)}
                            >
                              SUPPRIMER
                            </Button>
                          </td> 
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td></td>
                        <td></td>
                        <td> La liste est vide .... </td>
                        <td></td>
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
                onClick={() => {window.location.pathname="/nouveauProduit"}}
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

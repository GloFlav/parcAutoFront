import React from 'react';
import { useNavigate, /*Navigate, NavLink*/ } from 'react-router-dom';
import AuthHooks from './hooks/AuthHooks';
import { IoAddCircle,  IoCheckmarkCircleSharp, IoDocumentTextSharp, IoEye, IoPricetag  } from "react-icons/io5";
import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import { toast } from "react-toastify";
import background from "./../background.jpg";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import Button from "react-bootstrap/Button";
// import ModalAddMemorandum from "./ModalAddMemorandum";
import ModalAddVoiture from "./ModalAddVoiture";
// import ModalAddProduitDemande from "./ModalAddProduitDemande";
import ModalEdition from "./ModalEdit";
import Voiture from './voiture';

const ListVoiture = () => {
const { userInfo } = AuthHooks();
  React.useEffect(() => {
    console.log("redirection Voiture")
  }, []);

  const [voiture, setVoiture] = useState([]);
  const [voitures, setVoitures] = useState([]);

  const navigate = useNavigate();
  const id = userInfo.matricule;
  useEffect(() => {
    getVoiture();
    getVoitures();
    getDV();
  }, []);

  const [contenuTab , setContenuTab] = useState(true);

  

  /** -----------API ---------------- */

  function getVoitures() {
    axios
      .get(`http://localhost:5000/api/float/voitures`)
      .then(function (response) {
        setVoitures(response.data);
      });
  }

  function getVoiture() {
    axios
      .get(`http://localhost:5000/api/float/voiture/${id}`)
      .then(function (response) {
        setVoitures(response.data);
      });
  }

  function getDV() {
    axios
      .get(`http://localhost:5000/api/float/dv/${id}`)
      .then(function (response) {
        setVoiture(response.data);
      });
  }

  // function validerChefMemo(id) {
  //   axios
  //     .put(`http://localhost:5000/api/stock/validerchef/${id}`)
  //     .then(function (response) {
  //       toast.success("validé");
  //       navigate("/listVoiture");
  //       getCurrentMemo();
  //     });
  // }

  // function validerDemandeVoiture(id) {
  //   axios
  //     .put(`http://localhost:5000/api/float/validerdv/${id}`)
  //     .then(function (response) {
  //       toast.success("validé");
  //       navigate("/listVoiture");
  //       getCurrentMemo();
  //     });
  // }

  /**MODAL AJOUT VOITURE */
  const [show, setShowM] = useState(false);
  const showAddModal = () => setShowM(true);
  const closeAddModal = () => {
    getVoiture();
    setShowM(false);
  };

  /**MODAL AJOUT PRODUIT DEMANDÉ */
  // const [numCompteEdit, setNumCompteEdit] = useState("");
  // const [showEdit, setShowEdit] = useState(false);
  // const showEditModal = (numCompte) => {
  //   setNumCompteEdit(numCompte);
  //   setShowEdit(true);
  // };
  // const closeEditModal = () => {
  //   getCurrentMemo();
  //   setShowEdit(false);
  // };

  
  /** ---------PAGINATION----------- */
  const [currentPage, setcurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const [pageNumberLimit, setPageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setminPageNumberLimit] = useState(0);

  const handleClick = (event) => {
    setcurrentPage(Number(event.target.id));
  };

  function retourALaPremierPage() {
    setcurrentPage(1);
    if (currentPage > 5) {
      setmaxPageNumberLimit(5);
      setminPageNumberLimit(0);
    }
  }

  const pages = [];
  const nbrPage  =(Math.ceil(voitures.length / itemsPerPage))
  for (let i = 1; i <= nbrPage; i++) {
    pages.push(i);
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = voitures.slice(indexOfFirstItem, indexOfLastItem);

  const renderPageNumbers = pages.map((number) => {
    if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
      return ( 
            <li
              key={number}
              id={number}
              onClick={handleClick}
              className={currentPage === number ? "active" : null}
            >
              {number}
            </li>
      );
    } else {
      return null;
    }
  });

  const handleNextbtn = () => {
    setcurrentPage(currentPage + 1);
    if (currentPage + 1 > maxPageNumberLimit) {
      setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };

  const handlePrevbtn = () => {
    setcurrentPage(currentPage - 1);
    if (currentPage - 2 < minPageNumberLimit) {
      setmaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };


  if(userInfo.nom && userInfo.mail){//à modifier si l'on a  le temps
      return (
        <React.Fragment>
{/*           

        <ModalEdition showEdit={showEdit} onHide={closeEditModal}>
          {numCompteEdit}
        </ModalEdition> */}

        
        {/* MODAL AJOUT VOITURE */}
        <ModalAddVoiture show={show} onHide={closeAddModal} />
        {/* MODAL AJOUT*/}      <div className="columns mt-6">
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
                          
                          <button
                            type="button"
                            onClick={showAddModal}
                            className="button is-info is-active"
                          >
                            <IoDocumentTextSharp /> Nouvelle Voiture
                          </button>
                          Liste des Voitures
                          
                          <span> </span> <span> </span>
                        <label>
                        </label>
                      </h2>
                    </div>
                  </div>
                    <div className="table-responsive text-nowrap"style={{ 
                      opacity : 0.9
                    }} >
                      <table className='table is-striped is-fullwidth' >
                          <thead>
                            <tr>
                              <th scope="col">Immatriculation</th>
                              <th scope="col">Modele</th>
                              <th scope="col">Couleur</th>
                              <th scope="col">Kilometrage</th>
                              <th scope="col">Status</th>
                              <th scope="col">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {contenuTab ? (
                              currentItems.map((voiture, key) => (
                                <tr key={key}>
                                  <th scope="row">{voiture.immatricule} </th>
                                    <td>{voiture.nomModele}</td>
                                    <td>{voiture.couleur}</td>
                                    <td>{voiture.kilometrage}</td>
                                    <td>{voiture.status}</td>
                                    <td className="mr-4">
                                      <button
                                          type="button"
                                          className="btn btn-outline-primary btn-sm m-0 waves-effect"
                                          variant="primary"
                                          // onClick={() => showEditModal(voiture.immatricule)}
                                        >
                                          <IoAddCircle/><IoPricetag/>
                                      </button>
                                      <button
                                        type="button"
                                        className="btn btn-outline-primary btn-sm m-0 waves-effect"
                                        variant="primary"
                                        // onClick={() => getOneProducts(product.codeImmatricule)}
                                      ><IoEye /> </button>
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
                         {/* RENDU HTML DU PAGINATION  */}
                        {nbrPage !== 1 ? <><ul className="pageNumbers">
                          <li>
                            <button  class="button is-primary"
                              disabled={currentPage === pages[0] ? true : false}
                              onClick={handlePrevbtn}
                            >
                              Précédent
                            </button>
                          {renderPageNumbers}
                            <button  class="button is-primary"
                              disabled={
                                currentPage === pages[pages.length - 1] ? true : false
                              }
                              onClick={handleNextbtn}
                            >
                              Suivant
                            </button>
                          </li>
                        </ul> <br /></> : null }
                          {/* RENDU HTML DU PAGINATION  */}
                      <div className="navbar-end">
                    </div>
                  </div>
                <Footer/>
              </div>
            </div>
          </div>
        </React.Fragment>
      );
  }else return <><div>chargement spinner </div></>
}

export default ListVoiture;

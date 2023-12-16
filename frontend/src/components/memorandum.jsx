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
import ModalAddMemorandum from "./ModalAddMemorandum";
import ModalAddProduitDemande from "./ModalAddProduitDemande";
import ModalEdition from "./ModalEdit";

const Produit = () => {
const { userInfo } = AuthHooks();
  React.useEffect(() => {
    console.log("redirection produit")
  }, []);

  const [currentmemos, setCurrentMemos] = useState([]);
  const [memo, setMemo] = useState([]);
  const [memos, setMemos] = useState([]);

  const navigate = useNavigate();
  const id = userInfo.matricule;
  useEffect(() => {
    getMemoEmploye();
    getCurrentMemo();
    getMemoUnite();
  }, []);

  const [contenuTab , setContenuTab] = useState(true);

  

  /** -----------API ---------------- */

  function getCurrentMemo() {
    axios
      .get(`http://localhost:5000/api/stock/currentmemos`)
      .then(function (response) {
        setCurrentMemos(response.data);
      });
  }

  function getMemoEmploye() {
    axios
      .get(`http://localhost:5000/api/stock/memoemploye/${id}`)
      .then(function (response) {
        setMemos(response.data);
      });
  }

  function getMemoUnite() {
    axios
      .get(`http://localhost:5000/api/stock/memounite/${id}`)
      .then(function (response) {
        setMemo(response.data);
      });
  }

  function validerChefMemo(id) {
    axios
      .put(`http://localhost:5000/api/stock/validerchef/${id}`)
      .then(function (response) {
        toast.success("validé");
        navigate("/memorandum");
        getCurrentMemo();
      });
  }

  function validerLogMemo(id) {
    axios
      .put(`http://localhost:5000/api/stock/validerlog/${id}`)
      .then(function (response) {
        toast.success("validé");
        navigate("/memorandum");
        getCurrentMemo();
      });
  }

  /**MODAL AJOUT MEMORANDUM */
  const [show, setShowM] = useState(false);
  const showAddModal = () => setShowM(true);
  const closeAddModal = () => {
    getCurrentMemo();
    setShowM(false);
  };

  /**MODAL AJOUT PRODUIT DEMANDÉ */
  const [numCompteEdit, setNumCompteEdit] = useState("");
  const [showEdit, setShowEdit] = useState(false);
  const showEditModal = (numCompte) => {
    setNumCompteEdit(numCompte);
    setShowEdit(true);
  };
  const closeEditModal = () => {
    getCurrentMemo();
    setShowEdit(false);
  };

  
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
  const nbrPage  =(Math.ceil(currentmemos.length / itemsPerPage))
  for (let i = 1; i <= nbrPage; i++) {
    pages.push(i);
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = currentmemos.slice(indexOfFirstItem, indexOfLastItem);

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


  if(userInfo.nom && userInfo.mail){
    if(userInfo.idUnite === 1 ){//on montrera ici toutes les fonctions sauf ajout
      return (
        <React.Fragment>
          

        <ModalEdition showEdit={showEdit} onHide={closeEditModal}>
          {numCompteEdit}
        </ModalEdition>

        
        {/* MODAL AJOUT MEMO */}
        <ModalAddMemorandum show={show} onHide={closeAddModal} />
        {/* MODAL AJOUT*/}      <div className="columns mt-6">
                <div className="column is-2">
                  <Sidebar />
                </div>
                {/* <ModalAddMemorandum show={show} onHide={closeAddMemorandum}>
                  Ajout Nouveau Memorandum
                </ModalAddMemorandum> */}
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
                            <IoDocumentTextSharp /> Rediger Memorandum
                          </button>
                          Liste des Memorandums
                          
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
                              <th scope="col">No Memo</th>
                              <th scope="col">Objet</th>
                              <th scope="col">Date d'envoie</th>
                              <th scope="col">Date de Reception</th>
                              <th scope="col">Validation Chef</th>
                              <th scope="col">Validation Log</th>
                              <th scope="col">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {contenuTab ? (
                              currentItems.map((memo, key) => (
                                <tr key={key}>
                                  <th scope="row">{memo.numeroMemorandum} </th>
                                    <td>{memo.objet}</td>
                                    <td>{moment(memo.dateEnvoie).format('DD/MM/YYYY HH:mm', )} </td>
                                    <td>{moment(memo.dateReception).format('DD/MM/YYYY HH:mm', )}</td>
                                    <td>{memo.validationChef} 
                                      <button
                                        type="button"
                                        className="btn btn-outline-primary btn-sm m-0 waves-effect"
                                        variant="primary"
                                        onClick={() => validerChefMemo(memo.numeroMemorandum)}
                                      >
                                        <IoCheckmarkCircleSharp />
                                      </button>
                                    </td>
                                    <td>{memo.validationLog}  
                                      <button
                                        type="button"
                                        className="btn btn-outline-primary btn-sm m-0 waves-effect"
                                        variant="primary"
                                        onClick={() => validerLogMemo(memo.numeroMemorandum)}
                                      >
                                        <IoCheckmarkCircleSharp />
                                      </button>
                                    </td>
                                    <td className="mr-4">
                                      <button
                                          type="button"
                                          className="btn btn-outline-primary btn-sm m-0 waves-effect"
                                          variant="primary"
                                          onClick={() => showEditModal(memo.numeroMemorandum)}
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
    }else if(userInfo.idUnite === 2 && userInfo.rang === 1){//on trouvera ici ce que le chef log peut faire
      return (
        <React.Fragment>
          
          {/* MODAL AJOUT */}
          <ModalAddMemorandum show={show} onHide={closeAddModal} />
          {/* MODAL AJOUT*/}
        
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
                        <button
                            type="button"
                            onClick={showAddModal}
                            className="button is-info is-active"
                          >
                            <IoDocumentTextSharp /> Rediger Memorandum
                          </button>

                      Liste des Memorandums<button
                        type="button"
                        onClick={showAddModal}
                        className="btn btn-primary mt-2 mt-sm-0 btn-icon-text"
                      >
                        <i className="mdi mdi-plus-circle"></i> Rediger memorandum
                      </button>
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
                        <th scope="col">Numero Memorandum</th>
                        <th scope="col">Objet</th>
                        <th scope="col">Date d'envoie</th>
                        <th scope="col">Date de Reception</th>
                        <th scope="col">Validation Chef</th>
                        <th scope="col">Validation Log</th>
                        <th scope="col">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {contenuTab ? (
                        currentmemos.map((memo, key) => (
                          <tr key={key}>
                            <th scope="row">{memo.numeroMemorandum} </th>
                              <td>{memo.objet}</td>
                              <td>{moment(memo.dateEnvoie).format('DD/MM/YYYY HH:mm', )} </td>
                              <td>{moment(memo.dateReception).format('DD/MM/YYYY HH:mm', )}</td>
                              <td>{memo.validationChef}</td>
                              <td>{memo.validationLog}  
                                <button
                                  type="button"
                                  className="btn btn-outline-primary btn-sm m-0 waves-effect"
                                  variant="primary"
                                  onClick={() => validerLogMemo(memo.numeroMemorandum)}
                                >
                                <IoCheckmarkCircleSharp />
                                </button>
                              </td>
                              <td className="mr-4">
                                <button
                                    type="button"
                                    className="btn btn-outline-primary btn-sm m-0 waves-effect"
                                    variant="primary"
                                    // onClick={() => getOneProducts(product.codeImmatricule)}
                                  ><IoAddCircle/>
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
                  </div>
                <Footer/>
              </div>
            </div>
          </div>
        </React.Fragment>
      );
    }else if(userInfo.rang === 1){
      return (
        <React.Fragment>
                    
          {/* MODAL AJOUT */}
          <ModalAddMemorandum show={show} onHide={closeAddModal} />
          {/* MODAL AJOUT*/}

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
                          
                          <button
                            type="button"
                            onClick={showAddModal}
                            className="button is-info is-active"
                          >
                            <IoDocumentTextSharp /> Rediger Memorandum
                          </button>
                        Liste des Memorandums
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
                        <th scope="col">No Memo</th>
                        <th scope="col">Objet</th>
                        <th scope="col">Date d'envoie</th>
                        <th scope="col">Date de Reception</th>
                        <th scope="col">Validation Chef</th>
                        <th scope="col">Validation Log</th>
                        <th scope="col">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {contenuTab ? (
                        memos.map((memo, key) => (
                          <tr key={key}>
                            <th scope="row">{memo.numeroMemorandum} </th>
                              <td>{memo.objet}</td>
                              <td>{moment(memo.dateEnvoie).format('DD/MM/YYYY HH:mm', )} </td>
                              <td>{moment(memo.dateReception).format('DD/MM/YYYY HH:mm', )}</td>
                              <td>{memo.validationChef} 
                                <button
                                  type="button"
                                  className="btn btn-outline-primary btn-sm m-0 waves-effect"
                                  variant="primary"
                                  onClick={() => validerChefMemo(memo.numeroMemorandum)}
                                >
                                  <IoCheckmarkCircleSharp />
                                </button>
                              </td>
                              <td>{memo.validationLog} </td>
                              <td className="mr-4">
                                <button
                                  type="button"
                                  className="btn btn-outline-primary btn-sm m-0 waves-effect"
                                  variant="primary"
                                  // onClick={() => getOneProducts(product.codeImmatricule)}
                                ><IoAddCircle/>
                                </button>
                                <button
                                  type="button"
                                  className="btn btn-outline-primary btn-sm m-0 waves-effect"
                                  variant="primary"
                                  // onClick={() => getOneProducts(product.codeImmatricule)}
                                >
                                  <IoEye />
                                </button>
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
                  </div>
                <Footer/>
              </div>
            </div>
          </div>
        </React.Fragment>
      );
    }else {
      return (
        <React.Fragment>
                    
        {/* MODAL AJOUT */}
        <ModalAddMemorandum show={show} onHide={closeAddModal} />
        {/* MODAL AJOUT*/}

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
                          
                          <button
                            type="button"
                            onClick={showAddModal}
                            className="button is-info is-active"
                          >
                            <IoDocumentTextSharp /> Rediger Memorandum
                          </button>
                        Liste des Memorandums
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
                        <th scope="col">NoMemo</th>
                        <th scope="col">Objet</th>
                        <th scope="col">Date d'envoie</th>
                        <th scope="col">Date de Reception</th>
                        <th scope="col">Validation Chef</th>
                        <th scope="col">Validation Log</th>
                        <th scope="col">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {contenuTab ? (
                        memo.map((memo, key) => (
                          <tr key={key}>
                            <th scope="row">{memo.numeroMemorandum} </th>
                              <td>{memo.objet}</td>
                              <td>{moment(memo.dateEnvoie).format('DD/MM/YYYY HH:mm', )} </td>
                              <td>{moment(memo.dateReception).format('DD/MM/YYYY HH:mm', )}</td>
                              <td>{memo.validationChef}</td>
                              <td>{memo.validationLog}</td>
                              <td className="mr-4">
                                <button
                                  type="button"
                                  className="btn btn-outline-primary btn-sm m-0 waves-effect"
                                  variant="primary"
                                  // onClick={() => getOneProducts(product.codeImmatricule)}
                                ><IoAddCircle/><IoPricetag/>
                                </button>
                                <button
                                  type="button"
                                  className="btn btn-outline-primary btn-sm m-0 waves-effect"
                                  variant="primary"
                                  // onClick={() => getOneProducts(product.codeImmatricule)}
                                >
                                  <IoEye />
                                </button>
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
                  </div>
                <Footer/>
              </div>
            </div>
          </div>
        </React.Fragment>
      );
    }
  }else return <><div>chargement spinner </div></>
}

export default Produit;

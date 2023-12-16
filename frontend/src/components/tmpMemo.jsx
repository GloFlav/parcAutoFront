import React from 'react';
import { useNavigate, /*Navigate, NavLink*/ } from 'react-router-dom';
import AuthHooks from './hooks/AuthHooks';
import { IoAddCircle,  IoCheckmarkCircleSharp, IoDocumentTextSharp, IoEye  } from "react-icons/io5";
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
const Produit = () => {
const { userInfo } = AuthHooks();
  React.useEffect(() => {
    console.log("redirection produit")
  }, []);

  const [show, setShow] = useState(false);
  const showAddMemorandum = () => setShow(true);
  const [currentmemos, setCurrentMemos] = useState([]);
  const [memo, setMemo] = useState([]);
  const [memos, setMemos] = useState([]);

  const closeAddMemorandum = () => {
    getMemoEmploye();
    setShow(false);
  };
  const navigate = useNavigate();
  const id = userInfo.matricule;
  useEffect(() => {
    getMemoEmploye();
    getCurrentMemo();
    getMemoUnite();
  }, []);

  const [contenuTab , setContenuTab] = useState(true);

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

  function addMemorandum() {
    navigate("/addMemorandum")
  }

  function validerChefMemo(id) {
    axios
      .put(`http://localhost:5000/api/stock/validerchef/${id}`)
      .then(function (response) {
        toast.success("validé");
        navigate("/memorandum");
        getMemoEmploye();
      });
  }

  function validerLogMemo(id) {
    axios
      .put(`http://localhost:5000/api/stock/validerlog/${id}`)
      .then(function (response) {
        toast.success("validé");
        navigate("/memorandum");
        getMemoEmploye();
      });
  }

  if(userInfo.nom && userInfo.mail){
    if(userInfo.idUnite === 1 ){//on montrera ici toutes les fonctions
      return (
        <React.Fragment>
              <div className="columns mt-6">
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
                          
                          {/* <Button
                            type="button"
                            className="button is-warning"
                            variant="primary"
                            onClick={showAddMemorandum()}
                          >
                            <IoDocumentTextSharp /> Nouveau Memorandum
                          </Button> */}
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
                              currentmemos.map((memo, key) => (
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
                      <div className="navbar-end">
                    </div>
                  </div>
                <Footer/>
              </div>
            </div>
          </div>
        </React.Fragment>
      );
    }else if(userInfo.idUnite === 2 && userInfo.rang === 1){
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
    }
  }else return <><div>chargement spinner </div></>
}

export default Produit;

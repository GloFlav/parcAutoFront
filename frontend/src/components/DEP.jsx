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
import ModalAddDEP from "./ModalAddDEP";

const DEP = () => {
const { userInfo } = AuthHooks();
  React.useEffect(() => {
    console.log("redirection produit")
  }, []);

  const [show, setShow] = useState(false);
  const showAddDEP = () => setShow(true);
  const [deps, setDeps] = useState([]);
  const [dep, setDep] = useState([]);

  const closeAddDEP = () => {
    getDEP();
    setShow(false);
  };
  const navigate = useNavigate();
  const id = userInfo.matricule;
  useEffect(() => {
    getDEPs();
    getDEP()
    // getdepEmploye();
  }, []);

  const [contenuTab , setContenuTab] = useState(true);

  function getDEPs() {
    axios
      .get(`http://localhost:5000/api/stock/deps`)
      .then(function (response) {
        setDeps(response.data);
      });
  }

  function getDEP() {
    axios
      .get(`http://localhost:5000/api/stock/dep/${id}`)
      .then(function (response) {
        setDep(response.data);
      });
  }

  function validerDEP(id) {
    axios
      .put(`http://localhost:5000/api/stock/validerdep/${id}`)
      .then(function (response) {
        toast.success("validé");
        navigate("/DEP");
        getDEPs();
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
                <ModalAddDEP show={show} onHide={closeAddDEP}>
                  Ajout Nouveau DEP
                </ModalAddDEP>
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
                            onClick={showAddDEP()}
                          >
                            <IoDocumentTextSharp /> Nouveau DEP
                          </Button> */}
                          Liste des DEPs
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
                              <th scope="col">No DEP</th>
                              <th scope="col">Motif</th>
                              <th scope="col">Date demande</th>
                              <th scope="col">Demandeur</th>
                              <th scope="col">Validation</th>
                              <th scope="col">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {contenuTab ? (
                              deps.map((dep, key) => (
                                <tr key={key}>
                                  <th scope="row">{dep.numeroDEP} </th>
                                    <td>{dep.motif}</td>
                                    <td>{moment(dep.dateDemande).format('DD/MM/YYYY HH:mm', )} </td>
                                    <td>
                                      {dep.matricule}
                                      <button
                                        type="button"
                                        className="btn btn-outline-primary btn-sm m-0 waves-effect"
                                        variant="primary"
                                        // onClick={() => getOneProducts(product.codeImmatricule)}
                                      ><IoAddCircle/>
                                      </button>
                                    </td>
                                    <td>{dep.validation} 
                                      <button
                                        type="button"
                                        className="btn btn-outline-primary btn-sm m-0 waves-effect"
                                        variant="primary"
                                        onClick={() => validerDEP(dep.numeroDEP)}
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
    }else if(userInfo.idUnite === 2 && (userInfo.rang === 1 ||userInfo.rang ===2)){
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
                      Liste des DEPs
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
                        <th scope="col">Numero DEP</th>
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
                              deps.map((dep, key) => (
                                <tr key={key}>
                                  <th scope="row">{dep.numeroDEP} </th>
                                    <td>{dep.motif}</td>
                                    <td>{moment(dep.dateDemande).format('DD/MM/YYYY HH:mm', )} </td>
                                    <td>
                                      {dep.matricule}
                                      <button
                                        type="button"
                                        className="btn btn-outline-primary btn-sm m-0 waves-effect"
                                        variant="primary"
                                        // onClick={() => getOneProducts(product.codeImmatricule)}
                                      ><IoAddCircle/>
                                      </button>
                                    </td>
                                    <td>{dep.validation} 
                                      <button
                                        type="button"
                                        className="btn btn-outline-primary btn-sm m-0 waves-effect"
                                        variant="primary"
                                        onClick={() => validerDEP(dep.numeroDEP)}
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
    }else if(userInfo.idUnite === 2 && userInfo.rang === 3){
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
                        Liste des DEPs
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
                          <th scope="col">Numero DEP</th>
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
                                deps.map((dep, key) => (
                                  <tr key={key}>
                                    <th scope="row">{dep.numeroDEP} </th>
                                      <td>{dep.motif}</td>
                                      <td>{moment(dep.dateDemande).format('DD/MM/YYYY HH:mm', )} </td>
                                      <td>
                                        {dep.matricule}
                                        <button
                                          type="button"
                                          className="btn btn-outline-primary btn-sm m-0 waves-effect"
                                          variant="primary"
                                          // onClick={() => getOneProducts(product.codeImmatricule)}
                                        ><IoAddCircle/>
                                        </button>
                                      </td>
                                      <td>{dep.validation} 
                                        <button
                                          type="button"
                                          className="btn btn-outline-primary btn-sm m-0 waves-effect"
                                          variant="primary"
                                          onClick={() => validerDEP(dep.numeroDEP)}
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
                        Liste des DEPs
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
                        <th scope="col">No dep</th>
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
                              deps.map((dep, key) => (
                                <tr key={key}>
                                  <th scope="row">{dep.numeroDEP} </th>
                                    <td>{dep.motif}</td>
                                    <td>{moment(dep.dateDemande).format('DD/MM/YYYY HH:mm', )} </td>
                                    <td>
                                      {dep.matricule}
                                      <button
                                        type="button"
                                        className="btn btn-outline-primary btn-sm m-0 waves-effect"
                                        variant="primary"
                                        // onClick={() => getOneProducts(product.codeImmatricule)}
                                      ><IoAddCircle/>
                                      </button>
                                    </td>
                                    <td>{dep.validation} 
                                      {/* <button
                                        type="button"
                                        className="btn btn-outline-primary btn-sm m-0 waves-effect"
                                        variant="primary"
                                        onClick={() => validerDEP(dep.numeroDEP)}
                                      >
                                        <IoCheckmarkCircleSharp />
                                      </button> */}
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
                        Liste des DEPs
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
                        <th scope="col">No dep</th>
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
                              deps.map((dep, key) => (
                                <tr key={key}>
                                  <th scope="row">{dep.numeroDEP} </th>
                                    <td>{dep.motif}</td>
                                    <td>{moment(dep.dateDemande).format('DD/MM/YYYY HH:mm', )} </td>
                                    <td>
                                      {dep.matricule}
                                      <button
                                        type="button"
                                        className="btn btn-outline-primary btn-sm m-0 waves-effect"
                                        variant="primary"
                                        // onClick={() => getOneProducts(product.codeImmatricule)}
                                      ><IoAddCircle/>
                                      </button>
                                    </td>
                                    <td>{dep.validation} 
                                      <button
                                        type="button"
                                        className="btn btn-outline-primary btn-sm m-0 waves-effect"
                                        variant="primary"
                                        onClick={() => validerDEP(dep.numeroDEP)}
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
    }
  }else return <><div>chargement spinner </div></>
}

export default DEP;

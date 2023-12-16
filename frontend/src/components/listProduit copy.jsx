import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import moment from "moment";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import {/* useNavigate,*/ NavLink } from 'react-router-dom';
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import background from "../background.jpg";
import background from "../logo.PNG";
import { IoPricetag, IoCar, IoPerson, IoAddCircle, IoCheckmarkCircleSharp, IoEye } from "react-icons/io5";
import AuthHooks from './hooks/AuthHooks';
import { useNavigate } from "react-router-dom";

export default function ListMemo() {
  const { userInfo, /*logOutUser*/ } = AuthHooks();
  React.useEffect(() => {
    console.log("build Homepage ")
  }, []);

  const handleShowEdit = () => setShowEdit(true);
  const [setShowEdit] = useState(false);
  const [ setInputs] = useState([]);
  const [memo, setMemo] = useState([]);
  const [memos, setMemos] = useState([]);
  const userToken = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    getMemoEmploye();
    getMemos();
  }, []);
  const [contenuTab /**, setContenuTab*/] = useState(true);

  function getMemoEmploye() {
    const id = userInfo.matricule;
    axios
      .get(`http://localhost:5000/api/stock/memoemploye/${id}`)
      .then(function (response) {
        setMemo(response.data);
      });
  }
  function validerChefMemo(id) {
    axios
      .put(`http://localhost:5000/api/stock/validerlog/${id}`)
      .then(function (response) {
        toast.success("validé");
        navigate("/produit");
        getMemoEmploye();
      });
  }
  function getMemos() {
    axios
      .get(`http://localhost:5000/api/stock/currentmemos/`)
      .then(function (response) {
        setMemos(response.data);
      });
  }

  if(userInfo.idUnite === 1){
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
                  <p >Employé :  {userInfo.nom}</p>
                    Liste des Produits
                    <span> </span> <span> </span>
                    <label>
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
                              </button></td>
                            <td>{memo.validationLog}  
                              <button
                                type="button"
                                className="btn btn-outline-primary btn-sm m-0 waves-effect"
                                variant="primary"
                                onClick={() => validerChefMemo(memo.numeroMemorandum)}
                              >
                                <IoCheckmarkCircleSharp />
                              </button>
                            </td>
                            <td className="mr-4">
                              <button
                                type="button"
                                className="btn btn-outline-primary btn-sm m-0 waves-effect"
                                variant="primary"
                                onClick={() => validerChefMemo(memo.numeroMemorandum)}
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
          </div>
          </div>
        </div>
      </React.Fragment>
    );
  }else if(userInfo.idUnite ===2 && userInfo.rang ===1){
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
                  <p >Employé :  {userInfo.nom}</p>
                    Liste des Produits
                    <span> </span> <span> </span>
                    <label>
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
                        memos.map((memo, key) => (
                          <tr key={key}>
                            <th scope="row">{memo.numeroMemorandum} </th>
                            <td>{memo.objet}</td>
                            <td>{moment(memo.dateEnvoie).format('DD/MM/YYYY HH:mm', )} </td>
                            <td>{moment(memo.dateReception).format('DD/MM/YYYY HH:mm', )}</td>
                            <td>{memo.validationChef}</td>
                            <td>
                              {memo.validationLog} 
                              <button
                                type="button"
                                className="btn btn-outline-primary btn-sm m-0 waves-effect"
                                variant="primary"
                              >
                                <IoCheckmarkCircleSharp />
                              </button>
                            </td>
                            <td className="mr-4">
                              <button
                                type="button"
                                className="btn btn-outline-primary btn-sm m-0 waves-effect"
                                variant="primary"
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
                <div className="navbar-end">
              </div>
            </div>
          </div>
          </div>
        </div>
      </React.Fragment>
    )
  }else if(userInfo.idUnite ===2 && userInfo.rang ===2){
    
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
              <p >Employé :  {userInfo.nom}</p>
                Liste des Produits
                <span> </span> <span> </span>
                <label>
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
                    memos.map((memo, key) => (
                      <tr key={key}>
                        <th scope="row">{memo.numeroMemorandum} </th>
                        <td>{memo.objet}</td>
                        <td>{moment(memo.dateEnvoie).format('DD/MM/YYYY HH:mm', )} </td>
                        <td>{moment(memo.dateReception).format('DD/MM/YYYY HH:mm', )}</td>
                        <td>{memo.validationChef}</td>
                        <td>
                          {memo.validationLog} 
                          <button
                            type="button"
                            className="btn btn-outline-primary btn-sm m-0 waves-effect"
                            variant="primary"
                          >
                            <IoCheckmarkCircleSharp />
                          </button>
                        </td>
                        <td className="mr-4">
                          <button
                            type="button"
                            className="btn btn-outline-primary btn-sm m-0 waves-effect"
                            variant="primary"
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
            <div className="navbar-end">
          </div>
        </div>
      </div>
      </div>
    </div>
  </React.Fragment>
  }else if(userInfo.idUnite ===2 && userInfo.rang ===3){    
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
                  <p >Employé :  {userInfo.nom}</p>
                    Liste des Produits
                    <span> </span> <span> </span>
                    <label>
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
                      memos.map((memo, key) => (
                      <tr key={key}>
                        <th scope="row">{memo.numeroMemorandum} </th>
                        <td>{memo.objet}</td>
                        <td>{moment(memo.dateEnvoie).format('DD/MM/YYYY HH:mm', )} </td>
                        <td>{moment(memo.dateReception).format('DD/MM/YYYY HH:mm', )}</td>
                        <td>{memo.validationChef}</td>
                        <td>{memo.validationLog} </td>
                        <td className="mr-4">
                          <button
                            type="button"
                            className="btn btn-outline-primary btn-sm m-0 waves-effect"
                            variant="primary"
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
          </div>
        </div>
      </div>
    </React.Fragment>
  }
}

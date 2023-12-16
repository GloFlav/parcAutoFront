import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import background from "../background.jpg";
import { IoAddCircle, IoEye } from "react-icons/io5";

import ModalAddProduitDemande from "./ModalEdit";

export default function ListMemo() {

  // TAKE TOKEN EMPLOYÉ INFO
  const u_info = {
    u_token: localStorage.token,
    u_nom: localStorage.nom,
    u_prenoms: localStorage.prenoms,
    u_attribut: localStorage.idFonction,
    u_photoPDP: localStorage.photoIdentite,
    u_matricule: localStorage.matricule,
    u_etatCompte: localStorage.etatCompte,
  };

  const [ setInputs] = useState([]);
  const [memos, setMemos] = useState([]);
  const userToken = localStorage.getItem("token");

  useEffect(() => {
    getMemoEmploye();
  }, []);
  const [contenuTab /**, setContenuTab*/] = useState(true);


  function getMemoEmploye() {
    const id = u_info.u_matricule;
    axios
      .get(`http://localhost:5000/api/stock/memoemploye/${id}`)
      .then(function (response) {
        setMemos(response.data);
      });
  }

  //#region // MODAL EDIT 
  const [numCompteEdit, setNumCompteEdit] = useState("");
  const [showEdit, setShowEdit] = useState(false);
  const showEditModal = (numCompte) => {
    setNumCompteEdit(numCompte);
    setShowEdit(true);
  };
  const closeEditModal = () => {
    getUsers();
    setShowEdit(false);
  };
  //#endregion
  

  return (
    <React.Fragment>
      <ModalAddProduitDemande showEdit={showEdit} onHide={closeEditModal}>
          {numCompteEdit}
        </ModalAddProduitDemande>


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
                <p >Employé :  { userToken ? ( <>{ u_info.u_nom } </> ) : ( <> Veuillez vous connecter </>)}</p>
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
                          <td>{memo.dateEnvoie} </td>
                          <td>{memo.dateReception}</td>
                          <td>{memo.validationChef}</td>
                          <td>{memo.validationLog}</td>
                          <td className="mr-4">
                          <button
                              type="button"
                              className="btn btn-outline-primary btn-sm m-0 waves-effect"
                              variant="primary"
                              // onClick={() => getOneProducts(product.codeImmatricule)}
                            ><IoAddCircle/> </button>
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
        </div>
        </div>
      </div>
    </React.Fragment>
  );
}

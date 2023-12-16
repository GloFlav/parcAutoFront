import React from "react";
import axios from "axios";
import { useState } from "react";
import Form from "react-bootstrap/Form";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";

export default function AddEmploye() {
  const handleClose = () => setShow(false);
  const [ setShow] = useState(false);
  const navigate = useNavigate();
  const [inputs, setInputs] = useState([]);
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };
  
  const userToken = localStorage.getItem("token");

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


  const onSubmit = (event) => {
    event.preventDefault();
    axios
      .post(`http://localhost:5000/api/stock/produit`, inputs)
      .then(function (response) {
        if (response.data.success) {
          handleClose();
          toast.success(response.data.message);
        } else {
          toast.error(response.data.message);
        }
        navigate("/stock/");
        // getUsers();
      });
  };

  return (
    <>
      <React.Fragment>
        <Navbar />
          <div className="columns mt-6">
            <div className="column is-2">
              <Sidebar />
            </div>
            <div className="column has-background-light">
            <div>          
              <div className="navbar-end">
                <h2>
                  <div className="column is-2">
                    <span> </span>
                    <span> </span>
                  </div>
                </h2>
              </div>
              <div className=" columns is-centered">
                <h1>
                  Ajout Nouveau EMPLOYÉ <br/> par le RH :  { userToken ? ( <>{ u_info.u_nom } </> ) : ( <> Veuillez vous connecter </>)}
                  <span> </span>
                </h1>
              </div>

              {/*  ----- FORMULAIRE AJOUT EMPLOYE ----- */}
              <div className="columns is-centered">
               
              <div className="column is-4 is-fullwidth is-centered">
                <form /*onSubmit={Auth}*/ className="box">
                  <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                      <Form.Label>Code Immatricule</Form.Label>
                        <Form.Control
                          type="text"
                          name="codeImmatricule"
                          onChange={handleChange}
                          placeholder="codeImmatricule"
                          autoFocus
                        />                      
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                      <Form.Label>Nom Produit</Form.Label>
                        <Form.Control
                          type="text"
                          name="nomProduit"
                          onChange={handleChange}
                          placeholder="nomProduit"
                        />
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                        <Form.Label>Unite de sortie du produit  :  * </Form.Label>
                          <select  name="unite" onChange={(e) => handleChange(e)}>
                            <option value="Piece(s)">Piece</option>
                            <option value="Boite(s)">Boite</option>
                            <option value="Rame(s)">Rame</option>
                            <option value="Paquet(s)">Paquet</option>
                          </select>
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                        <Form.Label>Quantité Initiale</Form.Label>
                        <Form.Control
                          type="number"
                          name="quantiteActuelle"
                          min="0" 
                          onChange={handleChange}
                          placeholder="Quantité nouvellement entrée"
                        />
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                        <Form.Label>Quantité Seuille</Form.Label>
                        <Form.Control
                          type="number"
                          name="quantiteSeuille"
                          min="1"
                          onChange={handleChange}
                          placeholder="Quantité de rappel"
                        />
                      </Form.Group>
                        <div className="navbar-end" > 
                          <Button variant="primary" onClick={onSubmit}>
                            Ajouter produit
                          </Button>
                        </div>
                      </Form>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment> 
    </>
  );
}

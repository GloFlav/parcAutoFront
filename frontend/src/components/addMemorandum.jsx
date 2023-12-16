import React from "react";
import axios from "axios";
import { useState } from "react";
import Form from "react-bootstrap/Form";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { IoAddCircle } from "react-icons/io5";

export default function AddMemorandum() {

  const u_info = {
    u_token: localStorage.token,
    u_nom: localStorage.nom,
    u_prenomS: localStorage.prenoms,
    u_attribut: localStorage.idFonction,
    u_photoPDP: localStorage.photoIdentite,
    u_matricule: localStorage.matricule,
    u_etatCompte: localStorage.etatCompte,
  };

  const handleClose = () => setShow(true);
  const [ setShow] = useState(false);
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    matricule : u_info.u_matricule,
    objet : '',
    destinataires : ''
  });
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };


  const onSubmit = (event) => {
    event.preventDefault();
    axios
      .post(`http://localhost:5000/api/stock/memo`, inputs)
      .then(function (response) {
        if (response.data.success) {
          handleClose();
          toast.success(response.data.message);
          navigate("/ListMemorandum/");
        } else {
          toast.error(response.data.message);
        }
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
              <div className="navbar-end">
                <h2>
                  Nouveau Memorandum
                  <span> </span>
                </h2>
              </div>

              {/*  ----- FORMULAIRE AJOUT PRODUIT ----- */}
              <div className="columns is-centered">
              <div className="column is-4 is-fullwidth is-centered">
                <form /*onSubmit={Auth}*/ className="box">
                  <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                      <Form.Label>Matricule du demandeur</Form.Label>
                        <Form.Control
                          type="text"
                          defaultValue={u_info.u_matricule}
                          name="matricule"
                          onChange={handleChange}
                          readOnly={true}
                          placeholder="Matricule"
                        />                      
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                      <Form.Label>Objet </Form.Label>
                        <Form.Control
                          type="text"
                          name="objet"
                          onChange={handleChange}
                          placeholder="objet du memorandum"
                        />
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                        <Form.Label>Destinataires</Form.Label>
                        <Form.Control
                          type="text"
                          name="destinataires"
                          min="0" 
                          onChange={handleChange}
                          placeholder="Destinataires"
                        />
                      </Form.Group>
                        <div className="navbar-end" > 
                          <Button variant="primary" onClick={onSubmit}>
                            <IoAddCircle/> Memorandum
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


import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import React from 'react';


import AuthHooks from './hooks/AuthHooks';

const URL_DE_BASE = `arrondissement/`;
let isValidate = false;

export default function ModalAddMemorandum(props) {
  //#region // MES VARIABLES

  
    const { userInfo } = AuthHooks();
    React.useEffect(() => {
    console.log("redirection produit")
    }, []);

  const handleClose = () => setShow(true);
  const [ setShow] = useState(false);
//   const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    matricule : userInfo.matricule,
    objet : '',
    destinataires : ''
  });

//   const [inputs, setInputs] = useState({
//     nomArrondissement: "",
//   });
  const [erreurs, setErreurs] = useState([]);
  const [messages, setMessages] = useState({
    nomArrondissement: "Nom de l'arrondissement obligatoire",
    messageErreur: "",
  });
  //#endregion

  //#region // FONCTION DU BOUTTON ENREGISTRER
  const onSubmit = () => {
    const opts = {
      headers: {
        Authorization: userInfo,
      },
    };
    axios.post(`http://localhost:5000/api/stock/memo`, inputs).then(function (response) {
      if (response.status === 200) {
        toast.success("Ajout Reussi.");
        onClose();
      } else {
        toast.error("Echec de l'Ajout!");
      }
    });
  };
  //#endregion

  //#region // HANDLE CHANGE FONCTION
  const handleChange = (event) => {

    isValidate = true;
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    setInputs((values) => ({ ...values, [name]: value }));
    setErreurs((values) => ({ ...values, messageErreur: false }));

    if (value.length === 0) {
      isValidate = false;
      setErreurs((values) => ({ ...values, [name]: true }));
      setMessages((values) => ({
        ...values,
        [name]: name + " obligatoire",
      }));
    } else if (value.length < 4) {
      isValidate = false;
      setErreurs((values) => ({ ...values, [name]: true }));
      setMessages((values) => ({
        ...values,
        [name]: name + " trop court",
      }));
    } else if (value.length > 64) {
      isValidate = false;
      setErreurs((values) => ({ ...values, [name]: true }));
      setMessages((values) => ({
        ...values,
        [name]: name + " trop long",
      }));
    } else {
      isValidate = true;
      setErreurs((values) => ({ ...values, [name]: false }));
      setMessages((values) => ({ ...values, [name]: "" }));
    }
  };
  //#endregion

  //#region //VALIDATION FORMULAIRE
  const validation = (event) => {
    event.preventDefault();

    const inputsArray = Object.keys(inputs);
    inputsArray.forEach((element) => {
      const value = Object.values(inputs[element]);
      if (value.length === 0) {
        setErreurs((values) => ({ ...values, [element]: true }));
        isValidate = false;
      }
    });

    if (isValidate) {
      onSubmit();
    }
  };
  //#endregion

  //#region // QUAND JE FERMER MON MODAL, CETTE FONCTIO EST APPELLER
  function onClose() {
    props.onHide();

    const inputsArray = Object.keys(inputs);

    inputsArray.forEach((element) => {
      setInputs((values) => ({ ...values, [element]: "" }));
      inputs[element] = "";
      isValidate = false;
      setErreurs((values) => ({ ...values, [element]: false }));
    });
  }
  //#endregion

  //#region // RENDU HTML DU MODAL AJOUT
  return (
    <>
      <Modal
        size="sm"
        show={props.show}
        onHide={props.closeAddModal}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title className="text-primary h5 md-4">
            Redaction Memorandum
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>- Matricule : </Form.Label>
              <Form.Control
                type="text"
                name="matricule"
                onChange={handleChange}
                value={userInfo.matricule}
                autoComplete="off"
                autoFocus
              />
              <Form.Label>- Objet : </Form.Label>
                <Form.Control
                  type="text"
                  name="objet"
                  onChange={handleChange}
                  placeholder="objet"
                  autoComplete="off"
                  autoFocus
                />
            <Form.Label>- Destinataire : </Form.Label>
              <Form.Control
                type="text"
                name="destinataires"
                onChange={handleChange}
                placeholder="Destinataires"
                autoComplete="off"
                autoFocus
              />
              <small className="text-danger d-block">
                {erreurs.destinataires ? messages.destinataires : null}
              </small>
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="danger" onClick={onClose}>
            Annuler
          </Button>

          <Button variant="primary" onClick={validation}>
            Enregistrer
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
  //#endregion
}

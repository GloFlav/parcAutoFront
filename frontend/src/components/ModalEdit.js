import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import React from "react";

import AuthHooks from "./hooks/AuthHooks";

const URL_DE_BASE = `OUIIIII_URL-MAKA-USUERS-01/`;
let isValidate = false;
let i = 0;

export default function ModalEditProduitDemande(props) {
  //#region // MES VARIABLES
  const identifiant = props.children;
  // RECUPPERER-O ETO LE TOKEN INY NY AN'LAH
  const u_info = {
    u_token: localStorage.token,
    u_identification: localStorage.identification,
    u_attribut: localStorage.attribut,
    u_idUtilisateur: localStorage.idUtilisateur,
    u_etatUtilisateur: localStorage.etatUtilisateur,
  };

  const opts = {
    headers: {
      Authorization: u_info.u_token,
    },
  };
  const [inputs, setInputs] = useState({
    idArrondissement: "",
    nomArrondissement: "",
  });
  const [erreurs, setErreurs] = useState([]);
  const [messages, setMessages] = useState({
    idArrondissement: "",
    nomArrondissement: "Nom de l'arrondissement obligatoire",
    messageErreur: "Aucune modification apercu",
  });
  //#endregion

  //#region // RECUPERER UN Arrondissement
  // FUNC POUR EVITER UNE BOUCLE INFINIE
  while (props.showEdit && i === 0) {
    if (i !== 0) {
      break;
    }
    getOneUser(identifiant);
    i = 1;
  }

  function getOneUser(xid) {
    axios.get(URL_DE_BASE + `${xid}`, opts).then(function (response) {
      setInputs(response.data[0]);
    });
  }
  //#endregion

  //#region // FONCTION DU BOUTTON ENREGISTRER
  const onSubmit = (identifiant) => {
    axios
      .put(URL_DE_BASE + `${identifiant}`, inputs, opts)
      .then(function (response) {
        if (response.status === 200) {
          toast.success("Modificatoin Reussi.");
          onClose();
        } else {
          toast.error("Echec de la Modification!");
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
    } else if (value.length > 20) {
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
  const validation = (event, identifiant) => {
    event.preventDefault();
    // isValidate = true;

    const inputsArray = Object.keys(inputs);
    inputsArray.forEach((element) => {
      const eString = inputs[element].toString();

      if (eString.length === 0) {
        setErreurs((values) => ({ ...values, [element]: true }));
        isValidate = false;
      }
    });

    if (isValidate) {
      onSubmit(identifiant);
    } else {
      setErreurs((values) => ({ ...values, messageErreur: true }));
    }
  };
  //#endregion

  //#region // QUAND JE FERMER MON MODAL, CETTE FONCTIO EST APPELLER
  function onClose() {
    props.onHide();
    i = 0;

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
        show={props.showEdit}
        onHide={props.closeEditModal}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title className="text-primary h5 md-4">
            Edition Arrondissement : {identifiant}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlInput1"
              hidden={true}
            >
              <Form.Control
                type="text"
                name="VARIABLE_NLAH_ANY_AM_BDD"
                onChange={handleChange}
                value={inputs.VARIABLE_NLAH_ANY_AM_BDD}
                placeholder="Identifiant de l'Arrondissement"
                autoComplete="off"
                autoFocus
                disabled={true}
                hidden={true}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
              <Form.Label>- Nom de l'Arrondissement : </Form.Label>
              <Form.Control
                type="text"
                name="VARIABLE_NLAH_ANY_AM_BDD"
                onChange={handleChange}
                value={inputs.VARIABLE_NLAH_ANY_AM_BDD}
                placeholder="Nom de l'Arrondissement"
                autoComplete="off"
                autoFocus
              />
              <small className="text-danger d-block">
                {erreurs.VARIABLE_NLAH_ANY_AM_BDD ? messages.VARIABLE_NLAH_ANY_AM_BDD : null}
              </small>
              <small className="text-danger d-block">
                {erreurs.messageErreur ? messages.messageErreur : null}
              </small>
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="danger" onClick={onClose}>
            Annuler
          </Button>

          <Button
            variant="primary"
            onClick={(e) => validation(e, inputs.identifiant)}
          >
            Enregistrer
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
  //#endregion
}

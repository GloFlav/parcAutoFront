import axios from "axios";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import React from 'react';
import AuthHooks from './hooks/AuthHooks';

export default function ModealAddVoiture(props) {
  const { userInfo } = AuthHooks();
  const [show, setShow] = useState(false);
  const [inputs, setInputs] = useState({
    immatricule: userInfo.immatricule,
    modele: '',
    kilometrage: '',
    matricule: '',
    couleur: ''
  });
  const [erreurs, setErreurs] = useState([]);
  const [messages, setMessages] = useState({
    immatricule: "Champ obligatoire",
    messageErreur: "",
  });
  let isValidate = true;

  useEffect(() => {
    console.log("redirection voiture")
  }, []);

  const handleClose = () => setShow(false);

  const onSubmit = () => {
    const opts = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    axios.post(`http://localhost:5000/api/float/voiture`, inputs, opts)
      .then(function (response) {
        if (response.status === 200) {
          toast.success("Ajout Réussi.");
          onClose();
        } else {
          toast.error("Échec de l'Ajout !");
        }
      });
  };

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
    } else if (value.length < 1) {
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

  return (
    <>
      <Modal
        size="sm"
        show={props.show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title className="text-primary h5 md-4">
            Nouvelle voiture
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>- Immatricule : </Form.Label>
              <Form.Control
                type="text"
                name="immatricule"
                onChange={handleChange}
                value={userInfo.immatricule}
                autoComplete="off"
                autoFocus
              />
              <Form.Label>- Conducteur : </Form.Label>
              <Form.Control
                type="text"
                name="matricule"
                onChange={handleChange}
                placeholder="matricule"
                autoComplete="off"
              />
              <Form.Label>- Couleur : </Form.Label>
              <Form.Control
                type="text"
                name="couleur"
                onChange={handleChange}
                placeholder="couleur"
                autoComplete="off"
              />
              <Form.Label>- Modele : </Form.Label>
              <Form.Control
                type="text"
                name="modele"
                onChange={handleChange}
                placeholder="Modèle"
                autoComplete="off"
              />
              <Form.Label>- Kilometrage : </Form.Label>
              <Form.Control
                type="number"
                name="kilometrage"
                onChange={handleChange}
                placeholder="Kilometrage"
                autoComplete="off"
              />
              <small className="text-danger d-block">
                {erreurs.modele ? messages.modele : null}
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
}

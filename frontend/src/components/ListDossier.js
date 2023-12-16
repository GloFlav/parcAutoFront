import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Header from "../Header"

export default function Login() {
  const navigate = useNavigate();

  // FONCTION A EXECUTER LORS DU CLIC ' SE-CONNECTER ' ----- () => SE CONNECTER -----
  const [inputs, setInputs] = useState([]);
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  //ENVOYER DONNER FORMULAIRE AU BACK-END
  const onSubmit = (event) => {
    event.preventDefault();
    axios
      .post(`http://localhost:5000/api/employe/login`, inputs)
      .then(function (response) {
        if (response.data.success && response.status === 200) {
          navigate("/employe/"); // a decommenter si hiditr page hafa !
          toast.success(`Connexion reussite`);
          localStorage.setItem("userInfo", response.data.user);
          localStorage.setItem("token", response.data.token);
          // localStorage.removeItem("token");
          console.log(response.data.token);
        } else {
          toast.error(`Echec de connexion`);
        }
      })
      .catch((error) => {
        console.log("Il y a une erreur : ", error);
      });
  };

  {
    /* RENDU HTML ----- JSX ----- */
  }
  return (
    <>
      <div className="container">
        <Header />
          <Form className="text-center border border-light p-5">
            <p className="h4 mb-4">Se Connecter</p>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label> </Form.Label>
              <Form.Control
                type="text"
                name="mail"
                onChange={handleChange}
                placeholder="mail"
                className="form-control mb-4"
                autoFocus
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
              <Form.Label> </Form.Label>
              <Form.Control
                type="password"
                name="motDePasses"
                onChange={handleChange}
                placeholder="Mot de passe"
                className="form-control mb-4"
              />
            </Form.Group>
            <Button variant="danger" type="reset">
              Annuler
            </Button>
            <span> </span>
            <Button variant="primary" onClick={onSubmit}>
              Se Connecter
            </Button>
          </Form>
      </div>
    </>
  );
}

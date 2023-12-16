import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import logo from "../logo.PNG";
import background from "../background1.jpg";
import { getAccessToken } from "./services/AuthServices";
import AuthHooks from "./hooks/AuthHooks";

export default function Login() {
  const navigate = useNavigate();
  const {logIn} = AuthHooks();
  // FONCTION A EXECUTER LORS DU CLIC ' SE-CONNECTER ' ----- () => SE CONNECTER -----
  const [inputs, setInputs] = useState([]);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };
  //ENVOYER DONNER FORMULAIRE AU BACK-END
  const onSubmit = async (event) => {
    event.preventDefault();
    const redirection = await logIn(inputs);
    if(redirection) {
      // window.reload();
      const token = getAccessToken();
      if(token) navigate("/home");
    }
  };

  return (
    <section style={{ 
      backgroundImage: `url(${background})`,
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      width: '100vw',
      height: '100vh'
    }}>
    <div className="container">
      <div className="navbar-end">
        <div className="column is-3 is-fullwidth">
          <form /*onSubmit={Auth}*/ className="box"  style={{
            backgroundColor: 'white',
            opacity: 0.8
          }}>
            <h1 className="title is-3" style={{
              textAlign: "center"
            }}>Se connecter</h1>
            <div className="field"  style={{
              opacity: 1,
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <label className="label">Email</label>
              <div className="control">
                  <input
                    type="text"
                    name="mail"
                    className="input"
                    onChange={handleChange}
                    placeholder="mail"
                  />
              </div>
            </div>
            <div className="field">
              <label className="label">Mot De Passe</label>
              <div className="control">
                <input
                  type="password"
                  name="motDePasse"
                  className="input"
                  onChange={handleChange}
                  placeholder="Mot de passe"
                />
              </div>
            </div>
            <div className="field is-fullwidth mt-3 "> 
              <div className="control">
                <Button
                  className="button is-success is-fullwidth"
                  onClick={onSubmit}
                >
                Se connecter
                {/* {isLoading ? "Chargement..." : "Se Connecter"} */}
                </Button> 
              </div>
            </div>
            <div className="field is-fullwidth mt-3 "> 
              <div className="control">                 
                <Button variant="danger" type="reset"
                  className="button is-danger is-fullwidth"
                >
                  Annuler
                </Button>
              </div>
            </div>
            <div className="field mt-3">
              <img src={logo} alt="logo" />
            </div>
          </form>
        </div>
      </div>
  </div>
    </section>
  );
}
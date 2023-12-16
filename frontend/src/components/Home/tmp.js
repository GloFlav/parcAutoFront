import React from 'react';
import { useNavigate } from 'react-router-dom';
import AuthHooks from '../hooks/AuthHooks';

const HomePage = () => {
    const navigate = useNavigate();
    const { userInfo, logOutUser } = AuthHooks();
    React.useEffect(() => {
        console.log("build Homepage ")
    }, []);
    const logOut = () => {
        console.log("log out user ")
        logOutUser();
        navigate("/")
    }
        if(userInfo.nom && userInfo.mail){
            return <div>
            <p>un simple test de homepage et mettre ici les routes avec leurs access {userInfo.nom} {userInfo.mail}</p>
            <button onClick={() => navigate("/admin")}> administrateur autorise </button>
            <button onClick={() => navigate("/chef")}>chef d'unite autorise  </button>
            <button onClick={() => navigate("/user")}>utilisateur autorise  </button>
            <button onClick={() => logOut()}> se deconnecter  </button>
        </div>
        }
        else return <><div>chargement spinner </div></>
}

export default HomePage;

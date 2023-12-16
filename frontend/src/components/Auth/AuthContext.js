import axios from "axios";
import { createContext, useState } from "react";
import { toast } from "react-toastify";
import { isAuthenticatedVerification, setAccessToken, logout } from "../services/AuthServices";
/**
 * les informations de connexions sont stockees ici 
 */
export const AuthContext  = createContext();
    export const AuthProvider = ({children}) => {
    /*ceci est l'information de connexion de l'utilisateur */
    const [userInfo, setUserInfo] = useState([]);
    const logIn = (inputs) => {
        return new Promise((resolve, reject) => {
            axios
            .post(`http://localhost:5000/api/employe/login`, inputs)
            .then(function (response) {
              if (response.data.success && response.status === 200) {
                const { token } = response.data;
                setAccessToken(token);
                console.log("naviguer vers la page d'acceuil")
                toast.success(`Connexion reussite`);
                resolve(true);
              } else {
                toast.error(`Echec de connexion`);
                resolve(false)
              }
            })
            .catch((error) => {
              console.log("Il y a une erreur : ", error);
              resolve(false)
            });
        })      
    }
    const getUserInfo = async () => {
        const userLogged = await isAuthenticatedVerification();
        setUserInfo(userLogged)
    }
    const logOutUser = async () => {
        setUserInfo(null);
        logout();
    }
    return(
        <AuthContext.Provider value={{userInfo, setUserInfo, logIn, getUserInfo, logOutUser}}>{children}</AuthContext.Provider>
    )
    
}

import axios from "axios";

export const TOKEN = "token";

export const setAccessToken = (tokenValue) => {
    localStorage.setItem(TOKEN, tokenValue);
}

export const getAccessToken = () => {
    const token = localStorage.getItem(TOKEN);
    // check validite token 
    return token;
}

export const isAuthenticatedVerification = async () => {
    try {
        const token = getAccessToken();
        axios.defaults.headers.common.Authorization = token;

        const reponseApi = await axios.get("http://localhost:5000/api/employe/userConnected");
        const { message, success, userLogged } = reponseApi.data;

        if (success && userLogged) {
            return userLogged;
        } else {
            console.error("Erreur lors de la vérification de l'authentification :", message);
            return null;
        }
    } catch (err) {
        console.error("Erreur lors de la requête API :", err);

        if (err.response && err.response.status === 400) {
            console.log("Le jeton n'est plus valide.");
        } else {
            console.log("Une erreur s'est produite, veuillez réessayer plus tard.");
        }

        return null;
    }
}

export const logout = () => {
    localStorage.clear();
}


// export const isAuthenticatedVerification =  () => {
//     return new Promise(async (resolve, reject) => {
//         let userAuthenticated = null;

//     const token = getAccessToken();
//     axios.defaults.headers.common.Authorization = token;
//     // const reponseAxios = await axios.get("http://localhost:5000/api/employe/userConnected");
//     try{
//         const reponseApi = await axios.get("http://localhost:5000/api/employe/userConnected");
//         const {message, success, userLogged} = reponseApi.data;
//         if(success && userLogged){
//             userAuthenticated = userLogged;
//             return resolve(userAuthenticated);
//         }else {
//             console.log(message)
//             return null;
//         }
//     }catch(err) {
//         console.log(err.message)
//         if(err.message.includes("400")){
//             console.log("Token n'est plus valide ")
            
//         }else {
//             console.log("Une erreur s'est produite, veuillez reessayer plus tard")
//         }

//     }
//     return resolve(userAuthenticated);
//     // console.log(reponseAxios.data);
//     })
    
// }

// export const logout = () => {
//     // vider le local storage 
//     localStorage.clear();
// }
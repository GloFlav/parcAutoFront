import { useNavigate } from "react-router-dom";
import AuthHooks from "../components/hooks/AuthHooks";
import { getAccessToken } from "../components/services/AuthServices";

const HomePageRouteVerification = ({children, user}) => {
    const token = getAccessToken();
    const navigate = useNavigate();
    if(token){
      let {userInfo, getUserInfo} = AuthHooks()
      getUserInfo();
      if(userInfo){
        return children;
      }
    }
    console.log("rediriger vers /login");
    return <><p onClick={() => navigate("/")}>retour vers la page d'authentification  </p></>
  }

  export default HomePageRouteVerification;
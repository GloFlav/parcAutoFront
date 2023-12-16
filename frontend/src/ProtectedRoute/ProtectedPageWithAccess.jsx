import { useNavigate } from "react-router-dom";
import AuthHooks from "../components/hooks/AuthHooks";
import { getAccessToken } from "../components/services/AuthServices";

const ProtectedRoute = ({children, access, noAccessRedirection}) => {
    const navigate = useNavigate();
    const token = getAccessToken();
    // console.log(props.access)
    if(token){
      let {userInfo, getUserInfo} = AuthHooks()
      getUserInfo();
      if(access.includes(userInfo.idFonction)){
        return children;
      }
      else {
        return <><p onClick={() => navigate(noAccessRedirection)}>Permission denied </p></>
      }
    }
    console.log("Aucun utilisateur connecte ");
    return <><p onClick={() => navigate("/")}>Retour vers home page </p></>
  }

  export default ProtectedRoute;
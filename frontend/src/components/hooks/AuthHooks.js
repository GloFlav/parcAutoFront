import { useContext } from "react";
import { AuthContext } from "../Auth/AuthContext";

const AuthHooks = () => {
    return useContext(AuthContext);
}

export default AuthHooks;
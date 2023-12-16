import { BrowserRouter, Routes, Route, useNavigate,useLocation, redirect } from "react-router-dom";
import Login from "./components/login.jsx";
import Employe from "./components/employe";
import Stock from "./components/stock.jsx";
import NouveauProduit from "./components/addProduit.jsx";
import { getAccessToken } from "./components/services/AuthServices.js";
import AdminHomepage from "./components/Admin/AdminHomepage.jsx";
import HomePage from "./components/Home/homePage.jsx";
import { AUTHORISATION_ADMIN, AUTHORISATION_CHEF, AUTHORISATION_USER } from "./components/authorisation/Authorisation.js";
import { useEffect } from "react";
import UniteChef from "./components/chefUnite/UniteChef.jsx";
import UserInterface from "./components/user/UserInterface.jsx";
import AuthHooks from "./components/hooks/AuthHooks.js";
import HomePageRouteVerification from "./ProtectedRoute/HomePageVerificationRoute.jsx";
import ProtectedRoute from "./ProtectedRoute/ProtectedPageWithAccess.jsx";
import Produit from "./components/produit.jsx";
import ListProduit from "./components/listProduit.jsx";
import Voiture from "./components/voiture.jsx";
import ListVoiture from "./components/listVoiture.jsx";
import Profil from "./components/profil.jsx";
// import MemorandumList from "./components/listMemorandum.jsx";
//CONCERNANT PRODUIT
  //MEMORANDUM
import Memorandum from "./components/memorandum.jsx";
import AddMemorandum from "./components/addMemorandum.jsx";

  //DEP
import DEP from "./components/DEP.jsx";

  //ENTREE PRODUIT
import EntreeProduit from "./components/entreeProduit";

  //SORTIE PRODUIT
import SortieProduit from "./components/sortieProduit";

// import NouvelEmploye from "./components/addEmploye.jsx";
import { toast, ToastContainer } from "react-toastify";
import "bulma/css/bulma.css";
import "react-toastify/dist/ReactToastify.css";
import Protected from "./Protected"
import Deconnection from "./deconnection"

function App() {
  const {userInfo, getUserInfo} = AuthHooks();
  const token = getAccessToken();
  const getData = async () => {
    await getUserInfo();
    // console.log("user info ***** ",userInfo)
  }

  useEffect(() => {
    
    getData()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return (
    <div className="App">
      <ToastContainer autoClose={3000} position={toast.POSITION.BOTTOM_RIGHT} />
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<HomePageRouteVerification> <HomePage /> </HomePageRouteVerification>} />  
          <Route path="/admin" element={ <ProtectedRoute noAccessRedirection="/" access={[AUTHORISATION_ADMIN]} user={userInfo}> <AdminHomepage /> </ProtectedRoute>} />  
          <Route path="/chef" element={ <ProtectedRoute noAccessRedirection="/" access={[AUTHORISATION_ADMIN, AUTHORISATION_CHEF]} user={userInfo}> <UniteChef /> </ProtectedRoute> } />  
          <Route path="/user" element={ <ProtectedRoute noAccessRedirection="/" access={[AUTHORISATION_ADMIN, AUTHORISATION_CHEF, AUTHORISATION_USER]} user={userInfo}> <UserInterface />  </ProtectedRoute> } /> 
          <Route index element={ <Deconnection Cmp={Login} />} />
          {/* <Route path="employe/" element={ <Protected Cmp={Employe} /> } />   */}
          <Route path="nouveauProduit/" element={ <Protected Cmp={NouveauProduit} /> } />  
          {/* <Route path="stock/" element={ <Protected Cmp={Stock} /> } />   */}
          {/**memorandum */}
          <Route path="memorandum/" element={ <Protected Cmp={Memorandum} /> } /> 
          <Route path="addMemorandum/" element={ <Protected Cmp={AddMemorandum} /> } /> 

          {/**dep */}
          <Route path="DEP/" element={ <Protected Cmp={DEP} /> } /> 

          {/**entreeProduit */}
          <Route path="entreeProduit/" element={ <Protected Cmp={EntreeProduit} /> } /> 

          {/**sortieProduit */}
          <Route path="sortieProduit/" element={ <Protected Cmp={SortieProduit} /> } /> 

          {/* <Route path="nouvelEmploye/" element={ <Protected Cmp={NouvelEmploye} /> } />  */}
          {/* <Route path="listMemorandum/" element={ <Protected Cmp={MemorandumList} /> } />   */}
          <Route path="produit/" element={ <Protected Cmp={Produit} /> } /> 
          <Route path="listProduit/" element={ <Protected Cmp={ListProduit} /> } />  
          <Route path="voiture/" element={ <Protected Cmp={Voiture} /> } /> 
          <Route path="listVoiture/" element={ <Protected Cmp={ListVoiture} /> } /> 


          <Route path="profil/" element={ <Protected Cmp={Profil} /> } />  
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

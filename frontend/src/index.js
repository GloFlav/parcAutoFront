import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import reportWebVitals from "./reportWebVitals";
import { AuthProvider } from './components/Auth/AuthContext';

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <AuthProvider>
     <App />
    </AuthProvider>
   
);

reportWebVitals();
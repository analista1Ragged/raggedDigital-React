import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";
import "./style/index.css";
import Home from './pages/Home';
import ReportePB from './pages/reportePB';
import PaginaMtto from './pages/paginaMtto';
import Login from "./components/login/login";
import Bancos from './pages/Bancos';
import TicketTable from './pages/VerCapsulas';
import Footer from './components/Footer/Footer';
import Layout from './pages/Layout';
import MyMenu from './components/MyMenu/MyMenu';
import Tabla from './pages/ConsultaCartera/ConsultaCartera';
import { AuthContext, AuthProvider } from './context/AuthContext'; // Importa el contexto de autenticación y AuthProvider
import Error404 from './components/Error404/Error404';
import InventariosDisponibles from './pages/InventariosDisponibles/InventariosDisponibles';
import OlvidasteContrasena from './pages/OlvidasteContrasena';
import CambiarContraseña from './pages/CambiarContraseña';
import NominaElectronica from './pages/NominaElectronica/NominaElectronica';
import AdministracionMaestras from './pages/Perfiles/Perfiles';
import PedidosVtex from './pages/PedidosVtex/PedidosVtex';
//import Menu2BotonesP from './components/Menu3Botones/Menu2BotonesP';
//import CheckboxGroup from './components/Checkbox/CheckboxDoble/CheckboxGroup';
import PowerPoint from './components/HelpRaggedDigital/HelpNominaElectronica';
import Header from './components/Header/Header';
import Carrusel from './components/Carrusel/Carrusel';


//export const urlapi = 'https://serverrgd.eastus.cloudapp.azure.com:8082/RaggedDigitalAPI'
export const urlapi = 'http://localhost:5000/RaggedDigitalAPI';

const PrivateRoute = ({ element }) => {
  const isAuthenticated = sessionStorage.getItem('log');
  return isAuthenticated ? element : <Navigate to="/Login" />;
};

const CerrarSesion = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Borrar la variable 'log' del sessionStorage
    sessionStorage.removeItem('log');
    sessionStorage.removeItem('auth');
    // Redirigir a la página de login
    navigate('/Login');
  }, [navigate]);

  // Renderizar null porque no se necesita mostrar nada
  return null;
};



function App() {
  const [navVisible, showNavbar] = useState(false);
  const currentLocation = useLocation(); // Cambia el nombre de location a currentLocation

  // Función para verificar si se debe mostrar el navbar
  const shouldShowNavbar = () => {
    // Excluir rutas donde no quieres mostrar MyMenu
    const excludedRoutes = ['/Login', '/OlvidasteContrasena', '/HelpNomina', '/HelpCartera', '/HelpInventarios', '/HelpVerCapsulas', '/HelpBancos', '/HelpPedidosVtex', '/ManualDeAcceso'];
    return !excludedRoutes.includes(currentLocation.pathname); // Usa currentLocation.pathname
  };

  

  return (
    <div className="App">
      {shouldShowNavbar() && <MyMenu  />}
      {shouldShowNavbar() && <Header />}
      <Routes>
        <Route path="/" element={<Navigate to="/Login" />} />
        <Route path='/Login' element={
          <div className={!navVisible ? "page" : "page page-with-navbar"}>
            <Login />
          </div>
        } />
        <Route path='/Home' element={
           <PrivateRoute element={
          <div className={!navVisible ? "page" : "page page-with-navbar"}>
            <Home />
          </div>
          } />
        } />
        <Route path='/analytics' element={
          <div className={!navVisible ? "page" : "page page-with-navbar"}>
          </div>
        } />
        <Route path='/analytics/Reporte' element={
          <PrivateRoute element={
            <div className={!navVisible ? "page" : "page page-with-navbar"}>
              <ReportePB />
            </div>
          } />
        } />
        <Route path='/Mercadeo' element={
          <div className={!navVisible ? "page" : "page page-with-navbar"}>
          </div>
        } />
        <Route path='Mercadeo/Raqstyle/Cartera' element={
          <div className={!navVisible ? "page" : "page page-with-navbar"}>
            <Tabla />
          </div>
        } />
        <Route path='Mercadeo/Raqstyle/Inventario' element={
          <div className={!navVisible ? "page" : "page page-with-navbar"}>
            <InventariosDisponibles />
          </div>
        } />
        <Route path='/ecommerce' element={
          <div className={!navVisible ? "page" : "page page-with-navbar"}>
          </div>
        } />
        <Route path='/ecommerce/Ragged' element={
          <PrivateRoute element={
            <div className={!navVisible ? "page" : "page page-with-navbar"}>
              <PaginaMtto />
            </div>
          } />
        } />
        <Route path='/ecommerce/Vtex' element={
          <PrivateRoute element={
            <div className={!navVisible ? "page" : "page page-with-navbar"}>
              <PaginaMtto />
            </div>
          } />
        } />
        <Route path='/ecommerce/VerCapsulas' element={
          <PrivateRoute element={
            <div className={!navVisible ? "page" : "page page-with-navbar"}>
              <TicketTable />
            </div>
          } />
        } />
        <Route path='/contabilidad' element={
          <div className={!navVisible ? "page" : "page page-with-navbar"}>
          </div>
        } />
        <Route path='/contabilidad/Planos' element={
          <PrivateRoute element={
            <div className={!navVisible ? "page" : "page page-with-navbar"}>
              <PaginaMtto />
            </div>
          } />
        } />
        <Route path='/contabilidad/Bancos' element={
          <PrivateRoute element={
            <div className={!navVisible ? "page" : "page page-with-navbar"}>
              <Bancos />
            </div>
          } />
        } />
        <Route path='/Settings' element={
          <PrivateRoute element={
            <div className={!navVisible ? "page" : "page page-with-navbar"}>
              <PaginaMtto />
            </div>
          } />
        } />
        <Route path='/layout' element={
          <PrivateRoute element={
            <div className={!navVisible ? "page" : "page page-with-navbar"}>
              <Layout />
            </div>
          } />
        } />
        <Route path='/CerrarSesion' element={<CerrarSesion />} />
        <Route path='/MyMenu' element={
          <PrivateRoute element={
            <div className={!navVisible ? "page" : "page page-with-navbar"}>
              <MyMenu />
            </div>
          } />
        } />
        <Route path='/Prueba' element={
          <div className={!navVisible ? "page" : "page page-with-navbar"}>
            <Carrusel />
          </div>
        } />
        
        <Route path='/*' element={
          <PrivateRoute element={
            <div className={!navVisible ? "page" : "page page-with-navbar"}>
              <Error404 />
            </div>
          } />
        } />
        <Route path='/OlvidasteContrasena' element={
            <div className={!navVisible ? "page" : "page page-with-navbar"}>
              <OlvidasteContrasena />
            </div>
        } />
        <Route path='/CambiarContraseña' element={
          <PrivateRoute element={
            <div className={!navVisible ? "page" : "page page-with-navbar"}>
              <CambiarContraseña />
            </div>
          } />
        } />
        <Route path='/TalentoHumano/Nomina/NominaElectronica' element={
          <div className={!navVisible ? "page" : "page page-with-navbar"}>
            <NominaElectronica />
          </div>
        } />
        <Route path='/AdministracionMaestras/Perfiles' element={
          <div className={!navVisible ? "page" : "page page-with-navbar"}>
            <AdministracionMaestras />
          </div>
        } />
        <Route path='/Logistica/CanalDigital/Vtex' element={
          <div className={!navVisible ? "page" : "page page-with-navbar"}>
            <PedidosVtex />
          </div>
        } />
        <Route 
          path="/HelpNomina" 
          element={
            <div className={!navVisible ? "page" : "page page-with-navbar"}>
              <PowerPoint 
                src="https://ragged-my.sharepoint.com/personal/greggo_ragged_com_co/_layouts/15/Doc.aspx?sourcedoc={523665fa-473f-430a-ade3-c886936e969f}&amp;action=embedview&amp;wdAr=1.7777777777777777" 
              />
            </div>
          }
        />
        <Route 
          path="/HelpCartera" 
          element={
            <div className={!navVisible ? "page" : "page page-with-navbar"}>
              <PowerPoint 
                src="https://ragged-my.sharepoint.com/personal/greggo_ragged_com_co/_layouts/15/Doc.aspx?sourcedoc={df779a9c-d49e-42c8-9515-172133b2a4d5}&amp;action=embedview&amp;wdAr=1.7777777777777777" 
              />
            </div>
          }
        />
        <Route 
          path="/HelpInventarios" 
          element={
            <div className={!navVisible ? "page" : "page page-with-navbar"}>
              <PowerPoint 
                src="https://ragged-my.sharepoint.com/personal/greggo_ragged_com_co/_layouts/15/Doc.aspx?sourcedoc={0d9a4aa6-5d34-40db-a2fa-ccfa8e92d3e1}&amp;action=embedview&amp;wdAr=1.777777777777777" 
              />
            </div>
          }
        />
        <Route 
          path="/HelpVerCapsulas" 
          element={
            <div className={!navVisible ? "page" : "page page-with-navbar"}>
              <PowerPoint 
                src="https://ragged-my.sharepoint.com/personal/greggo_ragged_com_co/_layouts/15/Doc.aspx?sourcedoc={3b27d42d-26b3-4957-a17b-544a80a56fcc}&amp;action=embedview&amp;wdAr=1.7777777777777777" 
              />
            </div>
          }
        />
        <Route 
          path="/HelpBancos" 
          element={
            <div className={!navVisible ? "page" : "page page-with-navbar"}>
              <PowerPoint 
                src="https://ragged-my.sharepoint.com/personal/greggo_ragged_com_co/_layouts/15/Doc.aspx?sourcedoc={58d6ea62-fea3-4f94-88c0-9f574cbe6418}&amp;action=embedview&amp;wdAr=1.7777777777777777" 
              />
            </div>
          }
        />
        <Route 
          path="/HelpPedidosVtex" 
          element={
            <div className={!navVisible ? "page" : "page page-with-navbar"}>
              <PowerPoint 
                src="https://ragged-my.sharepoint.com/personal/greggo_ragged_com_co/_layouts/15/Doc.aspx?sourcedoc={c6c6200c-c00a-429f-84ba-8605ddc65b17}&amp;action=embedview&amp;wdAr=1.7777777777777777" 
              />
            </div>
          }
        />
        <Route 
          path="/ManualDeAcceso" 
          element={
            <div className={!navVisible ? "page" : "page page-with-navbar"}>
              <PowerPoint 
                src="https://ragged-my.sharepoint.com/personal/greggo_ragged_com_co/_layouts/15/Doc.aspx?sourcedoc={a13baf38-881f-4680-8df0-9250521892ef}&amp;action=embedview&amp;wdAr=1.7777777777777777" 
              />
            </div>
          }
        />
      </Routes>
      
      {shouldShowNavbar() && <Footer />}
    </div>
  );
}

function AppWrapper() {
  return (

    <BrowserRouter basename="/RaggedDigital">
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  );
}



export default AppWrapper;


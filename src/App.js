import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";
import { AuthProvider } from './context/AuthContext';
import './style/index.css';

import {
  Home,
  ReportePB,
  PaginaMtto,
  Bancos,
  TicketTable,
  Tabla,
  InventariosDisponibles,
  OlvidasteContrasena,
  CambiarContraseña,
  NominaElectronica,
  AdministracionMaestras,
  PedidosVtex,
  PublicarCatalogo,
  ReporteReferencias,
  ReportesCostos,
  EscalasPrecios,
  Layout,
  ReporteDane,
  Marketplace,
  CupoCliente
} from './pages';

import {
  Footer,
  MyMenu,
  Header,
  PowerPoint,
  Error404,
  Login
} from './components';

import manualRagged from './assets/docts/MANUAL DE USABILIDAD RAGGED DIGITAL.pptx';


//export const urlapi = 'https://serverrgd.eastus.cloudapp.azure.com:8082/RaggedDigitalAPI'
export const urlapi = 'http://127.0.0.1:5000/RaggedDigitalAPI';

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
    const excludedRoutes = ['/Login', '/OlvidasteContrasena', '/HelpNomina', '/HelpCartera', '/HelpInventarios', '/HelpVerCapsulas', '/HelpBancos', '/HelpPedidosVtex', '/ManualDeAcceso', '/Prueba'];
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
        <PrivateRoute element={
          <div className={!navVisible ? "page" : "page page-with-navbar"}>
          </div>
        } />
      }/>
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
        <Route path='/Marketplace' element={
          <div className={!navVisible ? "page" : "page page-with-navbar"}>
            <Marketplace />
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
        <Route path='/TalentoHumano/Nomina/ReporteDane' element={
          <div className={!navVisible ? "page" : "page page-with-navbar"}>
            <ReporteDane />
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
        <Route path='/Logistica/CanalDigital/Catalogo' element={
          <div className={!navVisible ? "page" : "page page-with-navbar"}>
            <PublicarCatalogo />
          </div>
        } />
        <Route path='/Logistica/CanalDigital/CupoCliente' element={
          <div className={!navVisible ? "page" : "page page-with-navbar"}>
            <CupoCliente />
          </div>
        } />
        <Route path='/Maestros/Referencias' element={
          <div className={!navVisible ? "page" : "page page-with-navbar"}>
            <ReporteReferencias />
          </div>
        } />
        <Route path='/Maestros/Costos' element={
          <div className={!navVisible ? "page" : "page page-with-navbar"}>
            <ReportesCostos />
          </div>
        } />
        <Route path='/Maestros/EscalasPrecios' element={
          <div className={!navVisible ? "page" : "page page-with-navbar"}>
            <EscalasPrecios />
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


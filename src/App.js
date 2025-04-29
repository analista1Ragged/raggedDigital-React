import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";
import { AuthProvider } from './context/AuthContext';
import './style/index.css';
import { manualUsabilidad } from './assets';


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
  CupoEmpleados,
  InfoExogena,
  LogsTerceros,
  PagoProveedores
} from './pages';

import {
  Footer,
  MyMenu,
  Header,
  PowerPoint,
  Error404,
  Login
} from './components';




//export const urlapi = 'https://serverrgd.eastus.cloudapp.azure.com:8082/RaggedDigitalAPI'
//export const urlapi = 'https://Ragged.app/RaggedDigitalAPI'
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
        <Route path='/contabilidad/Exogena' element={
          <PrivateRoute element={
            <div className={!navVisible ? "page" : "page page-with-navbar"}>
              <InfoExogena />
            </div>
          } />
        } />
        <Route path='/Cartera/Proveedores' element={
          <PrivateRoute element={
            <div className={!navVisible ? "page" : "page page-with-navbar"}>
              <PagoProveedores />
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
        <Route path='/Mercadeo/Tiendas/CupoEmpleados' element={
          <div className={!navVisible ? "page" : "page page-with-navbar"}>
            <CupoEmpleados />
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
        <Route path='/Mercadeo/Tiendas/Inconsistencias' element={
          <div className={!navVisible ? "page" : "page page-with-navbar"}>
            <LogsTerceros />
          </div>
        } />


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


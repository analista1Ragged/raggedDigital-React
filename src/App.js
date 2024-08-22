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
import Tabla from './pages/Tabla/Tabla';
import { AuthContext, AuthProvider } from './context/AuthContext'; // Importa el contexto de autenticación y AuthProvider
import Error404 from './components/Error404/Error404';
import InventariosDisponibles from './pages/InventariosDisponibles/InventariosDisponibles';

import MultiSelector from './components/MultiSelector/MultiSelector';
//export const urlapi = 'http://serverrgd.eastus.cloudapp.azure.com:5000'
export const urlapi = 'http://localhost:5000'

const PrivateRoute = ({ element }) => {
  const isAuthenticated = sessionStorage.getItem('log');
  return isAuthenticated ? element : <Navigate to="/Login" />;
};

const CerrarSesion = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Borrar la variable 'log' del sessionStorage
    sessionStorage.removeItem('log');
    
    // Redirigir a la página de login
    navigate('/Login');
  }, [navigate]);

  // Renderizar null porque no se necesita mostrar nada
  return null;
};

function App() {
  const [navVisible, showNavbar] = useState(false);
  const location = useLocation();

  // Función para verificar si se debe mostrar el navbar
  const shouldShowNavbar = () => {
    return location.pathname !== '/Login';
  };

  return (
    <div className="App">
      {shouldShowNavbar() && <MyMenu visible={navVisible} show={showNavbar} />}
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
            <InventariosDisponibles />
          </div>
        } />
        
        <Route path='/*' element={
          <PrivateRoute element={
            <div className={!navVisible ? "page" : "page page-with-navbar"}>
              <Error404 />
            </div>
          } />
        } />
      </Routes>
      {shouldShowNavbar() && <Footer />}
    </div>
  );
}

function AppWrapper() {
  return (
    //<BrowserRouter basename="/RaggedDigital">
    <BrowserRouter basename="/RaggedDigital">
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  );
}



export default AppWrapper;


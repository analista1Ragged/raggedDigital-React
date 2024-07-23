import React, { useState, useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
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
//import MyForm from './components/SeleccionarFecha/SeleccionarFecha';
//import CheckboxForm from './components/Checkbox/Checkbox';
import Tabla from './components/Tabla/Tabla';
import { AuthContext, AuthProvider } from './context/AuthContext'; // Importa el contexto de autenticación y AuthProvider


const PrivateRoute = ({ element }) => {
  const { auth } = useContext(AuthContext);
  return auth.isAuthenticated ? element : <Navigate to="/Login" />;
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

            <div className={!navVisible ? "page" : "page page-with-navbar"}>
              <Home />
            </div>
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
        <Route path='/CerrarSesion' element={
          <div className={!navVisible ? "page" : "page page-with-navbar"}>
          </div>
        } />
        <Route path='/MyMenu' element={
          <PrivateRoute element={
            <div className={!navVisible ? "page" : "page page-with-navbar"}>
              <MyMenu />
            </div>
          } />
        } />
        <Route path='/Prueba' element={
          <div className={!navVisible ? "page" : "page page-with-navbar"}>
            <Tabla />
          </div>
        } />
      </Routes>
      {shouldShowNavbar() && <Footer />}
    </div>
  );
}

function AppWrapper() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default AppWrapper;

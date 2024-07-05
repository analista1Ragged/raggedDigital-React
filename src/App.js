import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
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


function App() {
  const [navVisible, showNavbar] = useState(false);
  const location = useLocation();

  // Función para verificar si se debe mostrar el navbar
  const shouldShowNavbar = () => {
    return location.pathname !== '/Login';
  };

  return (
    <div className="App">
      {shouldShowNavbar() && <Navbar visible={navVisible} show={showNavbar} />}
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
          <div className={!navVisible ? "page" : "page page-with-navbar"}>
            <ReportePB />
          </div>
        } />
        <Route path='/ecommerce' element={
          <div className={!navVisible ? "page" : "page page-with-navbar"}>
          </div>
        } />
        <Route path='/ecommerce/Ragged' element={
          <div className={!navVisible ? "page" : "page page-with-navbar"}>
            <PaginaMtto />
          </div>
        } />
        <Route path='/ecommerce/Vtex' element={
          <div className={!navVisible ? "page" : "page page-with-navbar"}>
            <PaginaMtto />
          </div>
        } />
        <Route path='/ecommerce/VerCapsulas' element={
          <div className={!navVisible ? "page" : "page page-with-navbar"}>
            <TicketTable />
          </div>
        } />
        <Route path='/contabilidad' element={
          <div className={!navVisible ? "page" : "page page-with-navbar"}>
          </div>
        } />
        <Route path='/contabilidad/Planos' element={
          <div className={!navVisible ? "page" : "page page-with-navbar"}>
            <PaginaMtto />
          </div>
        } />
        <Route path='/contabilidad/Bancos' element={
          <div className={!navVisible ? "page" : "page page-with-navbar"}>
            <Bancos />
          </div>
        } />
        <Route path='/Settings' element={
          <div className={!navVisible ? "page" : "page page-with-navbar"}>
            <PaginaMtto />
          </div>
        } />
        <Route path='/layout' element={
          <div className={!navVisible ? "page" : "page page-with-navbar"}>
            <Layout />
          </div>
        } />
        <Route path='/CerrarSesion' element={
          <div className={!navVisible ? "page" : "page page-with-navbar"}>
          </div>
        } />
        <Route path='/MyMenu' element={
          <div className={!navVisible ? "page" : "page page-with-navbar"}>
          <MyMenu />
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
      <App />
    </BrowserRouter>
  );
}

export default AppWrapper;


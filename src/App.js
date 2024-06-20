import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import "./style/index.css";
import Home from './pages/Home';
import ReportePB from './pages/reportePB';
import PaginaMtto from './pages/paginaMtto';
import Login from "./components/login/login";

function App() {
  const [navVisible, showNavbar] = useState(false);
  const location = useLocation();

  return (
    <div className="App">
      {location.pathname !== '/Login' && <Navbar visible={navVisible} show={showNavbar} />}
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
        <Route path='/Settings' element={
          <div className={!navVisible ? "page" : "page page-with-navbar"}>
            <PaginaMtto />
          </div>
        } />
      </Routes>
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


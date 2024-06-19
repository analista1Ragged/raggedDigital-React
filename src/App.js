import React, {useState} from 'react';
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route,Navigate } from "react-router-dom";
import "./style/index.css";
import Home from './pages/Home';
import ReportePB from './pages/reportePB';
import PaginaMtto from './pages/paginaMtto';
import Login from "./components/login/login";
//export const urlApi = "http://localhost:3001/mahaloApi/api"

function App() {
	const [navVisible, showNavbar] = useState(false);

	return (
		<BrowserRouter >
			<div className="App">
				<Navbar visible={ navVisible } show={ showNavbar } />
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
					}/>
					<Route path='/analytics/Reporte' element={
						<div className={!navVisible ? "page" : "page page-with-navbar"}>
							<ReportePB />
						</div>
					}/>
					<Route path='/ecommerce' element={
						<div className={!navVisible ? "page" : "page page-with-navbar"}>
						</div>
					}/>
					<Route path='/ecommerce/Ragged' element={
						<div className={!navVisible ? "page" : "page page-with-navbar"}>
							<PaginaMtto />
						</div>
					}/>
					<Route path='/ecommerce/Vtex' element={
						<div className={!navVisible ? "page" : "page page-with-navbar"}>
							<PaginaMtto />
						</div>
					}/>
					<Route path='/ecommerce/VerCapsulas' element={
						<div className={!navVisible ? "page" : "page page-with-navbar"}>
						</div>
					}/>
					<Route path='/contabilidad' element={
						<div className={!navVisible ? "page" : "page page-with-navbar"}>
						</div>
					}/>
					<Route path='/contabilidad/Planos' element={
						<div className={!navVisible ? "page" : "page page-with-navbar"}>
							<PaginaMtto />
						</div>
					}/>
					<Route path='/Settings' element={
						<div className={!navVisible ? "page" : "page page-with-navbar"}>
							<PaginaMtto />
						</div>
					} />
				</Routes>
			</div>
		</BrowserRouter>
  );
}

export default App;

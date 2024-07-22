import React from 'react';
import { Routes } from 'react-router-dom';
import Footer from '../components/Footer/Footer';
//import Navbar from '../components/Navbar';
import MyMenu from '../components/MyMenu/MyMenu';


const Layout = () => {
    return (
      <>  
      <MyMenu/>
      <main>
        <Routes/> 
      </main>
      <Footer/>
      </>
    );
  }
  
  export default Layout;
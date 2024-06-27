import React from 'react';
import { Routes } from 'react-router-dom';
import Footer from '../components/Footer/Footer';


const Layout = () => {
    return (
      <>  
      <main>
        <Routes/> 
      </main>
      <Footer/>
      </>
    );
  }
  
  export default Layout;
import React from 'react';
import { useHistory } from 'react-router-dom'; // Asegúrate de estar usando react-router-dom

const CerrarSesion = () => {
  const history = useHistory();

  const handleLogout = () => {
    // Limpiar datos de sesión (puede ser localStorage, cookies, etc.)
    localStorage.removeItem('authToken'); // Ejemplo para token de autenticación en localStorage
    // Redireccionar a la página de login
    history.push('/login');
  };

  /*return (
    <button onClick={handleLogout}>
      Cerrar Sesión
    </button>
  );*/
};

export default CerrarSesion;

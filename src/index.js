import React from 'react';
import ReactDOM from 'react-dom/client';
import AppWrapper from './App';
import { AuthProvider } from './context/AuthContext'; // Importa el AuthProvider

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider> {/* Envuelve AppWrapper con AuthProvider */}
    <AppWrapper />
  </AuthProvider>
);




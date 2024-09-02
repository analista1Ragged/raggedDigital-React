import React from 'react';
import CampoTexto from '../components/CampoTexto/index'; // Importa el componente CampoTexto
import Boton from '../components/Boton/Boton';

const CambiarContraseña = () => {
  return (
    <div className="forgot-password-form">
      <form>

        <h2>Cambiar contraseña de acceso.</h2>

        <CampoTexto type="password" name="current_password" placeholder="Ingrese su contraseña actual:" required />
        <CampoTexto type="password" name="new_password" placeholder="Ingrese su nueva contraseña:" required />
        <CampoTexto type="password" name="confirm_new_password" placeholder="Confirme su nueva contraseña:" required />

        <Boton type="submit">Cambiar contraseña</Boton>
      </form>
    </div>
  );
};

export default CambiarContraseña;

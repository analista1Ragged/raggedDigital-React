import React from 'react';
import { Alert } from 'antd'; // Importa el componente de alerta de Ant Design
import "./AlertLoginExito.css";

function AlertLoginError() {
    return (
        <div>
            <Alert
                message="Error correo y/o usuario incorrectos"
                description="Verifique por favor los datos nuevamente."
                type="error"
                showIcon
            />
        </div>
    );
}

export default AlertLoginError;

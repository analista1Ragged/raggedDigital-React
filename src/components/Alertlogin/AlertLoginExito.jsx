import React from 'react';
import { Alert } from 'antd'; // Importa el componente de alerta de Ant Design
import "./AlertLoginExito.css";

function AlertLoginExito() {
    return (
        <div>
            <Alert
                message="¡Inicio de sesión exitoso!"
                //description="¡Bienvenido a Ragged Digital!"
                type="success"
                showIcon

            //Otras Alertas, para usarse se deben sacar a parte

            //<Alert
                //message="Informational Notes"
                //description="Additional description and informations about copywriting."
                //type="info"
                //showIcon
            //>

            //<Alert
                //message="Warning"
                //description="This is a warning notice about copywriting."
                //type="warning"
                //showIcon
            //>

            />
        </div>
    );
}

export default AlertLoginExito;

import React, { useState } from 'react';
import './CupoCliente.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import MultiSelector2 from '../../components/MultiSelector/MultiSelector2';
import CampoTexto from '../../components/CampoTexto/CampoTextoReferencia';
import BuscarButton from '../../components/BotonBuscar/BotonBuscar';


const CupoCliente = () => {
  const [valorCampo, setValorCampo] = useState('');
  
  // Arreglo con los encabezados de la tabla
  const headers = [
    "#", 
    "Cedula", 
    "Nombre", 
    "Apellidos", 
    "Email", 
    "Dirección", 
    "Sucursal", 
    "Cod_condición_Pago", 
    "Cod_de_Pago", 
    "Cupo_Asignado", 
    "Total_Deuda", 
    "Disponible", 
    "Bloqueado"
  ];

  return (
    <section>
      <div className="ticket-table">
        <h2>
          <a href="/RaggedDigital/Home" className="left" title="volver">
            <i className="bi bi-arrow-left-circle"></i>
          </a>
          {'  '} Consultar Cupo Clientes
        </h2>
        <form className="container">
          <div className="container">
            <div className="multi-selector">
              <div className="row">
                <div className="col">
                  <div className="inline-components2">
                    <CampoTexto
                      placeholder="Ingrese Cedula:"
                      //value="" 
                      //onChange=""
                    />
                    <BuscarButton 
                      //onClick=""
                      className="component-item" 
                    /> 
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
        <div className="tabla-container">
          <div className="tabla-scroll">
            <table className="table table-striped table-hover ticket-table">
              <thead>
                <tr>
                  {headers.map((header, index) => (
                    <th scope="col" key={index}>{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>1026130339</td>
                  <td>Elizabeth</td>
                  <td>Zapata</td>
                  <td>elizazq</td>
                  <td>Cra 49</td>
                  <td>001</td>
                  <td>011</td>
                  <td>Contado 1 dia</td>
                  <td>$0</td>
                  <td>$0</td>
                  <td>$0</td>
                  <td>NO</td>               
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CupoCliente;




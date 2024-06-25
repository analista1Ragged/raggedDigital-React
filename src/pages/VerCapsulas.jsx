import React from 'react';
import "./VerCapsulas.css"
import FilterRow from "../components/FilterRow/FilterRow"
import FormBuscar from "../components/FormBuscar/FormBuscar"
import 'bootstrap-icons/font/bootstrap-icons.css';


const TicketTable = ({/* tickets */}) => {
  
  return (
    <section>
    <div className="ticket-table">
      <h2>
        <a href="/home" class="left" title="Volver"><i class="bi bi-arrow-left-circle"></i></a>
        {'  '}
        Buscar Productos
      </h2>
      <FormBuscar/>
      <table>
        <thead>
          <tr className="color">
            <th>#</th>
            <th>Referencia</th>
            <th>Descripción</th>
            <th>Categoria</th>
            <th>Estado</th>
          </tr>
          <FilterRow/> 
        </thead>
        <tbody>
          {/*tickets.map(ticket => (
            <tr key={ticket.id}>
              <td>{ticket.id}</td>
              <td>{ticket.title}</td>
              <td>{ticket.status}</td>
              <td>{ticket.assignedTo}</td>
              <td>{new Date(ticket.createdAt).toLocaleString()}</td>
            </tr>
          ))*/}          
            <tr>
              <td>1</td>
              <td>PF51100003</td>
              <td>BODY TIRAS ESCOTE ESPALDA</td>
              <td>BODY</td>
              <td>SIN CARGAR</td>
            </tr>               
        </tbody>
      </table>
    </div>
    </section>
  );
};

export default TicketTable;
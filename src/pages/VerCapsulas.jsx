import React from 'react';
import "./VerCapsulas.css"


const TicketTable = ({/* tickets */}) => {
  return (
    <div className="ticket-table">
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Referencia</th>
            <th>Descripción</th>
            <th>Categoria</th>
            <th>Estado</th>
          </tr>
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
  );
};

export default TicketTable;
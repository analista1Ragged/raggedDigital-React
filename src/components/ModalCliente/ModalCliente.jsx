import React from 'react';
import { Modal } from 'antd';
import "./ModalCliente.css";

const ModalCupoCliente = ({ modal2Visible, setModal2Visible, modalData2 = [] }) => {
  const campos = [
    { label: "Documento", indice: 2 },
    { label: "Nombre", indice: 3 },
    { label: "Apellidos", indice: 4 },
    { label: "Email", indice: 5 },
    { label: "Dirección", indice: 6 },
    { label: "Sucursal", indice: 7 },
    { label: "Condición de Pago", indice: 9 },
    { label: "Cupo Asignado", indice: 10 },
    { label: "Total Deuda", indice: 11 },
    { label: "Cupo Disponible", indice: 12 },
    { label: "Bloqueado", indice: 13 }
  ];

  const renderDetalleCliente = () => {
    if (!Array.isArray(modalData2)) {  // Aquí se corrigió el paréntesis faltante
      console.error('modalData2 no es un arreglo');
      return <p>No hay datos del cliente para mostrar</p>;
    }

    if (modalData2.length === 0) {
      return <p>No hay datos del cliente para mostrar</p>;
    }

    return modalData2.map((detalle, index) => (
      <div key={detalle.id || index} className="documento-container">
        <h3 className="documento-title"><b><u>Sucursal</u> {index + 1}:</b></h3>
        <div className="documento-grid">
          {campos.map((campo, i) => {
            const valor = detalle[campo.indice];
            const valorFormateado = campo.formatter 
              ? campo.formatter(valor) 
              : valor || 'N/A';

            return (
              <div className="documento-row" key={`${detalle.id || index}-${i}`}>
                <span className="documento-label"><strong>{campo.label}:</strong></span>
                <span className="documento-value">{valorFormateado}</span>
              </div>
            );
          })}
        </div>
        {index < modalData2.length - 1 && <hr className="documento-divider" />}
      </div>
    ));
  };

  return (
    <Modal
      title="Detalle Cupo Cliente"
      style={{ top: 20 }}
      open={modal2Visible}
      onOk={() => setModal2Visible(false)}
      onCancel={() => setModal2Visible(false)}
      footer={null}
      className="modal-with-title-line"
      width={600}
    >    
      {renderDetalleCliente()}
    </Modal>
  );
};

export default ModalCupoCliente;
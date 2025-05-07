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
    { label: "Cupo Asignado", indice: 10,},
    { label: "Total Deuda", indice: 11,},
    { label: "Cupo Disponible", indice: 12,},
    { label: "Bloqueado", indice: 13,}
  ];

  const renderDetalleCliente = () => {
    if (!modalData2.length) return <p>No hay datos del cliente para mostrar</p>;

    return modalData2.map((detalle, index) => (
      <div key={index} className="detalle-grid-container">
        {index > 0 && <hr />}
        {campos.map((campo, i) => {
          const valor = detalle[campo.indice];
          const valorFormateado = campo.formatter 
            ? campo.formatter(valor)
            : valor || 'N/A';
          
          return (
            <div className="grid-row" key={`${index}-${i}`}>
              <div className="grid-label">
                <strong>{campo.label}:</strong>
              </div>
              <div className="grid-value">
                {valorFormateado}
              </div>
            </div>
          );
        })}
      </div>
    ));
  };

  return (
    <Modal
      title="Detalle Cupo Cliente"
      visible={modal2Visible}
      onOk={() => setModal2Visible(false)}
      onCancel={() => setModal2Visible(false)}
      footer={null}
      width={600}
      className="modal-with-title-line"  /* Opcional: si quieres una clase específica */
    >    
      {renderDetalleCliente()}
    </Modal>
  );
};

export default ModalCupoCliente;
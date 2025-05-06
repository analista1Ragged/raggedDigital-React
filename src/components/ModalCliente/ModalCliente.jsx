import React from 'react';
import { Modal } from 'antd';

const ModalCupoCliente = ({ modal2Visible, setModal2Visible, modalData2 = [] }) => {
  return (
    <Modal
      title="Detalle Cupo Cliente"
      visible={modal2Visible}
      onOk={() => setModal2Visible(false)}
      onCancel={() => setModal2Visible(false)}
      footer={null}
      width={40}
    >
      {modalData2.length > 0 ? (
        modalData2.map((detalle, index) => (
          <div key={index}>
            <hr />
            {index > 0 && <hr />}
            
            <p><strong>Documento:</strong> {detalle[0]}</p>
            <p>Nombre: {detalle[3]}</p>
            <p>Apellidos: {detalle[4]}</p>
            <p>Email: {detalle[5]}</p>
            <p>Dirección: {detalle[6]}</p>
            <p>Sucursal: {detalle[7]}</p>
            <p>Cod. Condición de Pago: {detalle[8]}</p>
            <p>Condición de Pago: {detalle[9]}</p>
            <p>Cupo Asignado: {detalle[10]}</p>
            <p>Total Deuda: {detalle[11]}</p>
            <p>Cupo Disponible: {detalle[12]}</p>
            <p>Bloqueado: {detalle[13]}</p>
          </div>
        ))
      ) : (
        <p>No hay datos del cliente para mostrar</p>
      )}
    </Modal>
  );
};

export default ModalCupoCliente;
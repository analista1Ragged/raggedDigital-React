import React from 'react';
import { Modal } from 'antd';

const ModalCartera = ({ modal1Visible, setModal1Visible, modalData = [] }) => {
  return (
    <Modal
      title="Detalle Nota Credito."
      style={{ top: 20 }}
      open={modal1Visible}
      onOk={() => setModal1Visible(false)}
      onCancel={() => setModal1Visible(false)}
    >
      {modalData.length > 0 ? (
        modalData.map((detalle, index) => (
          <div key={index}>
            <hr />
            <h3><b>{detalle[0]}</b></h3>
            <p>Fecha Nota Credito: {new Date(detalle[2]).toLocaleDateString()}</p>
            <p>Numero Nota Credito: {detalle[1]}</p>
            <p>Valor Nota Credito: {detalle[3]}</p>
          </div>
        ))
      ) : (
        <p>No hay datos para mostrar</p>
      )}
    </Modal>
  );
};

export default ModalCartera;

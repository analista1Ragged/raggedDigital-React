import React from 'react';
import { Modal } from 'antd';
import "./ModalMenu.css"; // Asegúrate de crear este archivo CSS

const ModalCartera = ({ modal1Visible, setModal1Visible, modalData = [] }) => {
  return (
    <Modal
      title="Detalle de documentos:"
      style={{ top: 20 }}
      open={modal1Visible}
      onOk={() => setModal1Visible(false)}
      onCancel={() => setModal1Visible(false)}
      footer={null}
      className="modal-with-title-line"
      width={400}
    >
      {modalData.length > 0 ? (
        modalData.map((detalle, index) => (
          <div key={index} className="documento-container">
            <h3 className="documento-title"><b>{detalle[0]}</b></h3>
            <div className="documento-grid">
              <div className="documento-row">
                <span className="documento-label"><strong>Fecha documento:</strong></span>
                <span className="documento-value">{new Date(detalle[2]).toLocaleDateString()}</span>
              </div>
              <div className="documento-row">
                <span className="documento-label"><strong>Numero documento:</strong></span>
                <span className="documento-value">{detalle[1]}</span>
              </div>
              <div className="documento-row">
                <span className="documento-label"><strong>Valor documento:</strong></span>
                <span className="documento-value">{detalle[3]}</span>
              </div>
            </div>
            {index < modalData.length - 1 && <hr className="documento-divider" />}
          </div>
        ))
      ) : (
        <p>No hay datos para mostrar</p>
      )}
    </Modal>
  );
};

export default ModalCartera;

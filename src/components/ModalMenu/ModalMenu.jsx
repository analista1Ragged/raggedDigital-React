import React from 'react';
import { Modal } from 'antd';

const ModalCartera = ({ modal1Visible, setModal1Visible }) => {
  return (
    <Modal
      title="Detalle Nota Credito."
      
      style={{ top: 20 }}
      visible={modal1Visible}
      onOk={() => setModal1Visible(false)}
      onCancel={() => setModal1Visible(false)}
    > <hr />
      <p>Fecha Nota Credito:</p>
      <p>Numero Nota Credito:</p>
      <p>Valor Nota Credito</p>
      <hr />
      <p>Fecha Nota Credito:</p>
      <p>Numero Nota Credito:</p>
      <p>Valor Nota Credito</p>
      <hr />
    </Modal>
  );
};

export default ModalCartera;


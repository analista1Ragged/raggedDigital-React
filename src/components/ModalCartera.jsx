import React, { useState } from 'react';
import { Button, Modal } from 'antd';

const ModalCartera = () => {
  const [modal1Visible, setModal1Visible] = useState(false);

  return (
    <div id="components-modal-demo-position">
      <Button type="primary" onClick={() => setModal1Visible(true)}>
        Display a modal dialog at 20px to Top
      </Button>
      <Modal
        title="20px to Top"
        style={{ top: 20 }}
        open={modal1Visible}
        onOk={() => setModal1Visible(false)}
        onCancel={() => setModal1Visible(false)}
      >
        <p>some contents...</p>
        <p>some contents...</p>
        <p>some contents...</p>
      </Modal>
      <br />
      <br />
    </div>
  );
};

export default ModalCartera;

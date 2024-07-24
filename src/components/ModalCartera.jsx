import React from 'react';
import { OverlayTrigger, Popover, Tooltip } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const ModalCartera = () => {
  return (
    <div className="modal-body">
      <h5>Popover in a modal</h5>
      <OverlayTrigger
        trigger="click"
        placement="right"
        overlay={
          <Popover id="popover-basic">
            <Popover.Header as="h3">Popover title</Popover.Header>
            <Popover.Body>
              Popover body content is set in this attribute.
            </Popover.Body>
          </Popover>
        }
      >
        <a href="#" role="button" className="btn btn-secondary popover-test">
          button
        </a>
      </OverlayTrigger>
      <hr />
      <h5>Tooltips in a modal</h5>
      <OverlayTrigger
        placement="top"
        overlay={<Tooltip id="tooltip-basic">Tooltip</Tooltip>}
      >
        <a href="#" className="tooltip-test">
          This link
        </a>
      </OverlayTrigger>
      <OverlayTrigger
        placement="top"
        overlay={<Tooltip id="tooltip-basic">Tooltip</Tooltip>}
      >
        <a href="#" className="tooltip-test">
          that link
        </a>
      </OverlayTrigger>
    </div>
  );
};

export default ModalCartera;

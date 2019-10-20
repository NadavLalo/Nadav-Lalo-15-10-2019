import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const modal = props => (
  <Modal show={props.show} onHide={props.onHide}>
    <Modal.Body>
      <p className="text-center">Search input only in English</p>
    </Modal.Body>

    <Modal.Footer>
      <Button variant="secondary" onClick={props.close}>
        Close
      </Button>
    </Modal.Footer>
  </Modal>
);

export default modal;

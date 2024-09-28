import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const DataModal = ({ show, handleClose, data }) => {
  if (!data) return null;

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>마커 정보</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          닫기
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DataModal;
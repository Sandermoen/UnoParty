import React from 'react';

import Modal from 'react-bootstrap/Modal';

import CreateGameForm from '../createGameForm/createGameForm';

const CreateGameModal = ({ handleShow, handleHide }) => {
  return (
    <Modal centered show={handleShow} onHide={handleHide}>
      <Modal.Header closeButton>
        <Modal.Title>Create Game</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <CreateGameForm />
      </Modal.Body>
    </Modal>
  );
};

export default CreateGameModal;

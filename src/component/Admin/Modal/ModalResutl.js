import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import _ from 'lodash'
const ModalResutl = (props) => {
    const { show, setShow, dataModalResult } = props
    const handleClose = () => {
        setShow(false)
    }

    return (
        <>
            <Modal show={show}
                onHide={handleClose}
                size="md"
                className='modal-delete-user'>

                <Modal.Header closeButton>
                    <Modal.Title>Result</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <span>
                            Total Question: <b>{dataModalResult.countTotal}</b>
                        </span>
                    </div>
                    <div>
                        <span>
                            Total Correct answers: <b>{dataModalResult.countCorrect}</b>
                        </span>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        Show answers
                    </Button>
                    <Button variant="secondary" onClick={handleClose}
                    >
                        close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalResutl
import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { deleteQuiz } from '../../../services/apiService'
import { toast } from 'react-toastify';
import _ from 'lodash'
const ModalDeleteQuiz = (props) => {
    const { show, setShow, quizDelete, fetchAllQuiz } = props
    const handleClose = () => {
        setShow(false)
    }
    const handleDeletequiz = async () => {
        let data = await deleteQuiz(quizDelete.id)
        if (data && data.EC === 0) {
            toast.success(data.EM)
            fetchAllQuiz()
            handleClose()
        } else {
            toast.error(data.EM)
        }
    }


    return (
        <>
            <Modal show={show}
                onHide={handleClose}
                size="md"
                className='modal-delete-user'>

                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete the Quiz</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure delete Quiz name: <b>{quizDelete && quizDelete.name}</b>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        No
                    </Button>
                    <Button variant="primary"
                        onClick={() => handleDeletequiz()}
                    >
                        Yes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalDeleteQuiz
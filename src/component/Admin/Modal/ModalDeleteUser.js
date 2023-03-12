import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { deleteUser } from '../../../services/apiService'
import { toast } from 'react-toastify';
import _ from 'lodash'
const ModalDeleteUser = (props) => {
    const { show, setShow, dataDelete, fetchUserPaginate } = props
    const handleClose = () => {
        setShow(false)
    }
    const handleDeleteUser = async () => {
        let data = await deleteUser(dataDelete.id)
        // console.log(dataDelete);
        if (data && data.EC === 0) {
            toast.success(data.EM)
            handleClose()
            props.setCurrentPage(1)
            await fetchUserPaginate(1)
        }
        else if (data && data.EC !== 0) {
            toast.error(data.EM)
        }
    }
    // const handleKeyDown = (e) => {
    //     if (e.keyCode === 13) {
    //         handleDeleteUser()
    //     }
    // };
    return (
        <>
            <Modal show={show}
                onHide={handleClose}
                size="md"
                className='modal-delete-user'>

                <Modal.Header closeButton>
                    <Modal.Title>Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure delete user: <b>{dataDelete && dataDelete.email ? dataDelete.email : ''}</b>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        No
                    </Button>
                    <Button variant="primary"
                        onClick={() => handleDeleteUser()}
                    >
                        Yes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalDeleteUser
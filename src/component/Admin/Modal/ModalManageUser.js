import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FcPlus } from 'react-icons/fc'
const ModalManageUser = () => {
    const [show, setShow] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userName, setUserName] = useState("");
    const [role, setRole] = useState("USER");
    const [image, setImage] = useState("");
    const [previewImage, setPreviewImage] = useState("");

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleUploadImage = (e) => {
        if (e.target && e.target.files && e.target.files[0]) {
            setPreviewImage(URL.createObjectURL(e.target.files[0]))
            setImage(e.target.files[0])
        } else {

        }

    }
    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Add new
            </Button>

            <Modal show={show} onHide={handleClose} size="lg" className='modal-add-user'>
                <Modal.Header closeButton>
                    <Modal.Title>Add new user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="row mb-3">
                            <div className="form-group col-md-6">
                                <label>Email</label>
                                <input type="email" className="form-control" placeholder="Email" value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="form-group col-md-6">
                                <label>Password</label>
                                <input type="password" className="form-control" placeholder="Password" value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="form-group col-md-6">
                                <label>UserName</label>
                                <input type="text" className="form-control" placeholder="UserName" value={userName}
                                    onChange={(e) => setUserName(e.target.value)}
                                />
                            </div>

                            <div className="form-group col-md-6">
                                <label>Role</label>
                                <select className="form-control" onChange={(e) => setRole(e.target.value)}>
                                    <option value='USER'>USER</option>
                                    <option value='ADMIN'>ADMIN</option>
                                </select>
                            </div>
                        </div>

                        <div className='form-group col-md-12'>
                            <label className='upload-file' htmlFor='labelUpload'><FcPlus />Upload file</label>
                            <input type='file' id="labelUpload" hidden
                                onChange={(e) => handleUploadImage(e)} />
                        </div>
                        <div className='preview col-md-3'>
                            {previewImage ?
                                <div className='preview-image' style={{ backgroundImage: `url(${previewImage})` }}></div> :
                                <span>Preview image</span>
                            }
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalManageUser
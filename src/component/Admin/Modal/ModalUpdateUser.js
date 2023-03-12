import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FcPlus } from 'react-icons/fc'
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai'
import { toast } from 'react-toastify';
import _ from 'lodash'
const ModalManageUser = (props) => {
    const { show, setShow, dataUpdate } = props
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userName, setUserName] = useState("");
    const [role, setRole] = useState("USER");
    const [image, setImage] = useState("");
    const [previewImage, setPreviewImage] = useState("");
    const [showHidePassword, setShowHidePassword] = useState(false)

    useEffect(() => {
        if (!_.isEmpty(dataUpdate)) {
            setEmail(dataUpdate.email)
            setPassword('')
            setUserName(dataUpdate.userName)
            setRole(dataUpdate.role)
            setImage(dataUpdate.image)
            if (dataUpdate.image) {
                setPreviewImage(`data:image/jpeg;base64,${dataUpdate.image}`)
            }
        }
    }, [dataUpdate])

    const handleClose = () => {
        setShow(false)
        setEmail("")
        setPassword("")
        setUserName("")
        setRole("USER")
        setImage("")
        setPreviewImage("")
    }

    const handleUploadImage = (e) => {
        if (e.target && e.target.files && e.target.files[0]) {
            setPreviewImage(URL.createObjectURL(e.target.files[0]))
            setImage(e.target.files[0])
        } else {

        }

    }







    return (
        <>
            <Modal show={show} onHide={handleClose} size="lg" className='modal-add-user'>
                <Modal.Header closeButton>
                    <Modal.Title>Update user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="row mb-3">
                            <div className="form-group col-md-6">
                                <label>Email</label>
                                <input type="email" className="form-control" placeholder="Email" value={email}
                                    disabled
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="form-group col-md-6">
                                <label>Password</label>
                                <div className='password'>
                                    <input
                                        type={showHidePassword === false ? "password" : "text"}
                                        className="form-control"
                                        placeholder="Password"
                                        value={password}
                                        disabled
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <span
                                        className='show-hide-password'
                                        onClick={() => setShowHidePassword(!showHidePassword)}
                                    >{showHidePassword === false ? <AiFillEye /> : <AiFillEyeInvisible />}
                                    </span>
                                </div>
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
                    <Button variant="primary" >
                        Update
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalManageUser
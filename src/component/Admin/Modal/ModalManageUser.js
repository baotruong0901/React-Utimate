import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FcPlus } from 'react-icons/fc'
import axios from 'axios';
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai'
import { toast } from 'react-toastify';
import { postCreateNewUser } from '../../../services/apiService'
const ModalManageUser = (props) => {
    const { show, setShow } = props
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userName, setUserName] = useState("");
    const [role, setRole] = useState("USER");
    const [image, setImage] = useState("");
    const [previewImage, setPreviewImage] = useState("");
    const [showHidePassword, setShowHidePassword] = useState(false)

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

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };
    const validatePassword = (password) => {
        return String(password)
            .match(
                /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
            );
    };


    const handleSubmitCreateUser = async () => {
        // validate
        const isValidEmail = validateEmail(email)
        const isValidatePassword = validatePassword(password)
        if (!isValidEmail) {
            toast.error('Invalid email!')
            return
        }

        if (!password) {
            toast.error('Password cannot be left blank!')
            return
        }
        if (!isValidatePassword) {
            toast.error('Minimum eight characters, at least one letter and one number!')
            return
        }

        let data = await postCreateNewUser(email, password, userName, role, image)
        console.log("check res: ", data);
        if (data && data.EC === 0) {
            toast.success(data.EM)
            handleClose()
        }
        else if (data && data.EC !== 0) {
            toast.error(data.EM)
        }
    }
    return (
        <>
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
                                <div className='password'>
                                    <input
                                        type={showHidePassword === false ? "password" : "text"}
                                        className="form-control"
                                        placeholder="Password"
                                        value={password}
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
                    <Button variant="primary" onClick={handleSubmitCreateUser}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalManageUser
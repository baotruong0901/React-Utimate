import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Select from 'react-select';
import { FcPlus } from 'react-icons/fc'
import './ModalManageQuiz.scss'
import { useState } from 'react';

const options = [
    { value: 'EASY', label: 'EASY' },
    { value: 'MEDIUM', label: 'MEDIUM' },
    { value: 'HARD', label: 'HARD' },
];
const ModalManageQuiz = (props) => {
    const { show, setShow } = props
    const [image, setImage] = useState("");
    const [previewImage, setPreviewImage] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [type, setType] = useState("EASY");

    const handleClose = () => {
        setShow(false)
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
                    <Modal.Title>Manage Quizzes</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className='form-add-quiz'>
                        <fieldset className="border rounded-3 p-3">
                            <legend className="float-none w-auto px-3">Add new quiz:</legend>
                            <div className="form-floating mb-3">
                                <input type="text"
                                    className="form-control"
                                    placeholder="Quiz name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                                <label>Quiz name</label>
                            </div>
                            <div className="form-floating">
                                <input type="text"
                                    className="form-control"
                                    placeholder="Description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                                <label>Description</label>
                            </div>
                            <Select className='my-3'
                                value={type}
                                // onChange={(e)=>handleChange(e)}
                                options={options}
                            />
                            <div className='form-group col-md-12'>
                                <label className='upload-file' htmlFor='labelUpload'><FcPlus />Upload image</label>
                                <input type='file' id="labelUpload" hidden
                                    onChange={(e) => handleUploadImage(e)} />
                            </div>
                            <div className='preview col-md-3'>
                                {previewImage ?
                                    <div className='preview-image' style={{ backgroundImage: `url(${previewImage})` }}></div> :
                                    <span>Preview image</span>
                                }
                            </div>
                        </fieldset>
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
            </Modal></>
    )
}
export default ModalManageQuiz
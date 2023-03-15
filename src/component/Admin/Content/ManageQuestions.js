import Select from 'react-select'
import { BiImageAdd } from 'react-icons/bi'
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from 'react-icons/ai'

import './ManageQuestions.scss'
import { useState } from 'react';

const ManageQuetions = (props) => {
    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' },
    ];
    const [select, setSelect] = useState({})
    const [description, setDescription] = useState('')
    const [image, setImage] = useState("");
    const [previewImage, setPreviewImage] = useState("");
    const [questions, setQuestions] = useState([
        {
            id: '',
            description: '',
            image: '',
            answers: [
                {}
            ]
        }
    ])
    const handleCreateQuestions = () => {

    }
    const handleUploadImage = (e) => {
        if (e.target && e.target.files && e.target.files[0]) {
            setPreviewImage(URL.createObjectURL(e.target.files[0]))
            setImage(e.target.files[0])
        }
    }

    return (
        <div className="manage-questions-container">
            <div className="title">
                Manage Quiz
            </div>
            <hr />
            <div className="questions-content">
                <div className="add-new">
                    <span><b>Select Quiz:</b></span>
                    <Select
                        className='col-5'
                        defaultValue={select}
                        onChange={setSelect}
                        options={options}
                    />
                    <div className='mt-3'><b>Add questions:</b></div>
                    <div className='questions mb-1'>
                        <div className="form-floating col-md-5 mb-3">
                            <input type="text"
                                className='form-control'
                                placeholder="Description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                            <label>Description</label>
                        </div>

                        <div className='form-group file col-md-4'>
                            <label className='upload-file' htmlFor='labelUpload'><BiImageAdd size={'2em'} color={'aqua'} />Upload image</label>
                            <input type='file' hidden id='labelUpload'
                                onChange={(e) => handleUploadImage(e)} />
                        </div>
                        <div className='preview col-md-2'>
                            {previewImage ?
                                <div className='preview-image'><span>1 file</span></div>
                                :
                                <span>no file</span>
                            }
                        </div>
                        <div className='icons'>
                            <AiOutlinePlusCircle className='add' />
                            <AiOutlineMinusCircle className='remove' />

                        </div>
                    </div>
                    <div className='answers my-3'>
                        <input
                            className="form-check-input"
                            type="checkbox"
                        />
                        <div className="form-floating answer-item">
                            <input type="text"
                                className='form-control'
                                placeholder="Description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                            <label>Answer 1:</label>
                        </div>
                        <div className='icons'>
                            <AiOutlinePlusCircle className='add' />
                            <AiOutlineMinusCircle className='remove' />
                        </div>
                    </div>
                    <div className='answers'>
                        <input
                            className="form-check-input"
                            type="checkbox"
                        />
                        <div className="form-floating answer-item">
                            <input type="text"
                                className='form-control'
                                placeholder="Description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                            <label>Answer 1:</label>
                        </div>
                        <div className='icons'>
                            <AiOutlinePlusCircle className='add' />
                            <AiOutlineMinusCircle className='remove' />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default ManageQuetions
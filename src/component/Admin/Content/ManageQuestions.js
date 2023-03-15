import Select from 'react-select'
import { BiImageAdd } from 'react-icons/bi'
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from 'react-icons/ai'
import { v4 as uuidv4 } from 'uuid'
import { getAllQuizForAdmin, postCreateNewAnswer, postCreateNewQuestionsForQuiz } from '../../../services/apiService'
import './ManageQuestions.scss'
import { useContext, useEffect, useState } from 'react';
import _ from 'lodash'
import { toast } from 'react-toastify'
import Accordion from 'react-bootstrap/Accordion';


const ManageQuetions = (props) => {

    const initQuestions = [
        {
            id: uuidv4(),
            description: '',
            isValidQuestions: true,
            file: '',
            fileName: '',
            answers: [
                {
                    id: uuidv4(),
                    description: '',
                    isCorrect: false,
                    isValidAnswer: true
                }
            ]
        }
    ]

    const [questions, setQuestions] = useState(initQuestions)
    const [listQuiz, setListQuiz] = useState([])
    const [select, setSelect] = useState(null)

    useEffect(() => {
        fetchAllQuiz()
    }, [])

    const fetchAllQuiz = async () => {
        let data = await getAllQuizForAdmin()
        if (data && data.EC === 0) {
            let newListQuiz = data.DT.map((item, index) => {
                return {
                    value: item.id,
                    label: `${item.id}-${item.name}`
                }
            })
            setListQuiz(newListQuiz)
        }
    }

    const handleUploadFile = (questionId, e) => {
        let questionsClone = _.cloneDeep(questions)
        let index = questionsClone.findIndex(item => item.id === questionId)
        if (index > -1) {
            questionsClone[index].file = e.target.files[0]
            questionsClone[index].fileName = e.target.files[0].name
        }
        setQuestions(questionsClone)

    }

    const handleAddRemoveQuestion = (type, questionId) => {
        if (type === 'ADD') {
            const newQuestion = {
                id: uuidv4(),
                description: '',
                isValidQuestions: true,
                file: '',
                fileName: '',
                answers: [
                    {
                        id: uuidv4(),
                        description: '',
                        isCorrect: false,
                        isValidAnswer: true
                    }
                ]
            }
            setQuestions([...questions, newQuestion])
        }
        if (type === 'REMOVE') {
            let questionsClone = _.cloneDeep(questions)
            questionsClone = questionsClone.filter(item => item.id !== questionId)
            setQuestions(questionsClone)
        }
    }

    const handleAddRomoveAnswer = (type, questionId, answerId) => {
        let questionsClone = _.cloneDeep(questions)
        if (type === 'ADD') {
            const newAnswer =
            {
                id: uuidv4(),
                description: '',
                isCorrect: false,
                isValidAnswer: true
            }
            let index = questionsClone.findIndex(item => item.id === questionId)
            questionsClone[index].answers.push(newAnswer)
            setQuestions(questionsClone)
        }
        if (type === 'REMOVE') {
            let index = questionsClone.findIndex(item => item.id === questionId)
            questionsClone[index].answers =
                questionsClone[index].answers.filter(item => item.id !== answerId)
            setQuestions(questionsClone)
        }
    }

    const handleOnChange = (type, questionId, value) => {
        if (type === 'QUESTION') {
            let questionsClone = _.cloneDeep(questions)
            let index = questionsClone.findIndex(item => item.id === questionId)
            if (index > -1) {
                questionsClone[index].description = value
                questionsClone[index].isValidQuestions = true
                setQuestions(questionsClone)
            }
        }
    }

    const handleAnswerQuestion = (type, questionId, answerId, value) => {
        let questionsClone = _.cloneDeep(questions)
        let index = questionsClone.findIndex(item => item.id === questionId)
        if (index > -1) {
            questionsClone[index].answers =
                questionsClone[index].answers.map(item => {
                    if (item.id === answerId) {
                        if (type === 'CHECKBOX') {
                            item.isCorrect = value
                        }
                        if (type === 'INPUT') {
                            item.description = value
                            item.isValidAnswer = true
                        }
                    }
                    return item

                })
            setQuestions(questionsClone)
        }
    }



    const handleSubmit = async () => {
        //validate select quiz
        if (_.isEmpty(select)) {
            toast.error('Please select a Quiz!')
            return
        }

        //validate isEmpty questions description
        let isValidQ = true
        let questionsClone = _.cloneDeep(questions)
        for (let i = 0; i < questionsClone.length; i++) {
            if (!questionsClone[i].description) {
                questionsClone[i].isValidQuestions = false
                isValidQ = false
                setQuestions(questionsClone)
            }
        }

        //validate isEmpty answers description
        let isValidA = true
        for (let i = 0; i < questionsClone.length; i++) {
            for (let j = 0; j < questionsClone[i].answers.length; j++) {
                if (!questionsClone[i].answers[j].description) {
                    questionsClone[i].answers[j].isValidAnswer = false
                    isValidA = false
                    setQuestions(questionsClone)
                }
            }
        }

        if (isValidQ === false || isValidA === false) {
            toast.error(`Not empty Questions/Answers!`)
            console.log(questions);
            return
        }

        //submit questions
        for (const question of questions) {
            const questionQuiz = await postCreateNewQuestionsForQuiz(select.value, question.description, question.file)
            // submit answers
            for (const answer of question.answers) {
                await postCreateNewAnswer(answer.description, answer.isCorrect, questionQuiz.DT.id)
            }
        }
        toast.success(`Create Question's succeed!`)
        setQuestions(initQuestions)
        setSelect(null)



        // await Promise.all(questions.map(async (item) => {
        //     const question = await postCreateNewQuestionsForQuiz(select.value, item.description, item.file)
        //     //submit answers
        //     await Promise.all(item.answers.map(async (answer) => {
        //         await postCreateNewAnswer(answer.description, answer.isCorrect, question.DT.id)
        //     }))
        // }))
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
                        options={listQuiz}
                    />
                    <div className='toggle-question'>
                        <Accordion defaultActiveKey="0" alwaysOpen={false}>
                            <Accordion.Item eventKey="1" className='my-3'>
                                <Accordion.Header className='col-5'><div><b>Add questions:</b></div></Accordion.Header>
                                <Accordion.Body>
                                    {questions && questions.length > 0 && questions.map((item, index) => {
                                        return (
                                            <>
                                                <div className='q-main my-3' key={item.id}>
                                                    <div className='questions mb-1'>
                                                        <div className="form-floating col-md-5 mb-2">
                                                            <input type="text"
                                                                className={item.isValidQuestions ? 'form-control' : 'form-control is-invalid'}
                                                                placeholder="Description"
                                                                value={item.description}

                                                                onChange={(e) => handleOnChange('QUESTION', item.id, e.target.value)}
                                                            />
                                                            <label>Question {index + 1} Description...</label>
                                                        </div>

                                                        <div className='form-group file col-md-4'>
                                                            <label className='upload-file' htmlFor={`${item.id}`}><BiImageAdd size={'2em'} color={'aqua'} />Upload file</label>
                                                            <input type='file' hidden id={`${item.id}`}
                                                                onChange={(e) => handleUploadFile(item.id, e)} />
                                                        </div>
                                                        <div className='preview col-md-2'>
                                                            <div className='preview-file'>
                                                                <span>
                                                                    {item.fileName ? item.fileName : 'no file is uploadded'}
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div className='icons'>
                                                            <AiOutlinePlusCircle className='add'
                                                                onClick={() => handleAddRemoveQuestion('ADD', '')}
                                                            />
                                                            {questions.length > 1 &&
                                                                <AiOutlineMinusCircle
                                                                    className='remove'
                                                                    onClick={() => handleAddRemoveQuestion('REMOVE', item.id)}
                                                                />
                                                            }
                                                        </div>
                                                    </div>
                                                    {item.answers && item.answers.length > 0 && item.answers.map((answer, index) => {
                                                        return (
                                                            <div className='answers my-2' key={answer.id}>
                                                                <input
                                                                    className="form-check-input"
                                                                    type="checkbox"
                                                                    defaultChecked={answer.isCorrect}
                                                                    onChange={(e) => handleAnswerQuestion('CHECKBOX', item.id, answer.id, e.target.checked)}
                                                                />
                                                                <div className="form-floating answer-item">
                                                                    <input type="text"
                                                                        className={answer.isValidAnswer ? 'form-control' : 'form-control is-invalid'}
                                                                        placeholder="Description"
                                                                        defaultValue={answer.description}
                                                                        onChange={(e) => handleAnswerQuestion('INPUT', item.id, answer.id, e.target.value)}
                                                                    />
                                                                    <label>Answer {index + 1}:</label>
                                                                </div>
                                                                <div className='icons'>
                                                                    <AiOutlinePlusCircle
                                                                        className='add'
                                                                        onClick={() => handleAddRomoveAnswer('ADD', item.id, '')}
                                                                    />
                                                                    {item.answers.length > 1 &&
                                                                        < AiOutlineMinusCircle
                                                                            className='remove'
                                                                            onClick={() => handleAddRomoveAnswer('REMOVE', item.id, answer.id)}
                                                                        />
                                                                    }
                                                                </div>
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                                <hr />
                                            </>
                                        )
                                    })}
                                </Accordion.Body>
                            </Accordion.Item>

                        </Accordion>
                    </div>





                    {/* <div className='mt-3'><b>Add questions:</b></div>
                    {questions && questions.length > 0 && questions.map((item, index) => {
                        return (
                            <>
                                <div className='q-main my-3' key={item.id}>
                                    <div className='questions mb-1'>
                                        <div className="form-floating col-md-5 mb-2">
                                            <input type="text"
                                                className={item.isValidQuestions ? 'form-control' : 'form-control is-invalid'}
                                                placeholder="Description"
                                                value={item.description}

                                                onChange={(e) => handleOnChange('QUESTION', item.id, e.target.value)}
                                            />
                                            <label>Question {index + 1} Description...</label>
                                        </div>

                                        <div className='form-group file col-md-4'>
                                            <label className='upload-file' htmlFor={`${item.id}`}><BiImageAdd size={'2em'} color={'aqua'} />Upload file</label>
                                            <input type='file' hidden id={`${item.id}`}
                                                onChange={(e) => handleUploadFile(item.id, e)} />
                                        </div>
                                        <div className='preview col-md-2'>
                                            <div className='preview-file'>
                                                <span>
                                                    {item.fileName ? item.fileName : 'no file is uploadded'}
                                                </span>
                                            </div>
                                        </div>
                                        <div className='icons'>
                                            <AiOutlinePlusCircle className='add'
                                                onClick={() => handleAddRemoveQuestion('ADD', '')}
                                            />
                                            {questions.length > 1 &&
                                                <AiOutlineMinusCircle
                                                    className='remove'
                                                    onClick={() => handleAddRemoveQuestion('REMOVE', item.id)}
                                                />
                                            }
                                        </div>
                                    </div>
                                    {item.answers && item.answers.length > 0 && item.answers.map((answer, index) => {
                                        return (
                                            <div className='answers my-2' key={answer.id}>
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    defaultChecked={answer.isCorrect}
                                                    onChange={(e) => handleAnswerQuestion('CHECKBOX', item.id, answer.id, e.target.checked)}
                                                />
                                                <div className="form-floating answer-item">
                                                    <input type="text"
                                                        className={answer.isValidAnswer ? 'form-control' : 'form-control is-invalid'}
                                                        placeholder="Description"
                                                        defaultValue={answer.description}
                                                        onChange={(e) => handleAnswerQuestion('INPUT', item.id, answer.id, e.target.value)}
                                                    />
                                                    <label>Answer {index + 1}:</label>
                                                </div>
                                                <div className='icons'>
                                                    <AiOutlinePlusCircle
                                                        className='add'
                                                        onClick={() => handleAddRomoveAnswer('ADD', item.id, '')}
                                                    />
                                                    {item.answers.length > 1 &&
                                                        < AiOutlineMinusCircle
                                                            className='remove'
                                                            onClick={() => handleAddRomoveAnswer('REMOVE', item.id, answer.id)}
                                                        />
                                                    }
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                                <hr />
                            </>
                        )
                    })} */}
                </div>

            </div>

            <button className='btn btn-primary' onClick={() => handleSubmit()}>Create question</button>
        </div>
    )
}

export default ManageQuetions
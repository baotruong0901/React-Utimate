import Select from 'react-select'
import { BiImageAdd } from 'react-icons/bi'
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from 'react-icons/ai'
import { v4 as uuidv4 } from 'uuid'
import { getAllQuizForAdmin, getQuizWithQA, postUpsertQA } from '../../../services/apiService'
import './ManageQuestions.scss'
import { useEffect, useState } from 'react';
import _ from 'lodash'
import { toast } from 'react-toastify'
import Accordion from 'react-bootstrap/Accordion';

const UpdateQuiz = () => {
    const initQuestions = [
        {
            id: uuidv4(),
            description: '',
            isValidQuestions: false,
            imageFile: '',
            imageName: '',
            answers: [
                {
                    id: uuidv4(),
                    description: '',
                    isCorrect: false,
                    isValidAnswer: false
                }
            ]
        }
    ]

    const [questions, setQuestions] = useState([])
    const [listQuiz, setListQuiz] = useState([])
    const [select, setSelect] = useState(null)

    useEffect(() => {
        fetchAllQuiz()
    }, [])

    const handleUploadFile = (questionId, e) => {
        let questionsClone = _.cloneDeep(questions)
        let index = questionsClone.findIndex(item => item.id === questionId)
        if (index > -1) {
            questionsClone[index].imageFile = e.target.files[0]
            questionsClone[index].imageName = e.target.files[0].name
        }
        setQuestions(questionsClone)

    }

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
    useEffect(() => {
        fetchQuizWithQA()
    }, [select])

    const urltoFile = (url, filename, mimeType) => {
        return (fetch(url)
            .then(function (res) { return res.arrayBuffer(); })
            .then(function (buf) { return new File([buf], filename, { type: mimeType }); })
        );
    }

    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });

    const fetchQuizWithQA = async () => {
        if (select) {
            let data = await getQuizWithQA(select.value)
            if (data && data.EC === 0) {
                let newQA = []
                for (let i = 0; i < data.DT.qa.length; i++) {
                    let question = data.DT.qa[i]
                    if (question.imageFile) {
                        question.imageName = `Question-${question.id}`
                        question.imageFile = await urltoFile(`data:image/png;base64,${question.imageFile}`, `Question-${question.id}`, 'image/png')
                    }
                    newQA.push(question)
                }
                setQuestions(newQA)
                // console.log('check data: ', newQA);

            }
        }
    }

    const handleAddRemoveQuestion = (type, questionId) => {
        if (type === 'ADD') {
            let questionsClone = _.cloneDeep(questions)
            const newQuestion = {
                id: uuidv4(),
                description: '',
                isValidQuestions: false,
                imageFile: '',
                imageName: '',
                answers: [
                    {
                        id: uuidv4(),
                        description: '',
                        isCorrect: false,
                        isValidAnswer: false
                    }
                ]
            }
            setQuestions([...questionsClone, newQuestion])
            console.log(questions);
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
                isValidAnswer: false
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
                questionsClone[index].isValidQuestions = false
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
                            item.isValidAnswer = false
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
                questionsClone[i].isValidQuestions = true
                isValidQ = false
                setQuestions(questionsClone)
            }
        }

        //validate isEmpty answers description
        let isValidA = true
        for (let i = 0; i < questionsClone.length; i++) {
            for (let j = 0; j < questionsClone[i].answers.length; j++) {
                if (!questionsClone[i].answers[j].description) {
                    questionsClone[i].answers[j].isValidAnswer = true
                    isValidA = false
                    setQuestions(questionsClone)
                }
            }
        }
        if (isValidQ === false || isValidA === false) {
            toast.error(`Not empty Questions/Answers!`)
            return
        }
        for (let i = 0; i < questionsClone.length; i++) {
            if (questionsClone[i].imageFile) {
                questionsClone[i].imageFile = await toBase64(questionsClone[i].imageFile)
            }
        }
        // return
        let data = await postUpsertQA({
            quizId: select.value,
            questions: questionsClone
        })
        if (data && data.EC === 0) {
            toast.success(data.EM)
            setQuestions(initQuestions)
        }
    }

    return (
        <>
            <Accordion defaultActiveKey="0" alwaysOpen={false}>
                <Accordion.Item eventKey="1" className='my-3'>
                    <Accordion.Header><div><b>Update Q/A Quiz</b></div></Accordion.Header>
                    <Accordion.Body>
                        <span><b>Select Quiz:</b></span>
                        <Select
                            className='col-5'
                            defaultValue={select}
                            onChange={setSelect}
                            options={listQuiz}
                        />
                        <hr />
                        {questions && questions.length > 0 && questions.map((item, index) => {
                            return (
                                <>
                                    <div className='q-main my-3' key={item.id}>
                                        <div className='questions mb-1'>
                                            <div className="form-floating col-md-5 mb-2">
                                                <input type="text"
                                                    className={item.isValidQuestions ? 'form-control is-invalid' : 'form-control'}
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
                                                        {item.imageName ? item.imageName : 'no file is uploadded'}
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
                                                            className={answer.isValidAnswer ? 'form-control is-invalid' : 'form-control'}
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
                        <button className='btn btn-primary' onClick={() => handleSubmit()}>Update question</button>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </>
    )
}
export default UpdateQuiz
import { useEffect, useState } from "react"
import { useParams, useLocation } from "react-router-dom"
import { getQuestionData, postSubmitAnswers } from "../../services/apiService"
import _ from "lodash"
import Question from "./Question"
import './DetailQuiz.scss'
import ModalResutl from "../Admin/Modal/ModalResutl"
import BoxCountDown from "./BoxCountDown"
const DetailQuiz = (props) => {
    const [arrQuestion, setArrQuestion] = useState([])
    const [questionIndex, setQuestionIndex] = useState(0)
    const [showModalResult, setShowModalResult] = useState(false)
    const params = useParams()
    const quizId = params.id
    const location = useLocation()
    const [dataModalResult, setDataModalResult] = useState({})

    useEffect(() => {
        fetchQuestion()
    }, [quizId])

    const fetchQuestion = async () => {
        let res = await getQuestionData(quizId)
        if (res && res.EC === 0) {
            let raw = res.DT
            // sữa lại arrQuestion: gộp lại
            let data = _.chain(raw).groupBy('id').map((value, key) => {
                let answers = []
                let questionDescription, image = null
                value.forEach((item, index) => {
                    if (index === 0) {
                        questionDescription = item.description
                        image = item.image
                    }
                    item.answers.isSelected = false
                    answers.push(item.answers)
                })

                answers = _.orderBy(answers, ['id'], ['asc'])
                return {
                    questionId: key,
                    answers,
                    questionDescription,
                    image
                }
            }).value()
            setArrQuestion(data)
        }
    }

    const handleBack = () => {
        if (questionIndex === 0)
            return
        setQuestionIndex(questionIndex - 1)

    }
    const handleNext = () => {
        if (arrQuestion && arrQuestion.length <= questionIndex + 1)
            return
        setQuestionIndex(questionIndex + 1)
    }

    const handleCheckBox = (aId, qId) => {
        let arrQuestionClone = _.cloneDeep(arrQuestion)
        let question = arrQuestionClone.find(item => +item.questionId === +qId)
        if (question && question.answers) {
            // question.answers/
            let changeSelected = question.answers.map(item => {
                if (item.id === aId) {
                    item.isSelected = !item.isSelected
                }
                return item
            })
            question.answers = changeSelected
            // console.log(changeSelected);
        }
        let index = arrQuestionClone.findIndex(item => +item.questionId === +qId)
        if (index > -1) {
            arrQuestionClone[index] = question
            setArrQuestion(arrQuestionClone)
        }

    }

    const handleSubmit = async () => {
        let payload = {
            quizId: +quizId,
            answers: []
        }
        let answer = []
        if (arrQuestion && arrQuestion.length > 0) {
            arrQuestion.forEach(question => {
                let questionId = +question.questionId
                let userAnswerId = []
                question.answers.forEach(item => {
                    if (item.isSelected) {
                        userAnswerId.push(item.id)
                    }
                })
                answer.push({
                    questionId,
                    userAnswerId
                })
            })

        }
        payload.answers = answer
        //submit api
        let data = await postSubmitAnswers(payload)
        if (data && data.EC === 0) {
            setDataModalResult({
                countCorrect: data.DT.countCorrect,
                countTotal: data.DT.countTotal,
                quizData: data.DT.quizData
            })
            setShowModalResult(true)
        }
    }


    return (
        <div className="detail-quiz-container container">
            <div className="left-content" >
                <div className='title'>
                    <span>Quiz {quizId}: {location && location?.state?.description}</span>
                </div>
                <hr />
                <div className="q-content">
                    <Question
                        data={arrQuestion && arrQuestion.length > 0
                            ?
                            arrQuestion[questionIndex]
                            : []
                        }
                        index={questionIndex}
                        handleCheckBox={handleCheckBox}
                    />
                </div>
                <div className="q-footer">
                    <button className="button" onClick={() => handleBack()}>Back</button>
                    <button
                        className="button"
                        onClick={() => handleNext()}
                    >
                        Next
                    </button>
                    <button className="btn btn-primary" onClick={() => handleSubmit()}>Finish</button>
                </div>
            </div>
            <div className="right-content">
                <BoxCountDown
                    handleSubmit={handleSubmit}
                    arrQuestion={arrQuestion}
                    setQuestionIndex={setQuestionIndex}
                />
            </div>
            <ModalResutl
                show={showModalResult}
                setShow={setShowModalResult}
                dataModalResult={dataModalResult}
            />
        </div>
    )
}

export default DetailQuiz
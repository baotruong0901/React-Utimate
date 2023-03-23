import { useRef } from "react";
const QuestionNumber = (props) => {
    const { arrQuestion, setQuestionIndex } = props
    const refDiv = useRef([])
    const getClassQuestion = (question) => {
        if (question && question.answers.length > 0) {
            let isAnswered = question.answers.find(item => item.isSelected === true)
            if (isAnswered) {
                return "number selected"
            }
        }
        return "number"
    }
    const handleClickQuestion = (question, index) => {
        setQuestionIndex(index)
        if (refDiv.current) {
            refDiv.current.forEach(item => {
                if (item && item.className === "number clicked") {
                    item.className = "number"
                }
            })
        }
        console.log(refDiv.current[0].className);
        if (question && question.answers.length > 0) {
            let isAnswered = question.answers.find(item => item.isSelected === true)
            if (isAnswered) {
                return
            }
        }
        refDiv.current[index].className = "number clicked"

    }
    return (
        <>
            {arrQuestion && arrQuestion.length > 0
                && arrQuestion.map((item, index) => {
                    return (
                        <div key={`question` + index}
                            className={getClassQuestion(item)}
                            onClick={() => handleClickQuestion(item, index)}
                            ref={element => refDiv.current[index] = element}
                        >{index + 1}</div>
                    )
                })
            }
        </>
    )
}
export default QuestionNumber
import CountDown from "./CountDown"
import QuestionNumber from "./QuestionNumber"
import './BoxCountDown.scss'
const BoxCountDown = (props) => {
    const { handleSubmit, arrQuestion, setQuestionIndex } = props
    const onTimeUp = () => {
        handleSubmit()
    }
    return (
        <>
            <div className="count-down">
                <CountDown
                    onTimeUp={onTimeUp}
                />
            </div>
            <hr />
            <div className="question-number">
                <QuestionNumber
                    arrQuestion={arrQuestion}
                    setQuestionIndex={setQuestionIndex}
                />
            </div>

        </>
    )
}
export default BoxCountDown
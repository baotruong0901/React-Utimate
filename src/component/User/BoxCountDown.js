import CountDown from "./CountDown"
import QuestionNumber from "./QuestionNumber"
import './BoxCountDown.scss'
const BoxCountDown = (props) => {
    return (
        <>
            <div className="count-down">
                <CountDown />
            </div>
            <hr />
            <div className="question-number">
                <QuestionNumber />
            </div>

        </>
    )
}
export default BoxCountDown
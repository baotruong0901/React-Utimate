import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { getQuestionData } from "../../services/apiService"
const DetailQuiz = (props) => {
    const params = useParams()
    const quizId = params.id

    useEffect(() => {
        fetchQuestion()
    }, [quizId])

    const fetchQuestion = async () => {
        let data = await getQuestionData(quizId)
        console.log('check data: ', data);
    }
    return (
        <div>
            helo
        </div>
    )
}

export default DetailQuiz
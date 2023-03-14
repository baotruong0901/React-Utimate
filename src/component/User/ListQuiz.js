import { useEffect, useState } from 'react'
import { getQuizByUser } from '../../services/apiService'
import { useNavigate } from 'react-router-dom'
import './ListQuiz.scss'
const ListQuiz = (props) => {
    const [listQuiz, setListQuiz] = useState()
    const navigate = useNavigate()
    useEffect(() => {
        getQuizData()
    }, [])
    useEffect(() => {
        document.title = 'Quiz';
    })
    const getQuizData = async () => {
        const data = await getQuizByUser()
        if (data && data.EC === 0) {
            setListQuiz(data.DT)
        }
        console.log('data: ', data);
    }
    return (
        <div className='list-quiz-container container'>
            {listQuiz && listQuiz.length > 0 &&
                listQuiz.map((item, index) => {
                    console.log(item);
                    return (
                        <div className="card" style={{ width: "18rem" }} key={`${index}-quiz`}>
                            <img src={`data:image/jpeg;base64,${item.image}`} className="card-img-top" alt="..." />
                            <div className="card-body">
                                <h5 className="card-title">Quiz {index + 1}</h5>
                                <p className="card-text">{item.description}</p>
                                <button className="btn btn-primary"
                                    onClick={() => navigate(`/quiz/${item.id}`, { state: { description: item.description } })}>
                                    Start now
                                </button>
                            </div>
                        </div>
                    )
                })
            }
            {listQuiz && listQuiz.length === 0 &&
                <div>You don't have any quiz now...</div>
            }
        </div>
    )
}
export default ListQuiz
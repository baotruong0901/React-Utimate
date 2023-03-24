import { getHistory } from "../../services/apiService"
import { useState, useEffect } from "react"
import moment from "moment"
import './History.scss'
const History = (props) => {
    const [history, setHistory] = useState([])

    const fetchHistory = async () => {
        let data = await getHistory()
        if (data && data.EC === 0) {
            let newData = data?.DT?.data?.map(item => {
                return {
                    total_correct: item.total_correct,
                    total_questions: item.total_questions,
                    id: item.id,
                    name: item?.quizHistory?.name ?? "",
                    date: moment(item.createdAt).utc().format('DD/MM/YYYY hh:mm:ss A')
                }
            })
            // if (newData.length > 7) {
            //     newData = newData.slice(newData.length - 7, newData.length)
            // }
            setHistory(newData.reverse())
        }
        console.log('data:', history);
    }
    useEffect(() => {
        fetchHistory()
    }, [])
    return (
        <div className="history-container">
            <table className="table table-hover table-bordered table-all-user">
                <thead>
                    <tr>
                        <th className="col-1">Id</th>
                        <th className="col-3">Quiz Name</th>
                        <th className="col-2">Total Question</th>
                        <th className="col-2">Total Correct</th>
                        <th className="col-4">Date</th>
                    </tr>
                </thead>
                <tbody>

                    {history && history.length > 0 && history.map((item, index) => {
                        return (
                            <tr key={`${item.id}-history`}>
                                <th scope="row">{item.id}</th>
                                <td>{item.name}</td>
                                <td>{item.total_questions}</td>
                                <td>{item.total_correct}</td>
                                <td>
                                    {item.date}
                                </td>
                            </tr>

                        )
                    })
                    }
                    {history && history.length === 0 &&
                        <tr style={{ textAlign: 'center', color: 'grey' }}>
                            <td colSpan={"4"}>
                                Data not found
                            </td>

                        </tr>
                    }
                </tbody>
            </table>
        </div>
    )
}
export default History
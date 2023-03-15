import { BiEdit } from 'react-icons/bi'
import { RiDeleteBin6Line } from 'react-icons/ri'
import './TableAllQuiz.scss'
const TableAllQuiz = (props) => {
    const { listQuiz, handleClickDeleteQuiz, handleClickUpdateQuiz } = props

    return (
        <>
            <table className="table table-hover table-bordered table-all-quiz">
                <thead>
                    <tr>
                        <th className="col-1">Id</th>
                        <th className="col-3">Quiz Name</th>
                        <th className="col-4">Description</th>
                        <th className="col-2">Type</th>
                        <th className="col-2">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {listQuiz && listQuiz.length > 0 ? listQuiz.map((item, index) => {
                        return (
                            <tr key={`${item.id}-quiz`}>
                                <th scope="row">{item.id}</th>
                                <td>{item.name}</td>
                                <td>{item.description}</td>
                                <td>{item.difficulty}</td>
                                <td className="action">
                                    <button className="btn-view">View</button>
                                    <button className="btn-edit mx-3" onClick={() => handleClickUpdateQuiz(item)}><BiEdit size={'1.5em'} color={'grey'} /></button>
                                    <button className="btn-delete" onClick={() => handleClickDeleteQuiz(item)}><RiDeleteBin6Line size={'1.5em'} /></button>
                                </td>
                            </tr>
                        )

                    })
                        :
                        <tr style={{ textAlign: 'center', color: 'grey' }}>
                            <td colSpan={"4"}>
                                Data not found
                            </td>

                        </tr>
                    }


                </tbody>
            </table>
        </>
    )
}
export default TableAllQuiz
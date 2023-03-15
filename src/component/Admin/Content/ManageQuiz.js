import { useEffect, useState } from 'react'
import { FcPlus } from 'react-icons/fc'
import ModalManageQuiz from '../Modal/ModalManageQuiz'
import TableAllQuiz from '../table/TableAllQuiz'
import { getAllQuizForAdmin, deleteQuiz } from '../../../services/apiService'
import { toast } from 'react-toastify'
import './ManageQuiz.scss'
import ModalDeleteQuiz from '../Modal/ModalDeleteQuiz'
const ManageQuiz = (props) => {
    const [showModal, setShowModal] = useState(false)
    const [showModalDelete, setShowModalDelete] = useState(false)
    const [showModalUpdate, setShowModalUpdate] = useState(false)
    const [quizUpdate, setQuizUpdate] = useState([])
    const [listQuiz, setListQuiz] = useState("")
    const [quizDelete, setQuizDelete] = useState([])
    const handleCreatequiz = () => {
        setShowModal(true)
        setShowModalUpdate(false)
    }
    useEffect(() => {
        fetchAllQuiz()
    }, [])
    const fetchAllQuiz = async () => {
        let data = await getAllQuizForAdmin()
        if (data && data.EC === 0) {
            setListQuiz(data.DT)
        }
    }
    const handleClickDeleteQuiz = (quiz) => {
        setShowModalDelete(true)
        setQuizDelete(quiz)
    }
    const handleClickUpdateQuiz = (quiz) => {
        setShowModalUpdate(true)
        setShowModal(true)
        setQuizUpdate(quiz)
    }
    const resetDataUpdate = () => {
        setQuizUpdate({})
    }
    return (
        <div className="manage-user-container">
            <div className="title">
                Manage Quiz
            </div>
            <hr />
            <div className="users-content">
                <div className="add-new">
                    <button className="btn btn-primary"
                        onClick={() => handleCreatequiz()}>
                        <FcPlus /><span>Add new quiz</span>
                    </button>
                </div>
                <hr />
                <div className="table-user">
                    <TableAllQuiz
                        listQuiz={listQuiz}
                        fetchAllQuiz={fetchAllQuiz}
                        handleClickDeleteQuiz={handleClickDeleteQuiz}
                        setShowModalUpdate={setShowModalUpdate}
                        handleClickUpdateQuiz={handleClickUpdateQuiz}

                    />
                </div>
            </div>
            <ModalManageQuiz
                show={showModal}
                setShow={setShowModal}
                fetchAllQuiz={fetchAllQuiz}
                showModalUpdate={showModalUpdate}
                quizUpdate={quizUpdate}
                resetDataUpdate={resetDataUpdate}
            />
            <ModalDeleteQuiz
                show={showModalDelete}
                setShow={setShowModalDelete}
                quizDelete={quizDelete}
                fetchAllQuiz={fetchAllQuiz}
            />
        </div>
    )
}
export default ManageQuiz
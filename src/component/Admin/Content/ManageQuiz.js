import { useState } from 'react'
import { FcPlus } from 'react-icons/fc'
import ModalManageQuiz from '../Modal/ModalManageQuiz'
import './ManageQuiz.scss'
const ManageQuiz = (props) => {
    const [showModal, setShowModal] = useState(false)
    const handleCreatequiz = () => {
        setShowModal(true)
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
            </div>
            <ModalManageQuiz
                show={showModal}
                setShow={setShowModal}
            />
        </div>
    )
}
export default ManageQuiz
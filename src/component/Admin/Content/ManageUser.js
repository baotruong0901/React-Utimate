import ModalManageUser from "../Modal/ModalManageUser"
import './ManageUser.scss'
const ManageUser = (props) => {
    return (
        <>
            <div className="manage-user-container">
                <div className="title">
                    Manage User
                </div>
                <div className="users-content">
                    <div>
                        <button>Add new user</button>
                    </div>
                    <div>
                        table
                    </div>
                    <ModalManageUser />
                </div>
            </div>

        </>
    )
}
export default ManageUser
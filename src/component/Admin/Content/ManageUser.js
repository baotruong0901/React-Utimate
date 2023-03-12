import ModalManageUser from "../Modal/ModalManageUser"
import React, { useState } from 'react';
import { FcPlus } from 'react-icons/fc'
import './ManageUser.scss'
import TableAllUser from "../table/TableAllUser";
const ManageUser = (props) => {
    const [showModalCreateUser, setShowModalCreateUser] = useState(false);
    return (
        <>
            <div className="manage-user-container">
                <div className="title">
                    Manage User
                </div>
                <div className="users-content">
                    <div className="add-new">
                        <button className="btn btn-primary"
                            onClick={() => setShowModalCreateUser(true)}>
                            <FcPlus />Add new user
                        </button>
                    </div>
                    <div className="table-user">
                        <TableAllUser />
                    </div>
                    <ModalManageUser
                        show={showModalCreateUser}
                        setShow={setShowModalCreateUser}
                    />
                </div>
            </div>

        </>
    )
}
export default ManageUser
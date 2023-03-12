import ModalManageUser from "../Modal/ModalManageUser"
import ModalUpdateUser from "../Modal/ModalUpdateUser"
import React from 'react';
import { FcPlus } from 'react-icons/fc'
import { useEffect, useState } from "react"
import { getAllUser } from '../../../services/apiService'
import './ManageUser.scss'
import TableAllUser from "../table/TableAllUser";
const ManageUser = (props) => {
    const [showModalCreateUser, setShowModalCreateUser] = useState(false);
    const [showModalUpdateUser, setShowModalUpdateUser] = useState(false);
    const [listUsers, setListUsers] = useState([])
    const [dataUpdate, setDataUpdate] = useState([])

    useEffect(() => {
        fetchListUser()
    }, [])

    const fetchListUser = async () => {
        let data = await getAllUser()
        if (data.EC === 0) {
            setListUsers(data.DT)
        }
    }

    const handleClickUpdate = (user) => {
        setShowModalUpdateUser(true)
        setDataUpdate(user)
        // console.log('>>>>>>,', user);
    }

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
                            <FcPlus /><span>Add new user</span>
                        </button>
                    </div>
                    <div className="table-user">
                        <TableAllUser
                            listUsers={listUsers}
                            handleClickUpdate={handleClickUpdate}
                        />
                    </div>
                    <ModalManageUser
                        show={showModalCreateUser}
                        setShow={setShowModalCreateUser}
                        fetchListUser={fetchListUser}
                    />
                    <ModalUpdateUser
                        show={showModalUpdateUser}
                        setShow={setShowModalUpdateUser}
                        dataUpdate={dataUpdate}
                    />
                </div>
            </div>

        </>
    )
}
export default ManageUser
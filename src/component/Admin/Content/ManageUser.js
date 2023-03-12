import ModalManageUser from "../Modal/ModalManageUser"
import React from 'react';
import { FcPlus } from 'react-icons/fc'
import { useEffect, useState } from "react"
import { getAllUser, getUserPaginate } from '../../../services/apiService'
import './ManageUser.scss'
import ModalDeleteUser from "../Modal/ModalDeleteUser";
import TableUserPaginate from "../table/TableUserPaginate";
const ManageUser = (props) => {
    const LIMIT_PAGE = 5
    const [showModalCreateUser, setShowModalCreateUser] = useState(false);
    const [listUsers, setListUsers] = useState([])
    const [showModalUpdate, setShowModalUpdate] = useState(false)
    const [dataUpdate, setDataUpdate] = useState([])
    const [showModalDelete, setShowModalDelete] = useState(false)
    const [dataDelete, setDataDelete] = useState([])
    const [pageCount, setPageCount] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)
    useEffect(() => {
        // fetchListUser()
        fetchUserPaginate(1)
    }, [])

    const fetchListUser = async () => {
        let data = await getAllUser()
        if (data.EC === 0) {
            setListUsers(data.DT)
        }
    }

    const handleCreateUser = () => {
        setShowModalCreateUser(true)
        setShowModalUpdate(false)
    }


    const handleClickUpdate = (user) => {
        setShowModalUpdate(true)
        setShowModalCreateUser(true)
        setDataUpdate(user)
    }

    const resetDataUpdate = () => {
        setDataUpdate({})
    }

    const handleClickDeleteUser = (user) => {
        setShowModalDelete(true)
        setDataDelete(user)
    }

    const fetchUserPaginate = async (page) => {
        let data = await getUserPaginate(page, LIMIT_PAGE)
        if (data.EC === 0) {
            setListUsers(data.DT.users)
            setPageCount(data.DT.totalPages)
        }
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
                            onClick={() => handleCreateUser()}>
                            <FcPlus /><span>Add new user</span>
                        </button>
                    </div>
                    <div className="table-user">
                        {/* <TableAllUser
                            listUsers={listUsers}
                            handleClickUpdate={handleClickUpdate}
                            handleClickDeleteUser={handleClickDeleteUser}
                        /> */}
                        <TableUserPaginate
                            listUsers={listUsers}
                            handleClickUpdate={handleClickUpdate}
                            handleClickDeleteUser={handleClickDeleteUser}
                            fetchUserPaginate={fetchUserPaginate}
                            pageCount={pageCount}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                        />
                    </div>
                    <ModalManageUser
                        show={showModalCreateUser}
                        setShow={setShowModalCreateUser}
                        fetchUserPaginate={fetchUserPaginate}
                        showModalUpdate={showModalUpdate}
                        dataUpdate={dataUpdate}
                        resetDataUpdate={resetDataUpdate}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                    />
                    <ModalDeleteUser
                        show={showModalDelete}
                        setShow={setShowModalDelete}
                        dataDelete={dataDelete}
                        fetchUserPaginate={fetchUserPaginate}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                    />
                </div>
            </div>

        </>
    )
}
export default ManageUser
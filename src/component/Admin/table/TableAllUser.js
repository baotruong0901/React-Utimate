import { BiEdit } from 'react-icons/bi'
import { RiDeleteBin6Line } from 'react-icons/ri'
import "./TableAllUser.scss"
const TableAllUser = (props) => {

    const { listUsers, handleClickUpdate } = props
    return (
        <>
            <table className="table table-hover table-bordered table-all-user">
                <thead>
                    <tr>
                        <th className="col-1">Id</th>
                        <th className="col-3">User Name</th>
                        <th className="col-4">Email</th>
                        <th className="col-2">Role</th>
                        <th className="col-2">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {listUsers && listUsers.length > 0 ? listUsers.map((item, index) => {
                        return (
                            <tr key={item.id}>
                                <th scope="row">{item.id}</th>
                                <td>{item.username}</td>
                                <td>{item.email}</td>
                                <td>{item.role}</td>
                                <td className="action">
                                    <button className="btn-view">View</button>
                                    <button className="btn-edit mx-3" onClick={() => handleClickUpdate(item)}><BiEdit size={'1.5em'} color={'grey'} /></button>
                                    <button className="btn-delete"><RiDeleteBin6Line size={'1.5em'} /></button>
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
export default TableAllUser
import { BiEdit } from 'react-icons/bi'
import { RiDeleteBin6Line } from 'react-icons/ri'
import ReactPaginate from 'react-paginate'
import './TableUserPaginate.scss'
const TableUserPaginate = (props) => {

    const { listUsers, handleClickUpdate, handleClickDeleteUser, fetchUserPaginate, pageCount } = props
    const handlePageClick = (event) => {
        fetchUserPaginate(+event.selected + 1)
        props.setCurrentPage(+event.selected + 1)
        console.log(`User requested page number ${props.currentPage}`);
    };
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
                                    <button className="btn-delete" onClick={() => handleClickDeleteUser(item)}><RiDeleteBin6Line size={'1.5em'} /></button>
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
            <div className='paginate'>
                <ReactPaginate
                    nextLabel="Next >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={3}
                    marginPagesDisplayed={2}
                    pageCount={pageCount}
                    previousLabel="< Prev"
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    breakLabel="..."
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                    containerClassName="pagination"
                    activeClassName="active"
                    renderOnZeroPageCount={null}
                    forcePage={props.currentPage - 1}
                />
            </div>
        </>
    )
}
export default TableUserPaginate
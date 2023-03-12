import Table from 'react-bootstrap/Table';
const TableAllUser = (props) => {
    return (
        <div className="table-all-user-container">
            <Table striped bordered hover className='row'>
                <thead >
                    <tr>
                        <th className='col-6'>Email</th>
                        <th className='col-6'>User Name</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Mark</td>
                        <td>Otto</td>
                    </tr>
                </tbody>
            </Table>
        </div>
    )
}
export default TableAllUser
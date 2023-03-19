import Accordion from 'react-bootstrap/Accordion';
import { getAllQuizForAdmin, getAllUser, postQuizAssignToUser } from '../../../services/apiService'
import Select from 'react-select'
import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify'

const Assign = (props) => {
    const [listQuiz, setListQuiz] = useState([])
    const [selectQuiz, setSelectQuiz] = useState(null)
    const [listUser, setListUsers] = useState([])
    const [selectUser, setSelectUser] = useState(null)


    useEffect(() => {
        fetchAllQuiz()
        fetchAllUser()
    }, [])

    const fetchAllQuiz = async () => {
        let data = await getAllQuizForAdmin()
        if (data && data.EC === 0) {
            let newListQuiz = data.DT.map((item, index) => {
                return {
                    value: item.id,
                    label: `${item.id}-${item.name}`
                }
            })
            setListQuiz(newListQuiz)
        }
    }

    const fetchAllUser = async () => {
        let data = await getAllUser()
        if (data.EC === 0) {
            let newListQuiz = data.DT.map((item, index) => {
                return {
                    value: item.id,
                    label: `${item.id} - ${item.username} - ${item.email}`
                }
            })
            setListUsers(newListQuiz)
        }
    }

    const handleSubmit = async () => {
        let quizId = selectQuiz.value
        let userId = selectUser.value
        let data = await postQuizAssignToUser(quizId, userId)
        if (data && data.EC === 0) {
            toast.success(data.EM)
            selectQuiz({})
            selectUser({})
        } else {
            toast.error(data.EM)
        }
    }
    return (
        <>
            <Accordion defaultActiveKey="0" alwaysOpen={false}>
                <Accordion.Item eventKey="1" className='my-3'>
                    <Accordion.Header><div><b>Assign quiz for User</b></div></Accordion.Header>
                    <Accordion.Body>
                        <>
                            <div className='row'>
                                <div className='selected-quiz col-6'>
                                    <span><b>Select User:</b></span>
                                    <Select
                                        defaultValue={selectUser}
                                        onChange={setSelectUser}
                                        options={listUser}
                                    />
                                </div>

                                <div className='selected-user col-6'>
                                    <span><b>Select Quiz:</b></span>
                                    <Select
                                        defaultValue={selectQuiz}
                                        onChange={setSelectQuiz}
                                        options={listQuiz}
                                    />
                                </div>
                            </div>
                            <hr />
                            <button className='btn btn-primary' onClick={() => handleSubmit()}>Assign</button>
                        </>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </>
    )
}

export default Assign
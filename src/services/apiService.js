import axios from '../utils/axios';
const postCreateNewUser = (email, password, userName, role, image) => {
    //submit with formdata
    const data = new FormData()
    data.append('email', email)
    data.append('password', password)
    data.append('username', userName)
    data.append('role', role)
    data.append('userImage', image)
    return axios.post("api/v1/participant", data)
}

const getAllUser = () => {
    return axios.get("api/v1/participant/all")
}

const putUpdateUser = (id, userName, role, image) => {
    //submit with formdata
    const data = new FormData()
    data.append('id', id)
    data.append('username', userName)
    data.append('role', role)
    data.append('userImage', image)
    return axios.put("api/v1/participant", data)
}

const deleteUser = (userId) => {
    return axios.delete("api/v1/participant", { data: { id: userId } })
}

const getUserPaginate = (page, limit) => {
    return axios.get(`api/v1/participant?page=${page}&limit=${limit}`)
}

const postLogin = (email, password) => {
    return axios.post(`api/v1/login`, { email, password })
}

const postRegister = (email, password, username) => {
    return axios.post(`api/v1/register`, { email, password, username })
}


export {
    postCreateNewUser,
    getAllUser,
    putUpdateUser,
    deleteUser,
    getUserPaginate,
    postLogin,
    postRegister,
}
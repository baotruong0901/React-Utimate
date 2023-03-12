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

export { postCreateNewUser }
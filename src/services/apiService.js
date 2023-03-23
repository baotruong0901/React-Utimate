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
    return axios.post(`api/v1/login`, { email, password, delay: 3000 })
}

const postRegister = (email, password, username) => {
    return axios.post(`api/v1/register`, { email, password, username, delay: 2000 })
}

const getQuizByUser = () => {
    return axios.get(`api/v1/quiz-by-participant`)
}

const getQuestionData = (id) => {
    return axios.get(`api/v1/questions-by-quiz?quizId=${id}`)
}

const postSubmitAnswers = (data) => {
    //raw
    return axios.post(`api/v1/quiz-submit`, { ...data })
}
const postCreateNewQuiz = (name, description, difficulty, image) => {
    //form data
    const data = new FormData()
    data.append('name', name)
    data.append('description', description)
    data.append('difficulty', difficulty)
    data.append('quizImage', image)
    return axios.post("api/v1/quiz", data)
}

const getAllQuizForAdmin = (id) => {
    return axios.get(`api/v1/quiz/all`)
}

const deleteQuiz = (quizId) => {
    return axios.delete(`api/v1/quiz/${quizId}`)
}

const putUpdateQuiz = (quizId, quizName, description, type, image) => {
    //submit with formdata
    const data = new FormData()
    data.append('id', quizId)
    data.append('name', quizName)
    data.append('description', description)
    data.append('difficulty', type)
    data.append('quizImage', image)
    return axios.put("api/v1/quiz", data)
}


const postCreateNewQuestionsForQuiz = (quizId, description, image) => {
    //form data
    const data = new FormData()
    data.append('quiz_id', quizId)
    data.append('description', description)
    data.append('questionImage', image)
    return axios.post("api/v1/question", data)
}

const postCreateNewAnswer = (description, correct_answer, question_id) => {
    return axios.post(`api/v1/answer`, { description, correct_answer, question_id })
}

const postQuizAssignToUser = (quizId, userId) => {
    return axios.post(`api/v1/quiz-assign-to-user`, { quizId, userId })
}

const getQuizWithQA = (quizId) => {
    return axios.get(`api/v1/quiz-with-qa/${quizId}`)
}

const postUpsertQA = (data) => {
    //JSON
    return axios.post(`api/v1/quiz-upsert-qa`, { ...data })
}

const postLogout = (email, refresh_token) => {
    return axios.post(`api/v1/logout`, { email, refresh_token, delay: 3000 })
}

export {
    postCreateNewUser,
    getAllUser,
    putUpdateUser,
    deleteUser,
    getUserPaginate,
    postLogin,
    postRegister,
    getQuizByUser,
    getQuestionData,
    postSubmitAnswers,
    postCreateNewQuiz,
    getAllQuizForAdmin,
    deleteQuiz,
    putUpdateQuiz,
    postCreateNewQuestionsForQuiz,
    postCreateNewAnswer,
    postQuizAssignToUser,
    getQuizWithQA,
    postUpsertQA,
    postLogout,
}
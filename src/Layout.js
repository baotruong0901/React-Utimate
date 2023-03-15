import React, { useEffect } from 'react';
import Admin from './component/Admin/Admin';
import HomePage from './component/Home/HomePage';
import ManageUser from './component/Admin/Content/ManageUser';
import DashBoard from './component/Admin/Content/DashBoard';
import Login from './component/Auth/Login';
import App from './App';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Register from './component/Auth/Register';
import ListQuiz from './component/User/ListQuiz';
import DetailQuiz from './component/User/DetailQuiz';
import ManageQuiz from './component/Admin/Content/ManageQuiz';
import ManageQuetions from './component/Admin/Content/ManageQuestions';
const NotFound = () => {
    return (
        <div className='container mt-3 alert alert-danger'>
            404. Not found data with current URL
        </div>
    )
}
const Layout = (props) => {
    return (
        <>
            <Routes>
                <Route path='/' element={<App />}>
                    <Route index element={<HomePage />} />
                    <Route path='users' element={<ListQuiz />} />
                </Route>
                <Route path='/admins' element={<Admin />}>
                    <Route index element={<DashBoard />} />
                    <Route path='manage-user' element={<ManageUser />} />
                    <Route path='manage-quizzes' element={<ManageQuiz />} />
                    <Route path='manage-questions' element={<ManageQuetions />} />
                </Route>
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/quiz/:id' element={<DetailQuiz />} />
                <Route path='*' element={<NotFound />} />

            </Routes>

            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
        </>
    )
}
export default Layout
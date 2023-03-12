import React from 'react';
import Admin from './component/Admin/Admin';
import User from './component/User/User';
import HomePage from './component/Home/HomePage';
import ManageUser from './component/Admin/Content/ManageUser';
import DashBoard from './component/Admin/Content/DashBoard';
import Login from './component/Auth/Login';
import App from './App';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Register from './component/Auth/Register';

const Layout = (props) => {
    return (
        <>
            <Routes>
                <Route path='/' element={<App />}>
                    <Route index element={<HomePage />} />
                    <Route path='users' element={<User />} />
                </Route>
                <Route path='admins' element={<Admin />}>
                    <Route index element={<DashBoard />} />
                    <Route path='manage-user' element={<ManageUser />} />
                </Route>
                <Route path='login' element={<Login />} />
                <Route path='register' element={<Register />} />

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
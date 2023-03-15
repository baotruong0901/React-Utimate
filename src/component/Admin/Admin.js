import SideBar from "./SideBar";
import './Admin.scss';
import { FaBars } from 'react-icons/fa';
import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import PerfectScrollbar from 'react-perfect-scrollbar'
import { useSelector } from "react-redux";

const Admin = (props) => {
    const [collapsed, setCollapsed] = useState(false);
    // const isLogin = useSelector(state => state.user.isLogin)
    // const navigate = useNavigate()
    return (
        <div className="admin-container">
            <div className="admin-sidebar">
                <SideBar collapsed={collapsed} />
            </div>
            <div className="admin-content">
                <div className="admin-header">
                    <FaBars onClick={() => setCollapsed(!collapsed)} style={{ cursor: 'pointer' }} />
                </div>
                <div className="admin-main">
                    <PerfectScrollbar>
                        <Outlet />
                    </PerfectScrollbar>
                </div>
            </div>
        </div>
    )
}
export default Admin;
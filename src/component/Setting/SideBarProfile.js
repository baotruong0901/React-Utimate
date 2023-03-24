import 'react-pro-sidebar/dist/css/styles.css';
import {
    ProSidebar,
    Menu,
    MenuItem,
    SubMenu,
    SidebarHeader,
    SidebarFooter,
    SidebarContent,
} from 'react-pro-sidebar';

import { FaGem, FaGithub } from 'react-icons/fa';
import sidebarBg from '../../assets/bg2.jpg';
import { DiReact } from 'react-icons/di'
import { MdDashboard } from 'react-icons/md'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const SideBarProfile = (props) => {
    const { image, collapsed, toggled, handleToggleSidebar } = props;
    const navigate = useNavigate()
    return (
        <>
            <ProSidebar
                image={sidebarBg}
                collapsed={collapsed}
                toggled={toggled}
                breakPoint="md"
                onToggle={handleToggleSidebar}
            >
                <SidebarHeader>
                    <div
                        onClick={() => navigate("/")}
                        style={{
                            padding: '16px',
                            textTransform: 'uppercase',
                            fontWeight: 'bold',
                            fontSize: 14,
                            letterSpacing: '1px',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            cursor: 'pointer'
                        }}
                    >
                        <DiReact size={'3em'} color={'0bfff'} />
                        <span style={{ paddingLeft: '10px' }}>Quizz</span>
                    </div>
                </SidebarHeader>

                <SidebarContent>
                    <Menu iconShape="circle">
                        <MenuItem
                            icon={<MdDashboard />}
                        >
                            Profile
                            <Link to="/profile" />
                        </MenuItem>
                    </Menu>

                </SidebarContent>

                <SidebarFooter style={{ textAlign: 'center' }}>
                    <div
                        className="sidebar-btn-wrapper"
                        style={{
                            padding: '20px 24px',
                        }}
                    >
                        <a
                            href="https://github.com/azouaoui-med/react-pro-sidebar"
                            target="_blank"
                            className="sidebar-btn"
                            rel="noopener noreferrer"
                        >
                            <FaGithub />
                        </a>
                    </div>
                </SidebarFooter>
            </ProSidebar>
        </>
    )
}

export default SideBarProfile;
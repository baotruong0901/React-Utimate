
import { Button } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/action/userActions';
import { postLogout } from '../../services/apiService';
import { useTranslation, Trans } from 'react-i18next';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Language from './Language';
import NProgress from "nprogress";
import './Header.scss'
NProgress.configure({
    showSpinner: false,
    trickleSpeed: 75,

})
const Header = () => {
    const navigate = useNavigate();
    const isLogin = useSelector(state => state.user.isLogin)
    const userInfo = useSelector(state => state.user.userInfo)
    const dispatch = useDispatch()
    const { t } = useTranslation();
    // const [show, setShow] = useState(false)
    const handleLogin = () => {
        NProgress.start();
        setTimeout(() => {
            navigate('/login')
            NProgress.done();
        }, 3000)
    }

    const handleRegister = () => {
        NProgress.start();
        setTimeout(() => {
            navigate('/register')
            NProgress.done();
        }, 3000)
    }

    const handleLogout = async () => {
        NProgress.start();
        let data = await postLogout(userInfo.email, userInfo.refresh_token)
        if (data && data.EC === 0) {
            //clear data redux
            dispatch(logout())
            navigate('/login')
            NProgress.done();
        }
    }

    const handleShow = () => {
        navigate("/profile")
    }

    return (
        <>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand><NavLink className='nav-link' to="/">Quizz</NavLink></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    {userInfo && userInfo.role === "ADMIN"
                        ?
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                                <NavLink className='nav-link' to="/">{t('header.Home')}</NavLink>
                                <NavLink className='nav-link' to="users">{t('header.Users')}</NavLink>
                                <NavLink className='nav-link' to="admins">{t('header.Admins')}</NavLink>
                            </Nav>
                            <Nav>
                                {isLogin === false ?
                                    <>
                                        <Button className='btn-login' onClick={() => handleLogin()}>{t('header.Login')}</Button>
                                        <Button className='btn-signup' onClick={() => handleRegister()}>{t('header.Register')}</Button>
                                    </>
                                    :
                                    <NavDropdown title={t('header.Settings')} id="basic-nav-dropdown">
                                        <NavDropdown.Item onClick={() => handleShow()}>{t('header.Profile')}</NavDropdown.Item>
                                        <NavDropdown.Item onClick={() => handleLogout()}>{t('header.Log_out')}</NavDropdown.Item>
                                    </NavDropdown>
                                }
                                <Language />
                            </Nav>
                        </Navbar.Collapse>
                        :
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                                <NavLink className='nav-link' to="/">{t('header.Home')}</NavLink>
                                <NavLink className='nav-link' to="users">{t('header.Users')}</NavLink>
                            </Nav>
                            <Nav>
                                {isLogin === false ?
                                    <>
                                        <Button className='btn-login' onClick={() => handleLogin()}>{t('header.Login')}</Button>
                                        <Button className='btn-signup' onClick={() => handleRegister()}>{t('header.Register')}</Button>
                                    </>
                                    :
                                    <NavDropdown title={t('header.Settings')} id="basic-nav-dropdown">
                                        <NavDropdown.Item onClick={() => handleShow()}>{t('header.Profile')}</NavDropdown.Item>
                                        <NavDropdown.Item onClick={() => handleLogout()}>{t('header.Log_out')}</NavDropdown.Item>
                                    </NavDropdown>
                                }
                                <Language />
                            </Nav>
                        </Navbar.Collapse>
                    }

                </Container>

            </Navbar>
        </>
    );
}

export default Header;
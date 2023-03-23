import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Button } from 'react-bootstrap';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink, useNavigate } from 'react-router-dom';
import './Header.scss'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/action/userActions';
import { postLogout } from '../../services/apiService';
import Language from './Language';
import { useTranslation, Trans } from 'react-i18next';
import NProgress from "nprogress";
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
        console.log('data', data);
        if (data && data.EC === 0) {
            //clear data redux
            dispatch(logout())
            navigate('/login')

            NProgress.done();
        }






    }
    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand><NavLink className='nav-link' to="/">Quizz</NavLink></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
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
                            <NavDropdown title="Settings" id="basic-nav-dropdown">
                                <NavDropdown.Item onClick={() => handleLogout()}>Log out</NavDropdown.Item>
                                <NavDropdown.Item>Profile</NavDropdown.Item>
                            </NavDropdown>
                        }
                        <Language />
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;
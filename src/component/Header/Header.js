import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Button } from 'react-bootstrap';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink, useNavigate } from 'react-router-dom';
import './Header.scss'
import { useSelector } from 'react-redux';
const Header = () => {
    const navigate = useNavigate();
    const isLogin = useSelector(state => state.user.isLogin)
    const userInfo = useSelector(state => state.user.userInfo)
    const handleLogin = () => {
        navigate("/login")
    }
    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand><NavLink className='nav-link' to="/">Brand</NavLink></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavLink className='nav-link' to="/">Home</NavLink>
                        <NavLink className='nav-link' to="users">Users</NavLink>
                        <NavLink className='nav-link' to="admins">Admins</NavLink>
                    </Nav>
                    <Nav>
                        {isLogin === false ?
                            <>
                                <Button className='btn-login' onClick={() => handleLogin()}>Log in</Button>
                                <Button className='btn-signup' onClick={() => navigate('/register')}>Sign up</Button>
                            </>
                            :
                            <NavDropdown title="Settings" id="basic-nav-dropdown">
                                <NavDropdown.Item>Log out</NavDropdown.Item>
                                <NavDropdown.Item>Profile</NavDropdown.Item>
                            </NavDropdown>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;
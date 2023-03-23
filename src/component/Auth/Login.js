import './Login.scss'
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { postLogin } from '../../services/apiService';
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux';
import { login } from '../../store/action/userActions';
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import NProgress from "nprogress";
import Language from '../Header/Language';
NProgress.configure({
    showSpinner: false,
    trickleSpeed: 50,

})

const Login = (props) => {
    const [isShowPassword, setIsShowPassword] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleShowHidePassword = () => {
        setIsShowPassword(!isShowPassword)
    }

    const handleSubmit = async () => {
        //validate

        //submit
        setIsLoading(true)
        let data = await postLogin(email, password)
        if (data && data.EC === 0) {
            dispatch(login(data))
            setIsLoading(false)
            toast.success(data.EM)
            navigate('/')
        }
        else if (data && data.EC !== 0) {
            setIsLoading(false)
            toast.error(data.EM)
            NProgress.done()

        }
    }

    const handleClickRegister = () => {
        NProgress.start()
        setTimeout(() => {
            navigate('/register')
            NProgress.done()
        }, 2000)
    }

    const handleKeyDown = (e) => {
        if (e.keyCode === 13) {
            handleSubmit()
        }
    };

    useEffect(() => {
        document.title = 'Login';
    })
    return (
        <div className='login-container'>
            <div className='header'>
                <span>Don't have an account yet?</span>
                <button onClick={(e) => handleClickRegister()}>Sign up</button>
                <Language />
            </div>
            <div className='title'>
                <span>Login</span>
            </div>
            <div className='form'>
                <Form
                    className="form-login row p-5"
                    onKeyDown={(e) => handleKeyDown(e)}
                >
                    <Form.Group className="col-12 mb-4">
                        <Form.Label className="label">Email</Form.Label>
                        <Form.Control
                            className="input"
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group className="form-input-password col-12 mb-2">
                        <Form.Label className="label">Password</Form.Label>
                        <Form.Control
                            className="input"
                            type={isShowPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        ></Form.Control>
                        <span onClick={() => handleShowHidePassword()}>
                            <i
                                className={
                                    isShowPassword === true
                                        ? "fas fa-eye-slash"
                                        : "fas fa-eye"
                                }
                            ></i>
                        </span>
                    </Form.Group>
                    <button
                        className="btn-submit mb-2 col-12"
                        onClick={() => handleSubmit()}
                        type="button"
                        disabled={isLoading}
                    >
                        {isLoading === true && <AiOutlineLoading3Quarters className='loading-icon' />}
                        <span>Log in</span>
                    </button>
                    <div className="Forgot-password col-12 mb-1">
                        Forgot your password?
                    </div>
                    <div className="col-12 text-center mb-1">Or Login with:</div>
                    <div className="col-12 social-login d-flex justify-content-center mb-1">
                        <i className="fab fa-facebook-f fb"></i>
                        <i className="fab fa-twitter tw"></i>
                        <i className="fab fa-google-plus-g google"></i>
                    </div>
                </Form>
            </div>

            <div className='text-center back-home'
                onClick={() => navigate("/")}>
                &#60;&#60; go to home
            </div>


        </div>
    )
}
export default Login
import './Login.scss'
import Form from "react-bootstrap/Form";
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { postLogin } from '../../services/apiService';
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux';
import { login } from '../../store/action/userActions';
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { useTranslation, Trans } from 'react-i18next';
import NProgress from "nprogress";
import Language from '../Header/Language';
import { useSelector } from 'react-redux';
NProgress.configure({
    showSpinner: false,
    trickleSpeed: 50,

})

const Login = (props) => {
    const [isShowPassword, setIsShowPassword] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const isLogin = useSelector(state => state.user.isLogin)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { t } = useTranslation();

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
    const goToHome = () => {
        if (isLogin === true) {
            navigate("/")
        }
    }
    useEffect(() => {
        document.title = 'Login';
        goToHome()
    }, [])
    return (
        <div className='login-container'>
            <div className='header'>
                <span>{t('Login.Account')}</span>
                <button onClick={(e) => handleClickRegister()}>{t('Login.Register')}</button>
                <Language />
            </div>
            <div className='title'>
                <span>{t('Login.Login')}</span>
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
                            placeholder={t('Login.Email')}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group className="form-input-password col-12 mb-2">
                        <Form.Label className="label">Password</Form.Label>
                        <Form.Control
                            className="input"
                            type={isShowPassword ? "text" : "password"}
                            placeholder={t('Login.Password')}
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
                        <span>{t('Login.Login')}</span>
                    </button>
                    <div className="Forgot-password col-12 mb-1">
                        {t('Login.Forgot_password')}
                    </div>
                    <div className="col-12 text-center mb-1">{t('Login.Login_with')}</div>
                    <div className="col-12 social-login d-flex justify-content-center mb-1">
                        <i className="fab fa-facebook-f fb"></i>
                        <i className="fab fa-twitter tw"></i>
                        <i className="fab fa-google-plus-g google"></i>
                    </div>
                </Form>
            </div>

            <div className='text-center back-home'
                onClick={() => navigate("/")}>
                &#60;&#60; {t('Login.Back_home')}
            </div>


        </div>
    )
}
export default Login
import './Register.scss'
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify'
import { postRegister } from '../../services/apiService'
import NProgress from "nprogress";
import Language from '../Header/Language';
import { useTranslation, Trans } from 'react-i18next';
NProgress.configure({
    showSpinner: false,
    trickleSpeed: 50,

})

const Register = (props) => {
    const [isShowPassword, setIsShowPassword] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [username, setUserName] = useState("")

    const navigate = useNavigate()
    const { t } = useTranslation();

    const handleShowHidePassword = () => {
        setIsShowPassword(!isShowPassword)
    }

    const resetValue = () => {
        setEmail("")
        setPassword("")
        setUserName("")
    }

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };
    const validatePassword = (password) => {
        return String(password)
            .match(
                /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
            );
    };
    useEffect(() => {
        document.title = 'Register'
    })

    const handleSubmit = async () => {
        //validate
        const isValidEmail = validateEmail(email)
        const isValidatePassword = validatePassword(password)

        if (!isValidEmail) {
            toast.error('Invalid email!')
            return
        }
        if (!password) {
            toast.error('Password cannot be left blank!')
            return
        }
        if (!isValidatePassword) {
            toast.error('Minimum eight characters, at least one letter and one number!')
            return
        }
        //submit
        let data = await postRegister(email, password, username)
        console.log("data>>>>", data);
        if (data && data.EC === 0) {
            toast.success(data.EM)
            resetValue()
        }
        else if (data && data.EC !== 0) {
            toast.error(data.EM)
        }
    }

    const handleClickLogin = () => {
        NProgress.start()
        setTimeout(() => {
            navigate('/login')
            NProgress.done()
        }, 2000)
    }

    const handleKeyDown = (e) => {
        if (e.keyCode === 13) {
            handleSubmit()
        }
    };
    return (
        <div className='register-container'>
            <div className='header'>
                <span>{t('Register.Account')}</span>
                <button onClick={(e) => handleClickLogin()}>{t('Register.Login')}</button>
                <Language />
            </div>
            <div className='title'>
                <span>{t('Register.Register')}</span>
            </div>
            <div className='form'>
                <Form
                    className="form-login row p-5"
                    onKeyDown={(e) => handleKeyDown(e)}
                >
                    <Form.Group className="col-12 mb-4">
                        <Form.Label className="label">Email(*)</Form.Label>
                        <Form.Control
                            className="input"
                            type="email"
                            placeholder={t('Register.Email')}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group className="form-input-password col-12 mb-2">
                        <Form.Label className="label">Password(*)</Form.Label>
                        <Form.Control
                            className="input"
                            type={isShowPassword ? "text" : "password"}
                            placeholder={t('Register.Password')}
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
                    <Form.Group className="col-12 mb-4">
                        <Form.Label className="label">{t('Register.Name')}</Form.Label>
                        <Form.Control
                            className="input"
                            type="text"
                            placeholder={t('Register.Your_name')}
                            value={username}
                            onChange={(e) => setUserName(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Button
                        className="btn-submit mb-2 col-12"
                        onClick={() => handleSubmit()}
                    >
                        {t('Register.Create')}
                    </Button>
                </Form>
            </div>

            <div className='text-center back-home'
                onClick={() => navigate("/")}>
                &#60;&#60;{t('Register.Back_home')}
            </div>
        </div>
    )
}
export default Register
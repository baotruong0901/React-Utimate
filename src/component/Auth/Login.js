import './Login.scss'
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { postLogin } from '../../services/apiService';
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux';
import { login } from '../../store/action/userActions';
const Login = (props) => {
    const [isShowPassword, setIsShowPassword] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleShowHidePassword = () => {
        setIsShowPassword(!isShowPassword)
    }

    const handleSubmit = async () => {
        //validate

        //submit
        let data = await postLogin(email, password)
        if (data && data.EC === 0) {
            dispatch(login(data))
            toast.success(data.EM)
            navigate('/')
        }
        else if (data && data.EC !== 0) {
            toast.error(data.EM)
        }
    }

    const handleKeyDown = (e) => {
        if (e.keyCode === 13) {
            handleSubmit()
        }
    };
    return (
        <div className='login-container'>
            <div className='header'>
                <span>Don't have an account yet?</span>
                <button onClick={(e) => navigate('/register')}>Sign up</button>
            </div>
            <div className='title'>
                <span>Typeform</span>
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
                    <Button
                        className="btn-submit mb-2 col-12"
                        onClick={() => handleSubmit()}
                    >
                        Log in
                    </Button>
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
import "./ChangePassword.scss"
import { useState } from "react"
import { postChangePassword } from "../../services/apiService"
import { toast } from 'react-toastify'
const ChangePassword = (props) => {
    const [current_password, setCurrent_password] = useState("")
    const [new_password, setNew_password] = useState("")
    const [confirm_password, setConfirm_password] = useState("")
    const [isShowOldPassword, setIsShowOldPassword] = useState(false)
    const [isShowNewPassword, setIsShowNewPassword] = useState(false)
    const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false)

    const handleKeyDown = (e) => {
        if (e.keyCode === 13) {
            handleChangePassword()
        }
    };
    const handleShowHideOldPassword = () => {
        setIsShowOldPassword(!isShowOldPassword)
    }
    const handleShowHideNewPassword = () => {
        setIsShowNewPassword(!isShowNewPassword)
    }
    const handleShowHideConfirmPassword = () => {
        setIsShowConfirmPassword(!isShowConfirmPassword)
    }



    const handleChangePassword = async () => {
        if (new_password !== confirm_password || !new_password) {
            toast.error("Password does not match!")
            return
        }
        let data = await postChangePassword(current_password, new_password)
        if (data && data.EC === 0) {
            toast.success(data.EM)
            setCurrent_password("")
            setNew_password("")
            setConfirm_password("")
        } else {
            toast.error(data.EM)
        }
    }
    return (
        <div className="change-password">
            <form onKeyDown={(e) => handleKeyDown(e)}>
                <div className="form-group mb-3 old-password">
                    <label>Old password</label>
                    <input type={isShowOldPassword === true ? "text" : "password"}
                        className="form-control"
                        placeholder="Enter your password"
                        value={current_password}
                        onChange={(e) => setCurrent_password(e.target.value)}
                    />
                    <span onClick={() => handleShowHideOldPassword()}>
                        <i
                            className={
                                isShowOldPassword === true
                                    ? "fas fa-eye-slash"
                                    : "fas fa-eye"
                            }
                        ></i>
                    </span>
                    {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                </div>
                <div className="form-group mb-3 new-password">
                    <label>New password</label>
                    <input
                        type={isShowNewPassword === true ? "text" : "password"}
                        className="form-control"
                        placeholder="New password"
                        value={new_password}
                        onChange={(e) => setNew_password(e.target.value)}
                    />
                    <span onClick={() => handleShowHideNewPassword()}>
                        <i
                            className={
                                isShowNewPassword === true
                                    ? "fas fa-eye-slash"
                                    : "fas fa-eye"
                            }
                        ></i>
                    </span>
                </div>
                <div className="form-group mb-3 confirm-password">
                    <label>Confirm password</label>
                    <input
                        type={isShowConfirmPassword === true ? "text" : "password"}
                        className="form-control"
                        placeholder="Confirm password"
                        value={confirm_password}
                        onChange={(e) => setConfirm_password(e.target.value)}
                    />
                    <span onClick={() => handleShowHideConfirmPassword()}>
                        <i
                            className={
                                isShowConfirmPassword === true
                                    ? "fas fa-eye-slash"
                                    : "fas fa-eye"
                            }
                        ></i>
                    </span>
                </div>
                <button type="button"
                    className="btn btn-primary col-12"
                    onClick={() => handleChangePassword()}>Change</button>
            </form>
        </div>
    )
}
export default ChangePassword
import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom";
const PrivateRoute = (props) => {

    const isLogin = useSelector(state => state.user.isLogin)
    // const userInfo = useSelector(state => state.user.userInfo)
    if (!isLogin) {
        return <Navigate to="/login"></Navigate>
    }
    console.log(props);
    return (
        <>
            {props.children}
        </>
    )
}
export default PrivateRoute
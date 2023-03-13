import { useSelector } from "react-redux"
import videoHomepage from "../../assets/video-homepage.mp4"
import { useNavigate } from "react-router-dom"
import "./HomePage.scss"
const HomePage = (props) => {
    const isLogin = useSelector(state => state.user.isLogin)
    const navigate = useNavigate()

    // const handleStartQuiz = () => {
    //     setTimeout(() => {
    //         navigate("users")
    //     }, 3000)
    // }
    return (
        <div className="homepage-container">
            <video autoPlay muted loop>
                <source src={videoHomepage} type="video/mp4" />
            </video>
            <div className="homepage-content col-4">
                <div className="homepage-content-header">
                    <span>There's a better way to ask</span>
                </div>
                <div className="homepage-content-text">
                    You don't want to make a boring form.
                    And your audience won't answer one.
                    Create a typeform instead -  and make everyone happy.
                </div>
                {isLogin === true ?
                    <button onClick={() => navigate("users")}>Doing Quiz Now</button>
                    :
                    <button onClick={() => navigate("login")}>Get's started. It's free</button>
                }
            </div>
        </div>
    )
}
export default HomePage
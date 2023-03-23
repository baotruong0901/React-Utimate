import { useSelector } from "react-redux"
import videoHomepage from "../../assets/video-homepage.mp4"
import { useNavigate } from "react-router-dom"
import "./HomePage.scss"
import { useEffect } from "react"
import { useTranslation, Trans } from 'react-i18next';
const HomePage = (props) => {
    const isLogin = useSelector(state => state.user.isLogin)
    const navigate = useNavigate()
    const { t } = useTranslation();
    useEffect(() => {
        document.title = 'Quiz App';
    })
    return (
        <div className="homepage-container">
            <video autoPlay muted loop>
                <source src={videoHomepage} type="video/mp4" />
            </video>
            <div className="homepage-content col-4">
                <div className="homepage-content-header">
                    <span>
                        {t('homepage.content-header')}
                    </span>
                </div>
                <div className="homepage-content-text">
                    {t('homepage.content-text')}
                </div>
                {isLogin === true ?
                    <button onClick={() => navigate("users")}>{t('homepage.button.doing')}</button>
                    :
                    <button onClick={() => navigate("login")}>{t('homepage.button.login')}</button>
                }
            </div>
        </div>
    )
}
export default HomePage
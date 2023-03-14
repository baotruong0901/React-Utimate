import { useEffect } from "react"

const DashBoard = (props) => {
    useEffect(() => {
        document.title = 'Dashboard';
    })
    return (
        <div>DashBoard</div>
    )
}
export default DashBoard
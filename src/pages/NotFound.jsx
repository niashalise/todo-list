import { NavLink } from "react-router"

function NotFound () {
    return (
        <div>
            <h1>Page Not Found</h1>
            <NavLink to="/">Back Home</NavLink>
        </div>
    )
}

export default NotFound
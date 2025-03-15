import { Link } from "react-router-dom"

export const LinkBtn = ({path, text}) => {
    return(
        <Link className=" bg-button text-white px-6 py-2 rounded-md" to={path}> {text} </Link>
    )
}
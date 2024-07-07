import { Link, withRouter } from "react-router-dom"
import Cookies from 'js-cookie'
import { IoMdAddCircleOutline } from "react-icons/io";
import { MdOutlineLogout } from "react-icons/md";
import "./index.css"

const Header = (props) => {
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.push('/login')
  }

  return (
    <div className="navbar">
        <Link to="/" className="nav-link-ele">
            <h1 className="nav-posts-heading">Posts</h1>
        </Link>
        <div className="nav-create-logout-button">
        <Link to="/create" className="nav-link-ele">
            <button type="button" className="nav-button">
                Create Post
            </button>
            <button type="button" className="nav-button-small">
                <IoMdAddCircleOutline />
            </button>
        </Link>
        <button type="button" className="nav-button" onClick={onClickLogout}>
          Logout
        </button>
        <button type="button" className="nav-button-small" onClick={onClickLogout}>
          <MdOutlineLogout />
        </button>
        </div>
    </div>
)}

export default withRouter(Header)
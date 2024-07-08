import { Link } from "react-router-dom"
import "./index.css"

const Popup = (props) => {
    const {trigger, onClickCloseButton} = props 
    return (
        <>
            {trigger ? (
                <div className="popup">
                    <div className="popup-inner">
                        <button type="button" className="close-btn" onClick={() => onClickCloseButton()}>Close</button>
                        <h1>Your Post is created Successfully!</h1>
                        <Link to="/" className="link-element-popup">
                            <button type="button" className="see-post-button">See Post</button>
                        </Link>
                    </div>
                </div>
            ) : ""}
        </>
    )
}

export default Popup
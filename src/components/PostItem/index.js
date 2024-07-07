import "./index.css"
import { BiLike } from "react-icons/bi";
import { BiDislike } from "react-icons/bi";
import { MdEdit } from "react-icons/md";
import { FaEye } from "react-icons/fa";

const PostItem = (props) => {
    const {postDetail, onClickEditButton} = props
    const {id, title, body, reactions, views} = postDetail 
    const {likes, disLikes} = reactions

    const onClickEdit = () => {
        onClickEditButton(id)
    }

    return (
        <li className="post-item">
            <img src="https://res.cloudinary.com/dksovm4dg/image/upload/v1714630084/samples/coffee.jpg" className="post-img" />
            <h1 className="post-title">{title}</h1>
            <p className="post-description">{body}</p>
            <div className="likes-edit-container">
                <div className="like-dislike-container">
                    <div className="like-container">
                        <BiLike className="logo" />
                        <p>{likes} likes</p>
                    </div>
                    <div className="like-container">
                        <BiDislike className="logo" />
                        <p>{disLikes} dislikes</p>
                    </div>
                    <div className="like-container">
                        <FaEye className="logo" />
                        <p>{views} views</p>
                    </div>
                </div>
                <div>
                    <button type="button" className="edit-btn" onClick={onClickEdit}>
                        <MdEdit className="logo" />
                        <p className="edit-text">Edit</p>
                    </button>
                </div>
            </div>
        </li>
    )
}

export default PostItem 
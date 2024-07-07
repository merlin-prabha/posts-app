import { Component } from "react"
import "./index.css"
import Header from "../Header"

class CreatePost extends Component {
    state = {inputImageUrl: "", inputTitle: "", inputDescription: ""}
    render() {
        return (
            <>
                <Header />
                <div className="create-post-content-container">
                <form className="create-post-container">
                    <h1 className="create-post-heading">Let's Create A Post!</h1>
                    <label className="create-post-label" htmlFor="image">Image URL</label>
                    <input id="image" placeholder="Enter Image URL" className="create-post-input" />
                    <label className="create-post-label" htmlFor="title">Title</label>
                    <input id="title" placeholder="Enter Title for your Post" className="create-post-input" />
                    <label className="create-post-label" htmlFor="image">Description</label>
                    <textarea id="image" placeholder="Enter Description for your Post" className="create-post-textarea form-control" cols="30" rows="10" />
                </form>
                </div>
            </>
        )
    }
}

export default CreatePost 
import { Component } from "react"
import "./index.css"
import Header from "../Header"
import Popup from "../PopUp"



class CreatePost extends Component {
    state = {inputImageUrl: "", inputTitle: "", inputDescription: "", isErrorInTitle: false, isErrorInDescription: false, newPost: [], isSuccess: false}

    onClickCreate = () => {
        const {inputImageUrl, inputTitle, inputDescription} = this.state 
        if (inputTitle === "") {
            this.setState(prevState => ({isErrorInTitle: !prevState.isErrorInTitle}))
        }
        else if (inputDescription === "") {
            this.setState(prevState => ({isErrorInDescription: !prevState.isErrorInDescription}))
        }
        else {
            this.setState(prevState => ({newPost: {
                image: inputImageUrl,
                title: inputTitle,
                body: inputDescription,
                likes: 0,
                disLikes: 0,
                views: 0,
            }, isErrorInDescription: !prevState.isErrorInDescription, isErrorInTitle: !prevState.isErrorInTitle, isSuccess: !prevState.isSuccess}))
        }
        
    }


    onChangeImageURL = (e) => {
        this.setState({inputImageUrl: e.target.value})
    }

    onChangeTitle = (e) => {
        this.setState({inputTitle: e.target.value})
    }

    onChangeDescription = (e) => {
        this.setState({inputDescription: e.target.value})
    }

    onClickCloseButton = () => {
        this.setState(prevState => ({isSuccess: !prevState.isSuccess}))
    }

    render() {
        const {inputImageUrl, inputTitle, inputDescription, isErrorInTitle, isErrorInDescription, newPost, isSuccess} = this.state
        console.log(newPost)
        return (
            <>
                <Header />
                <div className="create-post-content-container">
                    <form className="create-post-container">
                        <h1 className="create-post-heading">Let's Create A Post!</h1>
                        <label className="create-post-label" htmlFor="image">Image URL</label>
                        <input value={inputImageUrl} onChange={this.onChangeImageURL} id="image" placeholder="Enter Image URL" className="create-post-input" />
                        <label className="create-post-label" htmlFor="title">Title</label>
                        <input value={inputTitle} onChange={this.onChangeTitle} id="title" placeholder="Enter Title for your Post" className="create-post-input" />
                        {isErrorInTitle && <p className="error-msg">* Please fill this field</p>}
                        <label className="create-post-label" htmlFor="image">Description</label>
                        <textarea value={inputDescription} onChange={this.onChangeDescription} id="image" placeholder="Enter Description for your Post" className="create-post-textarea form-control" cols="30" rows="10" />
                        {isErrorInDescription && <p className="error-msg">* Please fill this field</p>}
                        <button type="button" className="create-btn" onClick={this.onClickCreate}>Create</button>
                    </form>
                    <Popup trigger={isSuccess} onClickCloseButton={this.onClickCloseButton} />
                </div>

            </>
        )
    }
}

export default CreatePost 
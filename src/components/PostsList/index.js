import { Component } from "react"
import {TailSpin} from "react-loader-spinner"
import { Link } from "react-router-dom"
import "./index.css"
import Header from "../Header"
import PostItem from "../PostItem"

const apiStatusConstants = {
    initial: 'INITIAL',
    success: 'SUCCESS',
    failure: 'FAILURE',
    loading: 'LOADING',
  }

class PostsList extends Component {
    state = {postsList: [], apiStatus: apiStatusConstants.initial, isEditClicked: false, postToEdit: {}, editedTitle: '', editedDescription: ''}

    componentDidMount() {
        this.getPostsList()
    }

    getPostsList = async() => {
        this.setState({apiStatus: apiStatusConstants.loading})
        const url = 'https://dummyjson.com/posts';
        const options = {
            method: 'GET',
        };
        const response  = await fetch(url, options)
        if (response.ok) {
            const fetchedData = await response.json()
              this.setState({
                apiStatus: apiStatusConstants.success,
                postsList: fetchedData.posts,
              })
        }
        else {
            this.setState({apiStatus: apiStatusConstants.failure})
        }
        
    } 


    renderPostFailure = () => (
        <div className="post-failure-container">
          <img
            src="https://res.cloudinary.com/dksovm4dg/image/upload/v1714716969/post_failure_alert_triangle_qa6uwd.png"
            alt="alert"
            className="fail-alert-image"
          />
          <p className="failure-message">Something went wrong. Please try again</p>
          <button
            type="button"
            className="post-try-again-button"
          >
            Try Again
          </button>
        </div>
      )

      renderPostsSuccess = () => {
        const {postsList} = this.state
        console.log(postsList)
        return (
          <div className="posts-create-btn-container">
            <ul className="posts-list-container">
                {postsList.map(each => (
                    <PostItem postDetail={each} key={each.id} onClickEditButton={this.onClickEditButton} />
                ))}
            </ul>
              <Link to="/create" className="link-element-postslist">
                <button type="button" className="create-btn">Create</button>
              </Link>
          </div>
        )
      }
    
      renderLoadingView = () => (
        <div className="loader-container">
          <TailSpin color="#0b69ff" height="50" width="50" />
        </div>
      )

      onClickEditButton = (id) => {
        const {postsList} = this.state 
        this.setState({isEditClicked: true})
        const editPost = postsList.find(each => each.id === id)
        const {title, body} = editPost
        this.setState({postToEdit: editPost, editedTitle: title, editedDescription: body})
        console.log(editPost)
        console.log("Edit is clicked")
      }
    
      renderPosts = () => {
        const {apiStatus} = this.state
        switch (apiStatus) {
          case apiStatusConstants.loading:
            return this.renderLoadingView()
          case apiStatusConstants.failure:
            return this.renderPostFailure()
          case apiStatusConstants.success:
            return this.renderPostsSuccess()
          default:
            return ''
        }
      }
    
    onChangeTitle = (e) => {     
      this.setState({editedTitle: e.target.value})     
    }

    onChangeDescription = (e) => {
      this.setState({editedDescription: e.target.value})
    }

    onClickSave = (e) => {
      e.preventDefault()
      const {postToEdit} = this.state
      const {id} = postToEdit
      this.setState(prevState => ({
        postsList: prevState.postsList.map(each => {   
          if (each.id === id) {
            const {editedTitle, editedDescription} = this.state
            return {...each, title: editedTitle, body: editedDescription}
        }
        return each
        })
        , isEditClicked: !prevState.isEditClicked}))
    }

    renderForm = () => {
      const {editedTitle, editedDescription, postToEdit} = this.state 
      console.log(postToEdit)
      return (
        <form className="form-container">
            <label className="label" htmlFor="title">Enter Title</label>
            <input onChange={this.onChangeTitle} placeholder="Enter Updated Title" id="title" value={editedTitle} className="title-input" />
            <label className="label" htmlFor="description">Enter Description</label>
            <textarea onChange={this.onChangeDescription} placeholder="Enter updated Description" id="description" value={editedDescription} className="input-description" cols="30" rows="10" />
            <button onClick={this.onClickSave} type="submit" className="save-btn">Save</button>
        </form>
      )
    }


    render() {
        const {isEditClicked} = this.state
        
        return (
            <>
                <Header />
                {isEditClicked && this.renderForm()}
                <div className="posts-container">
                   {this.renderPosts()}
                </div>
            </>
        )
    }
}

export default PostsList 
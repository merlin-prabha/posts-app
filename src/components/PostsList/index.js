import { Component } from "react"
import {TailSpin} from "react-loader-spinner"
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
    state = {postsList: [], apiStatus: apiStatusConstants.initial}

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

    onClickPostRetryButton = () => {
        this.getPostsData()
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
            onClick={this.onClickPostRetryButton()}
          >
            Try Again
          </button>
        </div>
      )

      renderPostsSuccess = () => {
        const {postsList} = this.state
        console.log(postsList)
        return (
            <ul className="posts-list-container">
                {postsList.map(each => (
                    <PostItem postDetail={each} key={each.id} />
                ))}
            </ul>
        )
      }
    
      renderLoadingView = () => (
        <div className="loader-container">
          <TailSpin color="#0b69ff" height="50" width="50" />
        </div>
      )
    
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

    render() {
        
        return (
            <>
                <Header />
                <div className="posts-container">
                   {this.renderPosts()}
                </div>
            </>
        )
    }
}

export default PostsList 
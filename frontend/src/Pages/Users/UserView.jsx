import React, { useState, useEffect } from "react"
import Navbar from "../../Components/Navbar"
import Posts from '../../Components/Posts'
import Spinner from "../../Components/Loading"
import Axios from "axios"
import { useParams } from "react-router-dom"
function UserView(props) {
  const errorInitial = { database: false }
  const [error, setError] = useState(errorInitial)
  const [spinner, setSpinner] = useState(false)
  const [posts, setPosts] = useState([])
  const [userProfile, setUserProfile] = useState(false)
  const [details, setDetails] = useState(false)
  const { userId } = useParams()
  useEffect(() => {
    changeMenu()
  }, [])
  function changeMenu(e) {
    setSpinner(true)
    Axios
      .get("/public/user?userName=" + userId + "&logged=" + props.logged + "&token=" + props.token)
      .then(res => {
        if (res.data.error) {
          setError({ ...error, database: res.data.error })
        } else {
          console.log(res.data)
          setError(errorInitial)
          setPosts(res.data.posts)
          setDetails(res.data.details)
          setUserProfile(res.data.details.profilePath)
        }
        setSpinner(false)
      })
      .catch(err => console.log(err))
  }
  return (
    <div className="profile">
      <Navbar />
      <div className="user-profile">
        {
          details
            ?
            <div>
              <div className="user-credentials row">
                <div className="user-profile-image-container">
                  <img src={userProfile ? userProfile : "/images/face.jpg"} className="user-profile-image" alt="logo" />
                </div>
                <div className="text-container">
                  <div className="user-name">
                    <h5 className="text">username - {details.userName}</h5>
                  </div>
                  <div className="user-nick-name">
                    <h5 className="text">nickname - {details.nickName}</h5>
                  </div>
                </div>
              </div>
              <div className="user-post-container row">
                <div className="user-post-menu">
                  <div className="menu active">
                    Posts
                  </div>
                </div>
                {
                  error.database ?
                    <h3 className="error-text">{error.database}</h3>
                    :
                    ""
                }
                {
                  posts.length === 0
                    ?
                    <h3 className="no-posts-found">No posts found</h3>
                    :
                    posts.map((post) => {
                      return (
                        <div key={post._id}>
                          <Posts
                            key={post._id}
                            id={post._id}//postId used to get the posts container
                            postLink={"/posts/all/" + post._id}
                            userLink={"/user/" + post.userId}
                            subject={post.subject}
                            image={post.images[0]}
                            title={post.title}
                            authorImage={post.authorImage ? post.authorImage : "/images/face.jpg"}
                            nickName={post.nickName}
                            time={post.aboutPost.time + "," + post.aboutPost.date}
                            views={post.views}
                            likes={post.likes}
                            disLikes={post.disLikes}
                            tags={post.tagIds}
                            action={post.action}
                          />
                        </div>
                      )
                    })
                }
              </div>
            </div>
            :
            <h3 className="error-text">No user found,Try again</h3>

        }

      </div>
      {
        spinner
          ?
          <Spinner></Spinner>
          :
          ""
      }
    </div>
  )
}
export default UserView
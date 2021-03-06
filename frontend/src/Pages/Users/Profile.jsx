import React, { useState, useEffect } from "react"
import Navbar from "../../Components/Navbar"
import Posts from '../../Components/Posts'
import Spinner from "../../Components/Loading"
import Axios from "axios"
import compressImage from "../../Components/imageCompression"
function Post() {
  const errorInitial = { database: false, image: false }
  const [error, setError] = useState(errorInitial)
  const [menu, setMenu] = useState("Your post")
  const [spinner, setSpinner] = useState(false)
  const [posts, setPosts] = useState([])
  const [userProfile, setUserProfile] = useState(false)
  const [details, setDetails] = useState(false)
  useEffect(() => {
    changeMenu()
  }, [])
  function changeMenu(e) {
    setSpinner(true)
    var type = "myPost";
    if (e) {
      type = e.target.textContent === "Your post" ? "myPost" : e.target.textContent
      setMenu(e.target.textContent)
    }
    const data = JSON.parse(localStorage.getItem("UserData"))
    Axios
      .get("/user?userName=" + data.userName + "&type=" + type, {
        headers: {
          'Authorization': `token ${data.token}`
        }
      })
      .then(res => {
        if (res.data.error) {
          setError({ ...error, database: res.data.error })
        } else {
          setError(errorInitial)
          setPosts(res.data.posts)
          setDetails(res.data.details)
          setUserProfile(res.data.details.profilePath)
        }
        setSpinner(false)
      })
      .catch(err => console.log(err))
  }
  async function updateUserPhoto(e) {
    setSpinner(true)
    const compressedImage = await compressImage(e.target.files[0], 0.300)
    var data = JSON.parse(localStorage.getItem("UserData"))
    var image = new FormData()
    image.append("page", "/profile")
    image.append("uploadImage", compressedImage[0])
    Axios
      .post("/update-profile", image, {
        headers: {
          'Authorization': `token ${data.token}`
        }
      })
      .then(res => {
        if (res.data.error) {
          setError({ ...error, image: res.data.error })
        } else {
          setError(errorInitial)
          setUserProfile(compressedImage[1])
        }
        setSpinner(false)
      })
      .catch(err => {
        console.log(err)
      })
  }
  function deletePost(e) {
    setSpinner(true)
    var data = JSON.parse(localStorage.getItem("UserData"))
    Axios
      .post("/delete-post", { id: e.target.id.split("deletePost")[1] }, {
        headers: {
          'Authorization': `token ${data.token}`
        }
      })
      .then(res => {
        if (res.data.error) {
          setError({ ...error, image: res.data.error })
        } else {
          setError(errorInitial)
          window.location = "/profile"
        }
        setSpinner(false)
      })
      .catch(err => {
        console.log(err)
      })
  }
  return (
    <div className="profile">
      <Navbar active="profile" />
      <div className="user-profile">
        {
          details
            ?
            <div>
              <div className="user-credentials row">
                <div className="user-profile-image-container">
                  <label htmlFor="uploadImage"><img src={userProfile ? userProfile : "/images/face.jpg"} className="user-profile-image" alt="logo" /></label>
                  <input type="file" onChange={updateUserPhoto} id="uploadImage" />
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
              {
                error.image ?
                  <h5 className="error-text" style={{ display: "block" }}>{error.image}</h5>
                  :
                  ""
              }
              <div className="user-post-container row">
                <div className="user-post-menu">
                  <div className={menu === "Your post" ? "menu active" : "menu"} onClick={changeMenu}>
                    Your post
                  </div>
                  <div className={menu === "Liked post" ? "menu active" : "menu"} onClick={changeMenu}>
                    Liked post
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
                          {
                            menu === "Liked post" ? "" : <div id={"deletePost" + post._id} onClick={deletePost} className="deletepost-button">Delete post</div>

                          }
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
export default Post
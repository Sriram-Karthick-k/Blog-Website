import React, { useEffect, useState } from "react"
import Spinner from "../../Components/Loading"
import Axios from "axios"
import { useParams } from "react-router"
import Navbar from "../../Components/Navbar"
function PostRead(props) {
  const errorInitial = { database: false }
  const [spinner, setSpinner] = useState(false)
  const [error, setError] = useState(errorInitial)
  const { blogid } = useParams()
  const [postDetails, setPostDetails] = useState(false)
  useEffect(() => {
    setSpinner(true)
    Axios
      .get("/getBlog?blogId=" + blogid + "&logged=" + props.logged + "&token=" + props.token)
      .then((res) => {
        if (res.data.error) {
          setError({ database: res.data.error })
        } else {
          setError(errorInitial)
          setPostDetails(res.data)
          document.getElementById("post-content").innerHTML = res.data.subject
        }
        setSpinner(false)
      })
      .catch(err => { setSpinner(false) })
  }, [])
  function actionUpdate(e) {
    setSpinner(true)
    var type = e.target.id
    type = type.split("-")[type.split("-").length - 1]
    Axios
      .get("/action?blogId=" + postDetails._id + "&type=" + type, {
        headers: {
          'Authorization': `token ${props.token}`
        }
      })
      .then(res => {
        if (res.data.error) {
          setError({ ...error, database: res.data.error })
        } else {
          setError(errorInitial)
          var action = { liked: false, disLiked: false, view: postDetails.action.view }
          var likes = postDetails.likes
          var disLikes = postDetails.disLikes
          if (type === "like") {
            if (!postDetails.action.liked) {
              likes += 1
            }
            if (postDetails.action.disLiked) {
              disLikes -= 1
            }
            action.liked = true
            action.disLiked = false
            if (postDetails.action.liked) {
              likes -= 1
              action.liked = false
            }
          } else if (type === "disLike") {
            if (!postDetails.action.disLiked) {
              disLikes += 1;
            }
            if (postDetails.action.liked) {
              likes -= 1;
            }
            action.liked = false
            action.disLiked = true
            if (postDetails.action.disLiked) {
              disLikes -= 1
              action.disLiked = false
            }
          }
          console.log(disLikes, likes, action)
          setPostDetails({ ...postDetails, action: action, likes: likes, disLikes: disLikes })
        }
        setSpinner(false)
      })
      .catch(err => {
        console.log(err)
        setSpinner(false)
      })
  }
  return (
    <div className="post-read">
      <Navbar />
      {
        error.database
          ?
          <h3 className="error-text">{error.database}</h3>
          : ""
      }
      {
        postDetails
          ?
          <div className="post-read-container row">
            {
              postDetails.images ?
                <div className="col col-lg-12 col-md-12 col-sm-12 col-12">
                  <img src={postDetails.images[0]} className="postImage" alt="post" />
                </div> :
                <div className="col col-lg-12 col-md-12 col-sm-12 col-12">
                </div>
            }

            <div className="heading">
              <h1 className="post-heading">{postDetails.title}</h1>
            </div>
            <div className="post-content col col-lg-12 col-md-12 col-sm-12 col-12" id="post-content">
            </div>
            <div className="post-details-top row">
              <div className="author-details-holder col col-lg-6 col-md-6 col-sm-12 col-12">
                <a href={"/user/" + postDetails.userId} className="author-image">
                  <img className="image" src={postDetails.authorImage ? postDetails.authorImage : "/images/face.jpg"} alt="face" />
                </a>
                <div className="author-details">
                  <div className="nick-name"><a className="text" href={"/user/" + postDetails.userId}>{postDetails.nickName}</a> </div>
                  <div className="time">
                    <p>{postDetails.aboutPost.time + "," + postDetails.aboutPost.date}</p>
                  </div>
                </div>
              </div>
              <div className="like-details col col-lg-6 col-sm-12 col-md-6 col-12">
                <div className={postDetails.action.view ? "icon active" : "icon"} >
                  <i className="fas fa-eye"></i>
                  <p className="icon-text">{postDetails.views}</p>
                </div>
                <div className={postDetails.action.disLiked ? "icon active" : "icon"} onClick={actionUpdate} id={"cotainer-disLike"} data-toggle={props.logged === true ? "" : "modal"} data-target={props.logged === true ? "" : "#modalCenterSignIn"}>
                  <i className="fas fa-thumbs-down" id={"logo-disLike"}></i>
                  <p className="icon-text" id="text-disLike">{postDetails.disLikes}</p>
                </div>
                <div className={postDetails.action.liked ? "icon active" : "icon"} onClick={actionUpdate} id="container-like" data-toggle={props.logged === true ? "" : "modal"} data-target={props.logged === true ? "" : "#modalCenterSignIn"}>
                  <i className="fas fa-thumbs-up" id="logo-like" ></i>
                  <p className="icon-text" id="text-like">{postDetails.likes}</p>
                </div>
              </div>
            </div>
            <div className="post-details-bottom">
              <h2 className="tagTitle" >tags</h2>
              <div className="tag-holder">
                {
                  postDetails.tagIds ?
                    postDetails.tagIds.map((item) => {
                      return (
                        <a href={"/posts/" + item.tagName} className="tagTitle tags" key={item._id} >{item.tagName}</a>
                      )
                    })
                    :
                    <h2 className="tagTitle tags">No tags</h2>
                }
              </div>
            </div>
          </div>
          :
          ""
      }
      {
        spinner
          ?
          <Spinner />
          :
          ""
      }
    </div>
  )
}
export default PostRead
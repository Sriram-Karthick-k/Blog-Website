import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Navbar from "../../Components/Navbar"
import Posts from "../../Components/Posts"
import Axios from "axios"
import Spinner from "../../Components/Loading"
function Index(props) {
  const errorInitial = { database: false }
  const [posts, setPosts] = useState([])
  const [error, setError] = useState(errorInitial)
  const [spinner, setSpinner] = useState(false)
  const [loadCount, setLoadCount] = useState(1)
  var { id } = useParams()
  useEffect(() => {
    setSpinner(true)
    Axios
      .get("/getPost?type=" + id + "&pgno=" + loadCount + "&logged=" + props.logged + "&token=" + props.token)
      .then(res => {
        if (res.data.error) {
          setError(res.data.error)
        } else {
          setError(errorInitial)
          setLoadCount(loadCount + 1)
          setPosts(res.data)
        }
        setSpinner(false)
      })
      .catch(err => {
        setSpinner(false)
      })
  }, [])
  function loadMore() {
    setSpinner(true)
    Axios
      .get("/getPost?type=" + id + "&pgno=" + loadCount + "&logged=" + props.logged + "&token=" + props.token)
      .then(res => {
        if (res.data.error) {
          setError(res.data.error)
        } else {
          console.log(res.data)
          if (res.data.length === 0) {
            setLoadCount(false)
          } else {
            setLoadCount(loadCount + 1)
          }
          setError(errorInitial)
          setPosts([...posts, ...res.data])
        }
        setSpinner(false)
      })
      .catch(err => {
        setSpinner(false)
      })
  }
  return (
    <div className="index">
      <Navbar active="home" />
      <div className="post-container">
        {
          error.database
            ?
            <h3 className="error-text">{error.database}</h3>
            :
            ""
        }
        {
          posts.length === 0
            ?
            <h3 className="noBlogText">No blog found</h3>
            :
            <div id="index-post-container">
              {
                posts.map((post) => {
                  return (
                    <Posts
                      key={post._id}
                      id={post._id}//postId used to get the posts container
                      postLink={"/posts/" + id + "/" + post._id}
                      userLink={"/user/" + post.userId}
                      subject={post.subject}
                      image={post.images ? post.images[0] : false}
                      title={post.title}
                      authorImage={post.authorImage ? post.authorImage : "/images/face.jpg"}
                      nickName={post.nickName}
                      time={post.aboutPost.time + "," + post.aboutPost.date}
                      views={post.views}
                      likes={post.likes}
                      disLikes={post.disLikes}
                      tags={post.tagIds}
                      action={post.action}
                      loggedIn={props.logged}
                    />
                  )
                })
              }
              {
                loadCount
                  ?
                  <div onClick={loadMore} className="load-more">
                    load more
                  </div>
                  :
                  <h3 className="error-text">No more post</h3>
              }
            </div>
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
export default Index;
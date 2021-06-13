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
  var { id } = useParams()
  useEffect(() => {
    setSpinner(true)
    var con = true
    props.logged
      ?
      Axios
        .get("/getPost?type=" + id)
        .then(res => {
          if (res.data.error) {
            setError(res.data.error)
          } else {
            console.log(res.data)
            setPosts(res.data)
          }
          setSpinner(false)
        })
        .catch(err => {
          setSpinner(false)
        })
      :
      con = false
  }, [])
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
            posts.map((post) => {
              return (
                <Posts
                  key={post._id}
                  pageId={id}
                  id={post._id}
                  subject={post.subject}
                  image={post.images[0]}
                  postTextContent={post.subject}
                  title={post.title}
                  authorImage={post.authorImage ? post.authorImage : "/images/face.jpg"}
                  nickName={post.nickName}
                  time={post.aboutPost.time + "," + post.aboutPost.date}
                  views={post.views}
                  likes={post.likes}
                  disLikes={post.disLikes}
                  tags={post.tagIds}
                  userId={post.userId}
                />
              )
            })
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
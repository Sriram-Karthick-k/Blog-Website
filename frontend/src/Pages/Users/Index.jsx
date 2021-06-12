import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Navbar from "../../Components/Navbar"
import Posts from "../../Components/Posts"
import Axios from "axios"
import Spinner from "../../Components/Loading"
function Index() {
  const errorInitial = { database: false }
  const [posts, setPosts] = useState([])
  const [error, setError] = useState(errorInitial)
  const [spinner, setSpinner] = useState(false)
  useEffect(() => {
    setSpinner(true)
    Axios
      .get("/getPost")
      .then(res => {
        if (res.data.err) {
          setError(res.data.error)
        } else {
          setPosts(res.data)
        }
        setSpinner(false)
      })
      .catch(err => {
        setSpinner(false)
      })
  }, [])
  return (
    <div className="index">
      <Navbar active="home" />
      <div className="post-container">
        {
          posts.map((post, index) => {
            return (
              <div key={index}>
                <Posts
                  id={post._id}
                  subject={post.subject}
                  image={post.images[0]}
                  postTextContent={post.subject}
                  title={post.title}
                  authorImage="images/face.jpg"
                  nickName="sriram karthick"
                  time={post.aboutPost.time + "," + post.aboutPost.date}
                  views={post.views}
                  likes={post.likes}
                  disLikes={post.disLikes}
                  tags={post.tagIds}
                />
              </div>
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
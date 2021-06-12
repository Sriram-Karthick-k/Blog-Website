import React, { useEffect } from "react"

function Posts(props) {
  useEffect(() => {
    document.getElementById(props.id).innerHTML = props.subject.slice(0, 250) + "<a href=#>read more...</a>"

  }, [])
  return (
    <div className="container posts" key={props.id}>
      <div className="post-content row">
        {
          props.image ?
            <div className="col col-lg-12 col-md-12 col-sm-12 col-12">
              <img src={props.image} className="postImage" alt="post" />
            </div> :
            <div className="col col-lg-12 col-md-12 col-sm-12 col-12">
            </div>
        }

        <div className="post-text-holder col col-lg-12 col-md-12 col-sm-12 col-12">
          <h1 className="post-title" >{props.title}</h1>
          <p className="post-text-content" id={props.id} >
          </p>
        </div>
      </div>
      <div className="post-details row">
        <div className="post-details-top row">
          <div className="author-details-holder col col-lg-6 col-md-6 col-sm-12 col-12">
            <div className="author-image">
              <img className="image" src={props.authorImage} alt="face" />
            </div>
            <div className="author-details">
              <div className="nick-name"> <a className="text" href="#">{props.nickName}</a> </div>
              <div className="time">
                <p>{props.time}</p>
              </div>
            </div>
          </div>
          <div className="like-details col col-lg-6 col-sm-12 col-md-6 col-12">
            <div className="icon">
              <i className="fas fa-eye"></i>
              <p className="icon-text">{props.views}</p>
            </div>
            <div className="icon">
              <i className="fas fa-thumbs-down"></i>
              <p className="icon-text">{props.disLikes}</p>
            </div>
            <div className="icon">
              <i className="fas fa-thumbs-up"></i>
              <p className="icon-text">{props.likes}</p>
            </div>
          </div>
        </div>
        <div className="post-details-bottom">
          <h2 className="tagTitle" >tags</h2>
          <div className="tag-holder">
            {
              props.tags ?
                props.tags.map((item) => {
                  return (
                    <a className="tagTitle tags" key={item._id} >{item.tagName}</a>
                  )
                })
                :
                <h2 className="tagTitle tags">No tags</h2>
            }
          </div>
        </div>
      </div>
    </div>
  )
}
export default Posts
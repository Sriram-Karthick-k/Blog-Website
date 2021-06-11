import React, { useEffect, useState } from "react"
import Axios from "axios"
import Navbar from "../../Components/Navbar"
import Spinner from "../../Components/Loading"
import compressImage from "../../Components/imageCompression"
import Editor from "../../Components/Editor"
import { v4 as uuid } from "uuid"

function Compose() {
  const errorInitial = { image: false, tagsError: false, upload: false }
  const [spinner, setSpinner] = useState(false)//page spinner
  const [images, setImages] = useState([])//image stack
  const [error, setError] = useState(errorInitial)
  const [imagesUrl, setImagesUrl] = useState([])//iimage url stack
  const [tags, setTags] = useState([])
  const [searchedTags, setSearchedTags] = useState([])
  const [selectedTags, setSelectedTags] = useState([])
  const [searchedText, setSearchedText] = useState(false)
  useEffect(() => {

    //getting tags from the back end and setting that tags to tags hook
    var promise = new Promise((res, rej) => {
      setSpinner(true)
      var userData = JSON.parse(localStorage.getItem("UserData"))
      if (userData.token) {
        res(userData.token)
      } else {
        rej()
      }
    })
    promise.then(res => {
      Axios
        .get("/tags", {
          headers: {
            'Authorization': `token ${res}`
          }
        })
        .then(res => {
          if (res.data.error) {
            setError({ ...error, tagsError: res.data.error })
            setSpinner(false)
          } else {
            console.log(res.data)
            setError(errorInitial)
            setTags(res.data)
            setSpinner(false)
          }
        })
        .catch(err => console.log(err))
    })
      .catch(err => {
        console.log(err)
        setSpinner(false)
      })
  }, [])

  //add images to the stack 
  async function addImage(e) {
    setSpinner(true)
    const imageFile = e.target.files[0];
    var compressedImageWithUrl = await compressImage(imageFile, .500)
    if (compressedImageWithUrl) {
      setImages([...images, compressedImageWithUrl[0]])
      setImagesUrl([...imagesUrl, compressedImageWithUrl[1]])
      setError(errorInitial)
      setSpinner(false)
    } else {
      setError({ ...error, image: "Image upload failes or the file is not an image" })
      setSpinner(false)
    }
  }
  //removes the image from the uploaded image
  function removeImage(e) {
    var index = e.target.id.split("-")[e.target.id.split("-").length - 1]
    images.splice(index, 1)
    imagesUrl.splice(index, 1)
    setImages([...images])
    setImagesUrl([...imagesUrl])
  }
  //selecting tag
  function selectTag(e) {
    setSpinner(true)
    var id = e.target.id.split("-")
    id = id[id.length - 1]
    for (var i = 0; i < selectedTags.length; i++) {
      if (id === selectedTags[i]._id) {
        removeTag(e)
        return
      }
    }
    var tag = {
      _id: id,
      tagName: e.target.textContent
    }
    var container = document.getElementById("tags-holder-" + id)
    container.classList = ["tags-holder active"]
    setSelectedTags([...selectedTags, tag])
    setSpinner(false)
  }
  //removing tag from the selected tags
  function removeTag(e) {
    setSpinner(true)
    var id = e.target.id.split("-")
    id = id[id.length - 1]
    var index = -1
    for (var i = 0; i < selectedTags.length; i++) {
      if (selectedTags[i]._id === id) {
        index = i
        break
      }
    }
    selectedTags.splice(index, 1)
    var container = document.getElementById("tags-holder-" + id)
    if (container) {
      container.classList = ["tags-holder"]
    }
    setSelectedTags([...selectedTags])
    setSpinner(false)
  }
  function findTag(e) {
    setSpinner(true)
    var out = []
    setSearchedText(true)
    if (e.target.value.length !== 0) {
      for (var i = 0; i < tags.length; i++) {
        if (tags[i].tagName.toLowerCase().search(e.target.value.toLowerCase()) !== -1) {
          out.push(tags[i])
        }
      }
      setSearchedTags(out)
    } else {
      setSearchedText(false)
      setSearchedTags([])
    }
    setSpinner(false)
    setTimeout(setSelected, 300)
  }
  function setSelected() {
    for (var i = 0; i < selectedTags.length; i++) {
      var container = document.getElementById("tags-holder-" + selectedTags[i]._id)
      if (container) {
        container.classList = ["tags-holder active"]
      }
    }
  }
  //submitting post to the backend...
  function submitPost(e) {
    e.preventDefault()
    setSpinner(true)
    var articleContainer = document.querySelector(".fr-element")
    var titleText = document.getElementById("titleText").value
    var userName = JSON.parse(localStorage.getItem("UserData"))
    var token = userName.token
    userName = userName.userName
    if (titleText.length === 0) {
      setError({ ...error, upload: "Title must be provided." })
      setSpinner(false)
      return
    }
    if (articleContainer.textContent.length === 0) {
      setError({ ...error, upload: "summary should be entered." })
      setSpinner(false)
      return
    }
    if (!token) {
      window.location = "/"
      return
    }
    var data = {
      blogId: uuid(),
      userName: userName,
      title: titleText,
      subject: articleContainer.innerHTML,
      likes: 0,
      views: 0,
      tagIds: selectedTags,
    }
    var uploadData = new FormData()
    uploadData.append("data", JSON.stringify(data))
    uploadData.append("page", "/post/blog")
    if (images.length === 0) {
      uploadData.append("uploadImage", [])
    } else {
      for (var i = 0; i < images.length; i++) {
        uploadData.append("uploadImage", images[i])
      }
    }
    Axios
      .post("/post/blog", uploadData, {
        headers: {
          'Authorization': `token ${token}`
        }
      })
      .then(res => {
        console.log(res.data)
        if (res.data.error) {
          setError({ ...error, upload: res.data.error })
        }
        if (res.data.success) {
          window.location = "/"
        }
        setSpinner(false)
      })
      .catch(err => {
        console.log(err)
        setSpinner(false)
      })
  }
  return (
    <div className="compose">
      <Navbar active="compose" />
      <div className="container compose-container">
        <h1 className="heading" >Compose</h1>
        <div className="photo-holder">
          <h2 className="section-text">
            Photos
          </h2>
          {
            error.image
              ?
              <p className="error-text">{error.image}</p>
              :
              ""
          }
          <div className="photo-scroll">
            <div className="photo-container">
              {
                imagesUrl.map((imageUrl, index) => {
                  return (
                    <div className="image-holder" key={index}>
                      <img src={imageUrl} draggable="true" className="image page-center" alt="uploaded image" />
                      <div className="deleteImage">
                        <i className="fas fa-times icon" id={"image-" + index} onClick={removeImage} ></i>
                      </div>
                    </div>
                  )
                })
              }
              {
                imagesUrl.length < 1
                  ?
                  <div>
                    <input type="file" name="image-upload" onChange={addImage} className="uploadImage" id="uploadImage" />
                    <label className="uploadImageIcon" htmlFor="uploadImage"><i className="fas page-center fa-plus-circle"></i></label>
                  </div>
                  :
                  ""
              }
            </div>
          </div>
        </div>
        <div className="post-details">
          <h2 className="section-text">
            Post Details
          </h2>
          <div className="form-group">
            <label htmlFor="titleText">Title</label>
            <input type="text" className="form-control" id="titleText" placeholder="Title" />
          </div>
          <Editor />
        </div>
        <div className="tags-section">
          <h2 className="section-text">
            Tags
          </h2>
          <div className="selected-tags-container">
            {//show no records when no tags is selected
              selectedTags.length === 0 ?
                <h5>No tags selected</h5>
                :
                selectedTags.map((tag) => {
                  return (
                    <div key={"selected-" + tag._id} className="tags-holder">
                      <p>{tag.tagName}</p>
                      {/* delete-container */}
                      <div className="deleteTag" id={"delete-tag-holder-" + tag._id}>
                        <i className="fas fa-times icon" id={"delete-tag-" + tag._id} onClick={removeTag} ></i>
                      </div>
                    </div>
                  )
                })
            }
          </div>
          <div className="find-tag">
            <input type="text" placeholder="Search tag" className="search-tag" name="findTag" onChange={findTag} id="searchBoxTag" />
          </div>
          {
            error.tagsError
              ?
              <p className="error-text">{error.tagsError}</p>
              :
              ""
          }
          <div className="tags-container">
            {
              searchedTags.length === 0 && !searchedText ?
                tags.map((tag) => {
                  return (
                    <div key={"container-" + tag._id} id={"tags-holder-" + tag._id} onClick={selectTag} className="tags-holder">
                      <p id={"tag-holder-text-" + tag._id}>{tag.tagName}</p>
                    </div>
                  )
                })
                :
                searchedTags.map((tag) => {
                  return (
                    <div key={"container-" + tag._id} id={"tags-holder-" + tag._id} onClick={selectTag} className="tags-holder">
                      <p id={"tag-holder-text-" + tag._id}>{tag.tagName}</p>
                    </div>
                  )
                })
            }
          </div>
        </div>
        <div className="composeButton">
          {
            error.upload
              ?
              <p className="error-text">{error.upload}</p>
              :
              ""
          }
          <button className="btn btn-block button" onClick={submitPost}>
            Post
          </button>
        </div>
      </div>
      {
        spinner
          ?
          <Spinner></Spinner>
          :
          ""
      }
    </div >
  )
}
export default Compose
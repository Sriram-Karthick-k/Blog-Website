import React, { useEffect, useState } from "react"
import Navbar from "../../Components/Navbar"
import Spinner from "../../Components/Loading"
import compressImage from "../../Components/imageCompression"
import Editor from "../../Components/Editor"
function Compose() {
  const errorInitial = { image: false }
  const [spinner, setSpinner] = useState(false)//page spinner
  const [images, setImages] = useState([])//image stack
  const [error, setError] = useState(errorInitial)
  const [imagesUrl, setImagesUrl] = useState([])//iimage url stack
  //add images to the stack 
  async function addImage(e) {
    setSpinner(true)
    const imageFile = e.target.files[0];
    var compressedImageWithUrl = await compressImage(imageFile)
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
  function removeImage(e) {
    var index = e.target.id.split("-")[e.target.id.split("-").length - 1]
    images.splice(index, 1)
    imagesUrl.splice(index, 1)
    setImages([...images])
    setImagesUrl([...imagesUrl])
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
                imagesUrl.length < 5
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
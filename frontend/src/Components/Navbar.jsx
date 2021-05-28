import React, { useState } from "react"
import Axios from "axios"
function Navbar(props) {
  const [changeSignup, setChangeSignUp] = useState(false)
  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)
  function searchBar(e) {
    console.log(e.target.value)
  }
  function changeSignUpOption(e) {
    var login = document.getElementById("login")
    var signup = document.getElementById("signup")
    if (e.target.id === "signInOrSignUp") {
      login.classList = ["modal-title btn btn-primary"]
      signup.classList = ["modal-title btn btn-secondary"]
      setChangeSignUp("login")
      return
    }
    if (e.target.id === "login") {
      login.classList = ["modal-title btn btn-primary"]
      signup.classList = ["modal-title btn btn-secondary"]
      setChangeSignUp("login")
    } else {
      login.classList = ["modal-title btn btn-secondary"]
      signup.classList = ["modal-title btn btn-primary"]
      setChangeSignUp("signup")
    }
  }

  function loginOrSignUpOption() {
    if (changeSignup === "login") {
      var data = new FormData()
      var userName = document.getElementById("userName")
      var password = document.getElementById("password")
      data.append("userName", userName)
      data.append("password", password)
      if (userName.length === 0 || password.length === 0) {
        setError("Every values should be filled.")
        return
      }
      Axios
        .post("/login", JSON.stringify(data))
        .then(res => {
          if (res.data.err) {
            setError(res.data.err)
          }
          if (res.data.success) {
            localStorage.setItem("UserData", JSON.stringify(res.data))
            window.location = window.location
          }
        })
        .catch(err => console.log(err))
    } else {
      var data = new FormData()
      var userName = document.getElementById("userName")
      var nickName = document.getElementById("nickName")
      var password = document.getElementById("password")
      var confirmPassword = document.getElementById("confirmPassword")
      data.append("userName", userName)
      data.append("nickName", nickName)
      data.append("password", password)
      data.append("confirmPassword", confirmPassword)
      if (userName.length === 0 || password.length === 0 || nickName.length === 0 || confirmPassword.length === 0) {
        setError("Every values should be filled.")
        return
      }
      if (confirmPassword !== password) {
        setError("Password and confirm password should be same.")
        return
      }
      Axios
        .post("/signup", JSON.stringify(data))
        .then(res => {
          if (res.data.err) {
            setError(res.data.err)
            return
          }
          if (res.data.success) {
            changeSignup("login")
            setSuccess(res.data.success)
            return
          }
        })
        .catch(err => console.log(err))
    }
  }
  return (
    <div className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="#">
        <img src="/images/logo.png" width="30" height="30" alt="" />
        <p>Blog</p>
      </a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse center" id="navbarSupportedContent">
        <ul className="navbar-nav ml-auto">
          <li className={props.active === "home" ? "nav-item active" : "nav-item"}>
            <a className="nav-link" href="/">Home <span className="sr-only">(current)</span></a>
          </li>
          <li className={props.active === "compose" ? "nav-item active" : "nav-item"}>
            <a className="nav-link" href="/compose">Compose</a>
          </li>
          <li className="nav-item">
            <a className="nav-link signInPopup" href="" data-toggle="modal" id="signInOrSignUp" onClick={changeSignUpOption} data-target="#modalCenter" >Signin/Signup</a>
          </li>
        </ul>
        <form className="form-inline my-2 my-lg-0">
          <div className="searchContainer">
            <input className="form-control mr-sm-2" onChange={searchBar} type="search" placeholder="Search" aria-label="Search" />
            <div className="autoCompleteDivHolder hidden  mr-sm-2">
              <div className="autoCompleteDiv">
                <div className="autoCompleteDivItem form-control">
                  <p>sriram</p>
                </div>
                <div className="autoCompleteDivItem form-control">
                  <p>sriram</p>
                </div>
                <div className="autoCompleteDivItem form-control">
                  <p>sriram</p>
                </div>
              </div>
            </div>
          </div>
          <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
        </form>
      </div>
      <div className="modal fade" id="modalCenter" tabIndex="1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title btn" id="login" onClick={changeSignUpOption} >Login</h5>
              <h5 className="modal-title btn" id="signup" onClick={changeSignUpOption} >Signup</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              {
                changeSignup ?
                  changeSignup === "login" ?
                    <div className="login">
                      <div>
                        <div className="logo-div">
                          <img src="images/logo.png" alt="logo" width="50px" height="50px" />
                          <div className="logo-div-text">
                            <h3>Blog</h3>
                          </div>
                          <div className="message-text">
                            <div className="success">
                              {
                                success ? success : ""
                              }
                            </div>
                            <div className="error">
                              {
                                error ? error : ""
                              }
                            </div>
                          </div>
                        </div>
                        <div className="form-group">
                          <input type="text" name="userName" className="form-control" id="userName" placeholder="Enter Username" />
                        </div>
                        <div className="form-group">
                          <input type="password" name="password" className="form-control" id="password" placeholder="Password" />
                        </div>
                        <button type="submit" className="btn btn-block btn-primary" onClick={loginOrSignUpOption}>Login</button>
                      </div>
                    </div>
                    :
                    <div className="signup">
                      <div>
                        <div className="logo-div">
                          <img src="images/logo.png" alt="logo" width="50px" height="50px" />
                          <div className="logo-div-text">
                            <h3>Blog</h3>
                          </div>
                          <div className="message-text">
                            <div className="error">
                              {
                                error ? error : ""
                              }
                            </div>
                          </div>
                        </div>
                        <div className="form-group">
                          <input type="text" name="userName" className="form-control" id="userName" placeholder="Enter userName" />
                        </div>
                        <div className="form-group">
                          <input type="text" name="niceName" className="form-control" id="nickName" placeholder="Nick name" />
                        </div>
                        <div className="form-group">
                          <input type="password" name="password" className="form-control" id="password" placeholder="Password" />
                        </div>
                        <div className="form-group">
                          <input type="password" name="confirmPassword" className="form-control" id="confirmPassword" placeholder="Confirm Password" />
                        </div>
                        <button type="submit" className="btn btn-block btn-primary" onClick={loginOrSignUpOption} >Signup</button>
                      </div>
                    </div>
                  :
                  ""
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Navbar
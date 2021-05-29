import React, { useState, useEffect } from "react"
import Axios from "axios"
import Loading from "./Loading"
function Navbar(props) {
  const [changeSignup, setChangeSignUp] = useState(false)
  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)
  const [logIn, setLogIn] = useState(false)
  const [spinner, setSpinner] = useState(false)
  useEffect(() => {
    setSpinner(true)
    var promise = new Promise(function (res, rej) {
      var user = JSON.parse(localStorage.getItem("UserData"))
      if (user) {
        res(user)
      } else {
        rej()
      }
    })
    promise
      .then(res => {
        setSpinner(false)
        setLogIn(res)
      })
      .catch(() => {
        setSpinner(false)
        setLogIn(false)
      })
  }, [])
  function searchBar(e) {
    console.log(e.target.value)
  }
  function changeSignUpOption(e) {
    setSpinner(true)
    var login = document.getElementById("login")
    var signup = document.getElementById("signup")
    if (e.target.id === "signInOrSignUp" || e.target.id === "compose") {
      login.classList = ["modal-title btn btn-primary"]
      signup.classList = ["modal-title btn btn-secondary"]
      setChangeSignUp("login")
      setSpinner(false)
      return
    }
    if (e.target.id === "login") {
      login.classList = ["modal-title btn btn-primary"]
      signup.classList = ["modal-title btn btn-secondary"]
      setSpinner(false)
      setChangeSignUp("login")
    } else {
      login.classList = ["modal-title btn btn-secondary"]
      signup.classList = ["modal-title btn btn-primary"]
      setSpinner(false)
      setChangeSignUp("signup")
    }
    if (e.target.id === "logout") {
      localStorage.removeItem("UserData")
      setSpinner(false)
      window.location = "/"
    }
  }

  function loginOrSignUpOption() {
    setSpinner(true)
    var data = {}
    var userName = document.getElementById("userName").value
    var password = document.getElementById("password").value
    if (changeSignup === "login") {
      data["userName"] = userName
      data["password"] = password
      if (userName.length === 0 || password.length === 0) {
        setError("Every values should be filled.")
        return
      }
      Axios
        .post("/login", data)
        .then(res => {
          if (res.data.err) {
            setError(res.data.err)
            setSpinner(false)
          }
          if (res.data.token) {
            setSuccess(false)
            setError(false)
            console.log(res.data)
            localStorage.setItem("UserData", JSON.stringify(res.data))
            var location = window.location
            setSpinner(false)
            window.location = location
          }
        })
        .catch(err => console.log(err))
    } else {
      userName = document.getElementById("userName").value
      var nickName = document.getElementById("nickName").value
      password = document.getElementById("password").value
      var confirmPassword = document.getElementById("confirmPassword").value
      data["userName"] = userName
      data["nickName"] = nickName
      data["password"] = password
      if (userName.length === 0 || password.length === 0 || nickName.length === 0 || confirmPassword.length === 0) {
        setError("Every values should be filled.")
        return
      }
      if (confirmPassword !== password) {
        setError("Password and confirm password should be same.")
        return
      }
      Axios
        .post("/signup", data)
        .then(res => {
          if (res.data.err) {
            setError(res.data.err)
            setSpinner(false)
            return
          }
          if (res.data.success) {
            setError(false)
            setChangeSignUp("login")
            setSuccess(res.data.success)
            setSpinner(false)
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
            <a className="nav-link" href="/">Home</a>
          </li>
          <li className={props.active === "compose" ? "nav-item active" : "nav-item"}>
            <a className="nav-link" href={logIn ? "/compose" : ""} id="compose" data-toggle={logIn ? "" : "modal"} onClick={changeSignUpOption} data-target={logIn ? "" : "#modalCenterSignIn"}  >Compose</a>
          </li>
          {
            logIn ?
              <li className={props.active === "profile" ? "nav-item active" : "nav-item"}>
                <a className="nav-link" href="/profile">Profile</a>
              </li>
              :
              ""
          }
          {
            !logIn ?
              <li className="nav-item">
                <a className="nav-link signInPopup" href="" data-toggle="modal" id="signInOrSignUp" onClick={changeSignUpOption} data-target="#modalCenterSignIn" >Signin/Signup</a>
              </li>
              :
              <li className="nav-item">
                <a className="nav-link signInPopup" href="" data-toggle="modal" data-target="#modalCenterLogout" id="logout" >logout</a>
              </li>
          }
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
      <div className="modal fade" id="modalCenterSignIn" tabIndex="1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title btn" id="login" onClick={changeSignUpOption}  >Login</h5>
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
      <div className="modal fade" id="modalCenterLogout" tabIndex="1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title btn btn-danger">Logout</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <h3>Press confirm to logout</h3>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary" data-dismiss="modal" aria-label="Close">
                No
              </button>
              <button type="button" className="btn btn-danger" id="logout" onClick={changeSignUpOption} data-dismiss="modal" aria-label="Close">
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
      {
        spinner
          ?
          <Loading />
          :
          ""
      }
    </div>
  )
}
export default Navbar
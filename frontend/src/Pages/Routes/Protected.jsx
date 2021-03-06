import React, { useState, useEffect } from "react";
import Axios from "axios";
import Loading from "../../Components/Loading"
function Protected(props) {
  const [Auth, setAuth] = useState(false);
  const [logged, setLogged] = useState(false)
  const [token, setToken] = useState(false)
  useEffect(() => {
    //this is used to check wheather the user is logged in or not, if not redirect them to home route
    var data = JSON.parse(localStorage.getItem("UserData"));
    if (data) {
      setToken(data.token)
      Axios.get("/Auth?token=" + data.token)
        .then((res) => {
          console.log(res.data)
          if (!res.data.loggedIn) {
            localStorage.removeItem("UserData");
            setLogged(false)
          } else {
            setLogged(true)
          }
          setAuth(true);
        })
        .catch((err) => console.log(err));
    } else {
      setAuth(true)
      setLogged(false)
    }
  }, [])
  return Auth ? <props.component logged={logged} token={token} /> : <Loading />

}
export default Protected;

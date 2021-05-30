import React, { useState, useEffect } from "react";
import Axios from "axios";
import Loading from "../../Components/Loading"
function Protected(props) {
  const [Auth, setAuth] = useState(false);

  useEffect(() => {
    var data = JSON.parse(localStorage.getItem("UserData"));
    if (data) {
      Axios.get("/Auth?token=" + data.token)
        .then((res) => {
          console.log(res.data)
          if (!res.data.loggedIn) {
            localStorage.removeItem("UserData");
            window.location = "/";
          } else {
            setAuth(true);
          }
        })
        .catch((err) => console.log(err));
    } else {
      window.location = "/";
    }
  }, [])
  return Auth ? <props.component /> : <Loading />

}
export default Protected;

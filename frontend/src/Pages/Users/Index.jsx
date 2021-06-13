import React, { useEffect } from "react"
import Spinner from "../../Components/Loading"
function Index() {
  useEffect(() => {
    window.location = "/posts/all"
  }, [])
  return (
    <Spinner />
  )
}
export default Index
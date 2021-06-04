import React from "react"

function Loading() {
  //it is a loading prompt this will apppear while waiting for backend response
  return (
    <div className="loadingContainer page-center">
      <div className="loader page-center">Loading...</div>
    </div>
  )
}
export default Loading
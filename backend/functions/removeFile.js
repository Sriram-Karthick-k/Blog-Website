const fs =require("fs")
module.exports=function removeFile(path){
  try{
    fs.unlinkSync(path)
    return true
  }catch{
    return false
  }
}
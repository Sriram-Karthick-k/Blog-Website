const fs =require("fs")
module.exports=function removeFolder(path){
  try{
    fs.rmdir(path,{ recursive: true },function(err){
      if(err){
        console.log(err)
      }
      return true
    })
    return true
  }catch(err){
    console.log(err)
    return false
  }
}
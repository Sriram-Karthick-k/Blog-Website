const express=require("express")
const UserInfo=require("../mongodb/UserInfo")
var app = express.Router();
var dbAlive=require("../functions/checkDb")
const verification =require("../functions/verification")
var removeFolder=require("../functions/removeFolder")
const uploads=require("../functions/uploadImage")
const jwt=require("jsonwebtoken")
//dbAlive
app.route("/update-profile")
.post(dbAlive,verification,uploads.single("uploadImage"),async (req,res)=>{
  //used to find the user name is in db or not
  //used to update profile photo of the user
  var id=jwt.verify(req.headers.authorization.split(" ")[1],process.env.JWT_SALT)//getting user id from the token 
  var path=req.file.destination+"/"+req.file.filename//getting path of the image
  if(id){//cheking wheaether the id is there or not
    await UserInfo.findOneAndUpdate({_id:id.id},{$set:{profilePath:path}})//updating profile picture
    .exec()
    .catch(err=>{
      var cound=false
      while(true){//if error means this will remove the file from the folder
        count=removeFolder(req.file.destination)
        if(count){
          break
        }
      }
      res.send({error:"The database server is offline."})
    })
    res.send({success:true})
  }else{
    res.send({error:"Invalid jwt, login again..."})
  }
})
module.exports=app


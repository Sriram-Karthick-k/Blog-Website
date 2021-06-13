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
  var id=jwt.verify(req.headers.authorization.split(" ")[1],process.env.JWT_SALT)
  var path=req.file.destination+"/"+req.file.filename
  if(id.profilePath){
    res.send({success:true})
  }else{
    await UserInfo.findOneAndUpdate({_id:id.id},{$set:{profilePath:path}})
    .exec()
    .catch(err=>{
      var cound=false
      while(true){
        count=removeFolder(req.file.destination)
        if(count){
          break
        }
      }
      res.send({error:"The database server is offline."})
    })
    res.send({success:true})
  }
})
module.exports=app


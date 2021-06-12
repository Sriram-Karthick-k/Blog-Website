const express=require("express")
const BlogInfo=require("../mongodb/BlgoInfo")
var app = express.Router();
var dbAlive=require("../functions/checkDb")
const verification =require("../functions/verification")
var removeFolder=require("../functions/removeFolder")
const uploads=require("../functions/uploadImage")
const jwt=require("jsonwebtoken")
//dbAlive
app.route("/post/blog")
.post(dbAlive,verification,uploads.array("uploadImage",6),async (req,res)=>{
  //used to find the user name is in db or not
  var files=[]
  const data=JSON.parse(req.body.data)
  var id=jwt.verify(req.headers.authorization.split(" ")[1], process.env.JWT_SALT)
  id=id.id
  //inserting every image into files array
  for(var i=0;i<req.files.length;i++){
    files.push(req.files[i].destination+"/"+req.files[i].filename)
  }
  var create=new BlogInfo({
    _id:data.blogId,
    userId:id,
    title:data.title,
    subject:data.subject,
    likes:0,
    disLikes:0,
    views:0,
    tagIds:data.tagIds,
    images:files,
  })
  create.save((err,succ)=>{
    if(err){
      if(files.length!=0){
        //remove the folder untill it is deleted
        count=false
        while(true){
          count=removeFolder(req.files[0].destination)
          if(count){
            break
          }
        }
      }
      res.send({error:"The database server is offline."})
    }else{
      res.send({success:true})
    }
  })
})
module.exports=app


const express=require("express")
const BlogInfo=require("../mongodb/BlgoInfo")
var app = express.Router();
var dbAlive=require("../functions/checkDb")
const verification =require("../functions/verification")
const removeFile=require("../functions/removeFile")
const uploads=require("../functions/uploadImage")
const jwt=require("jsonwebtoken")

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
    likes:data.likes,
    views:data.views,
    tagIds:data.tagIds,
    images:files,
  })
  create.save((err,succ)=>{
    if(err){
      console.log(err);
      res.send({error:"The database server is offline."})
    }else{
      res.send({success:true})
    }
  })
})
module.exports=app


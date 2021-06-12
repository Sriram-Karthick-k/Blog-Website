const express=require("express")
const BlogInfo=require("../mongodb/BlgoInfo")
var app = express.Router();
var dbAlive=require("../functions/checkDb")
const verification =require("../functions/verification")
//dbAlive
app.route("/getPost")
.get(dbAlive,async (req,res)=>{
  //used to find the user name is in db or not
  var posts=await BlogInfo.find({}).exec()
  for(var i=0;i<posts.length;i++){
    for(var j=0;j<posts[i].images.length;j++){
      posts[i].images[j]=posts[i].images[j].split("./source")[1]
    }
  }
  res.send(posts)
})
module.exports=app


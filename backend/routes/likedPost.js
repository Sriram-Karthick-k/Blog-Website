const express=require("express")
const BlogInfo=require("../mongodb/BlgoInfo")
const UserInfo=require("../mongodb/UserInfo")
const LikeInfo=require("../mongodb/likes")
var app = express.Router();
var dbAlive=require("../functions/checkDb")
const verification =require("../functions/verification")
//dbAlive
app.route("/likedPost")
.get(dbAlive,verification,async (req,res)=>{
  //used to find the user name is in db or not
  try{
    var post=[];
    var id=await UserInfo.findOne({userName:req.query.userName},{password:0}).exec()
    posts=await BlogInfo.find({userId:id._id},{comments:0}).exec()
    id.profilePath=id.profilePath.split("./source")[1]
    for(var i=0;i<posts.length;i++){
      var profile=await UserInfo.findOne({_id:posts[i].userId}).exec()
      if(profile.profilePath){
        posts[i].authorImage=profile.profilePath.split("./source")[1]
      }
      posts[i].nickName=profile.nickName
      for(var j=0;j<posts[i].images.length;j++){
        posts[i].images[j]=posts[i].images[j].split("./source")[1]
      }
    }
    res.send({posts:posts,details:id})
  }catch(error){
    console.log(error)
    res.send({error:"The database server is offline."})
  }
})
module.exports=app


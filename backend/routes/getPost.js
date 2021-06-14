const express=require("express")
const BlogInfo=require("../mongodb/BlgoInfo")
const UserInfo=require("../mongodb/UserInfo")
var app = express.Router();
var dbAlive=require("../functions/checkDb")
const verification =require("../functions/verification")
const jwt=require("jsonwebtoken");
const LikeInfo = require("../mongodb/likes");
//dbAlive
app.route("/getPost")
.get(dbAlive,async (req,res)=>{
  //used to find the user name is in db or not
  console.log(req.query)
  try{
    var posts=[];
    var search=req.query.type
    var pageCount=(Number(req.query.pgno)-1)*10
    if(req.query.type==="all"){
      posts=await BlogInfo.find({},{comments:0}).exec()
    }else{
      posts=await BlogInfo.find({tagIds:{$elemMatch:{tagName:{$regex:search ,$options:"i"}}}},{comments:0}).exec()
    }
    var out=[]
    
    if(req.query.logged==="true"){
      var userId=jwt.verify(req.query.token,process.env.JWT_SALT)
      for(var i=pageCount;i<(pageCount+10<=posts.length?pageCount+10:posts.length);i++){
        var profile=await UserInfo.findOne({_id:posts[i].userId}).exec()
        var liked=await LikeInfo.findOne({userId:userId.id,blogId:posts[i]._id}).exec()
        if(liked){
          posts[i].action=liked.action
        }else{
          posts[i].action={view:false,liked:false,disLiked:false}
        }
        if(profile.profilePath){
          posts[i].authorImage=profile.profilePath.split("./source")[1]
        }
        posts[i].nickName=profile.nickName
        for(var j=0;j<posts[i].images.length;j++){
          posts[i].images[j]=posts[i].images[j].split("./source")[1]
        }
        out.push(posts[i])
      }
    }else{
      for(var i=pageCount;i<(pageCount+10<=posts.length?pageCount+10:posts.length);i++){
        var profile=await UserInfo.findOne({_id:posts[i].userId}).exec()
        posts[i].action={view:false,liked:false,disLiked:false}
        if(profile.profilePath){
          posts[i].authorImage=profile.profilePath.split("./source")[1]
        }
        posts[i].nickName=profile.nickName
        for(var j=0;j<posts[i].images.length;j++){
          posts[i].images[j]=posts[i].images[j].split("./source")[1]
        }
        out.push(posts[i])
      }
    }
    res.send(out)
  }catch(error){
    console.log(error)
    res.send({error:"The database server is offline."})
  }
})
module.exports=app


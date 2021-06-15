const express=require("express")
const BlogInfo=require("../mongodb/BlgoInfo")
const UserInfo=require("../mongodb/UserInfo")
const LikeInfo=require("../mongodb/likes")
var app = express.Router();
var dbAlive=require("../functions/checkDb")
const verification =require("../functions/verification");
const jwt = require("jsonwebtoken");
//dbAlive
app.route("/public/user")
.get(dbAlive,async (req,res)=>{
  //used to find the user name is in db or not
  try{
    var post=[];
    var id=await UserInfo.findOne({_id:req.query.userName},{password:0}).exec()
    posts=await BlogInfo.find({userId:id._id},{comments:0}).exec()
    if(id.profilePath){//checking wheather the profile is active or not
      id.profilePath=id.profilePath.split("./source")[1]//updating profile picture
    }
    if(req.query.logged==="true"){//when the user if logged in 
      var userId=jwt.verify(req.query.token,process.env.JWT_SALT)//getting requesting user id
      if(userId){//checking the id is valid or not
        for(var i=0;i<posts.length;i++){
          var liked=await LikeInfo.findOne({userId:userId.id,blogId:posts[i]._id}).exec()
          if(liked){//checking liked instance is found or not
            posts[i].action=liked.action//updating action
          }else{//updating action if liked is not found
            posts[i].action={liked:false,disLiked:false,view:false}
          }
          if(id.profilePath){//updating image of the posts
            posts[i].authorImage=id.profilePath
          }
          posts[i].nickName=id.nickName//updating nick name
          for(var j=0;j<posts[i].images.length;j++){
            posts[i].images[j]=posts[i].images[j].split("./source")[1]//updatin image of the posts
          }
        }
      }else{
        res.send({error:"Invalid token"})
      }
    }else{
      //if the user if not logged in 
      for(var i=0;i<posts.length;i++){
        posts[i].action={liked:false,disLiked:false,view:false}//updating action
        if(id.profilePath){//if the profile is not found
          posts[i].authorImage=id.profilePath//updating profile path
        }
        posts[i].nickName=id.nickName//updating nick name
        for(var j=0;j<posts[i].images.length;j++){
          posts[i].images[j]=posts[i].images[j].split("./source")[1]//updating posts image
        }
      }
    }
    
    res.send({posts:posts,details:id})
  }catch(error){
    console.log(error)
    res.send({error:"The database server is offline."})
  }
})
module.exports=app


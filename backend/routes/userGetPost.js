const express=require("express")
const BlogInfo=require("../mongodb/BlgoInfo")
const UserInfo=require("../mongodb/UserInfo")
const LikeInfo=require("../mongodb/likes")
var app = express.Router();
var dbAlive=require("../functions/checkDb")
const verification =require("../functions/verification")
//dbAlive
app.route("/user")
.get(dbAlive,verification,async (req,res)=>{
  //used to find the user name is in db or not
  try{
    var posts=[];
    var id=await UserInfo.findOne({userName:req.query.userName},{password:0}).exec()
    if(req.query.type==="Liked post"){
      var likedPosts=await LikeInfo.find({userId:id._id},{_id:0}).exec()
      for(var i=0;i<likedPosts.length;i++){
        if(likedPosts[i].action.liked){
         posts.push(await BlogInfo.findOne({_id:likedPosts[i].blogId}).exec())
         posts[posts.length-1].action=likedPosts[i].action
        }
      }
      if(id.profilePath){
        id.profilePath=id.profilePath.split("./source")[1]
      }
      for(var i=0;i<posts.length;i++){
        posts[i].nickName=id.nickName
        var profile=await UserInfo.findOne({_id:posts[i].userId}).exec()
        posts[i].nickName=profile.nickName
        if(profile.profilePath){
          posts[i].authorImage=profile.profilePath.split("./source")[1]
        }
        for(var j=0;j<posts[i].images.length;j++){
          posts[i].images[j]=posts[i].images[j].split("./source")[1]
        }
      }
    }else if(req.query.type==="myPost"){
      posts=await BlogInfo.find({userId:id._id},{comments:0}).exec()
      if(id.profilePath){
        id.profilePath=id.profilePath.split("./source")[1]
      }
      for(var i=0;i<posts.length;i++){
        posts[i].nickName=id.nickName
        var action=await LikeInfo.findOne({userId:id._id,blogId:posts[i]._id},{_id:0}).exec()
        if(action){
          posts[i].action=action.action
        }else{
          posts[i].action={view:false,liked:false,disLiked:false}
        }
        for(var j=0;j<posts[i].images.length;j++){
          posts[i].images[j]=posts[i].images[j].split("./source")[1]
        }
        posts[i].authorImage=id.profilePath
      }
      console.log(posts)
    }
    
    res.send({posts:posts,details:id})
  }catch(error){
    console.log(error)
    res.send({error:"The database server is offline."})
  }
})
module.exports=app


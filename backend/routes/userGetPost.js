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
  //used to get requesting user profile
  try{
    var posts=[];
    var id=await UserInfo.findOne({userName:req.query.userName},{password:0}).exec()
    if(req.query.type==="Liked post"){//used to get liked post
      var likedPosts=await LikeInfo.find({userId:id._id},{_id:0}).exec()
      for(var i=0;i<likedPosts.length;i++){
        if(likedPosts[i].action.liked){//checking wheather the post is liked or not
         posts.push(await BlogInfo.findOne({_id:likedPosts[i].blogId}).exec())
         posts[posts.length-1].action=likedPosts[i].action//updating posts action
        }
      }
      if(id.profilePath){//updating user profile if the profile image is found
        id.profilePath=id.profilePath.split("./source")[1]
      }
      for(var i=0;i<posts.length;i++){
        var profile=await UserInfo.findOne({_id:posts[i].userId},{password:0}).exec()
        posts[i].nickName=profile.nickName//updating nickname of the posts
        if(profile.profilePath){//checking author image is there or not
          posts[i].authorImage=profile.profilePath.split("./source")[1]
        }
        for(var j=0;j<posts[i].images.length;j++){//updating posts images
          posts[i].images[j]=posts[i].images[j].split("./source")[1]
        }
      }
    }else if(req.query.type==="myPost"){
      //getting user post only
      posts=await BlogInfo.find({userId:id._id},{comments:0}).exec()
      if(id.profilePath){//checking user profile image is there or not
        id.profilePath=id.profilePath.split("./source")[1]
      }
      for(var i=0;i<posts.length;i++){
        posts[i].nickName=id.nickName//updating nickName of the posts
        var action=await LikeInfo.findOne({userId:id._id,blogId:posts[i]._id},{_id:0}).exec()
        if(action){//updating action
          posts[i].action=action.action
        }else{
          posts[i].action={view:false,liked:false,disLiked:false}
        }
        for(var j=0;j<posts[i].images.length;j++){//updating posts image path
          posts[i].images[j]=posts[i].images[j].split("./source")[1]
        }
        posts[i].authorImage=id.profilePath//updating author image
      }
    }
    res.send({posts:posts,details:id})
  }catch(error){
    console.log(error)
    res.send({error:"The database server is offline."})
  }
})
module.exports=app


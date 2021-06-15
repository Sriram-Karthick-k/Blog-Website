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
  try{
    var posts=[];
    var search=req.query.type
    var pageCount=(Number(req.query.pgno)-1)*10//number of post cound
    if(req.query.type==="all"){//checking query type
      posts=await BlogInfo.find({},{comments:0}).exec()//gets all post
    }else{//gets particular type of post
      posts=await BlogInfo.find({tagIds:{$elemMatch:{tagName:{$regex:search ,$options:"i"}}}},{comments:0}).exec()
    }
    var out=[]
    
    if(req.query.logged==="true"){//only if the user is logged in 
      var userId=jwt.verify(req.query.token,process.env.JWT_SALT)//getting requesting user id
      for(var i=pageCount;i<(pageCount+10<=posts.length?pageCount+10:posts.length);i++){
        var profile=await UserInfo.findOne({_id:posts[i].userId}).exec()
        var liked=await LikeInfo.findOne({userId:userId.id,blogId:posts[i]._id}).exec()
        if(liked){//checking liked or not
          posts[i].action=liked.action//updating action
        }else{
          posts[i].action={view:false,liked:false,disLiked:false}//updating action if liked is not found
        }
        if(profile.profilePath){//checking profile path of the user
          posts[i].authorImage=profile.profilePath.split("./source")[1]//udating image of the author
        }
        posts[i].nickName=profile.nickName//updating nick name
        for(var j=0;j<posts[i].images.length;j++){
          posts[i].images[j]=posts[i].images[j].split("./source")[1]//updating images of the user
        }
        out.push(posts[i])
      }
    }else{
      //this will work when the user is not logged in 
      for(var i=pageCount;i<(pageCount+10<=posts.length?pageCount+10:posts.length);i++){
        var profile=await UserInfo.findOne({_id:posts[i].userId}).exec()
        posts[i].action={view:false,liked:false,disLiked:false}//updating action
        if(profile.profilePath){//chekcing for posts user profile image
          posts[i].authorImage=profile.profilePath.split("./source")[1]//updating user path
        }
        posts[i].nickName=profile.nickName//updating nickname
        for(var j=0;j<posts[i].images.length;j++){
          posts[i].images[j]=posts[i].images[j].split("./source")[1]//updating posts image
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


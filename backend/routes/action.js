const express=require("express")
const BlogInfo=require("../mongodb/BlgoInfo")
const UserInfo=require("../mongodb/UserInfo")
const LikeInfo=require("../mongodb/likes")
var app = express.Router();
var dbAlive=require("../functions/checkDb")
const verification = require("../functions/verification");
const jwt=require("jsonwebtoken")
//dbAlive
app.route("/action")
.get(dbAlive,verification,async (req,res)=>{
  //used to find the user name is in db or not
  //this route is used to handle like and dislike
  try{
    var token=req.headers.authorization.split(" ")[1]//token from the user
    var userId=jwt.verify(token,process.env.JWT_SALT)//requesting user id
    userId=userId.id
    var find=await LikeInfo.findOne({userId:userId,blogId:req.query.blogId},{_id:0}).exec()
    var blog=await BlogInfo.findOne({_id:req.query.blogId}).exec()
    if(find){//to find wheather the user having an instance of like of this post
     if(req.query.type==="disLike"){//reacting according to the query which may be like or dislike
      if(find.action.disLiked){//this will happen if the dislike is already pressed and remove that like and make false
        await BlogInfo.findOneAndUpdate({_id:req.query.blogId},{$set:{disLikes:(blog.disLikes-1)}}).exec()
        await LikeInfo.findOneAndUpdate({userId:userId,blogId:req.query.blogId},{$set:{action:{liked:false,disLiked:false,view:find.action.view}}}).exec()
        res.send({success:true})
      }else{//this will update dislikes when this condition is met
        if(find.action.liked){//this will check wheater the user if already liked or not
          await BlogInfo.findOneAndUpdate({_id:req.query.blogId},{$set:{likes:(blog.likes-1),disLikes:(blog.disLikes+1)}}).exec()
          await LikeInfo.findOneAndUpdate({userId:userId,blogId:req.query.blogId},{$set:{action:{liked:false,disLiked:true,view:find.action.view}}}).exec()
        }else{//this conditioon will directly update dislike
          await BlogInfo.findOneAndUpdate({_id:req.query.blogId},{$set:{disLikes:(blog.disLikes+1)}}).exec()
          await LikeInfo.findOneAndUpdate({userId:userId,blogId:req.query.blogId},{$set:{action:{liked:false,disLiked:true,view:find.action.view}}}).exec()
        }
        res.send({success:true})
      }
     }else if(req.query.type==="like"){
      if(find.action.liked){//this will happen if the like is already pressed and remove that like and make false
        await BlogInfo.findOneAndUpdate({_id:req.query.blogId},{$set:{likes:(blog.likes-1)}}).exec()
        await LikeInfo.findOneAndUpdate({userId:userId,blogId:req.query.blogId},{$set:{action:{liked:false,disLiked:false,view:find.action.view}}}).exec()
        res.send({success:true})
      }else{//this will update like when this condition is met
        if(find.action.disLiked){//this will check wheater the user if already disliked or not
          await BlogInfo.findOneAndUpdate({_id:req.query.blogId},{$set:{likes:(blog.likes+1),disLikes:(blog.disLikes-1)}}).exec()
          await LikeInfo.findOneAndUpdate({userId:userId,blogId:req.query.blogId},{$set:{action:{liked:true,disLiked:false,view:find.action.view}}}).exec()
        }else{//this conditioon will directly update likes
          await BlogInfo.findOneAndUpdate({_id:req.query.blogId},{$set:{likes:(blog.likes+1)}}).exec()
          await LikeInfo.findOneAndUpdate({userId:userId,blogId:req.query.blogId},{$set:{action:{liked:true,disLiked:false,view:find.action.view}}}).exec()
        }
        res.send({success:true})
      }
     }  
    }
  }catch(error){
    console.log(error)
    res.send({error:"The database server is offline."})
  }
})
module.exports=app


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
  try{
    var token=req.headers.authorization.split(" ")[1]
    var userId=jwt.verify(token,process.env.JWT_SALT)
    userId=userId.id
    var find=await LikeInfo.findOne({userId:userId,blogId:req.query.blogId},{_id:0}).exec()
    var blog=await BlogInfo.findOne({_id:req.query.blogId}).exec()
    if(find){
     if(req.query.type==="disLike"){
      if(find.action.disLiked){
        await BlogInfo.findOneAndUpdate({_id:req.query.blogId},{$set:{disLikes:(blog.disLikes-1)}}).exec()
        await LikeInfo.findOneAndUpdate({userId:userId,blogId:req.query.blogId},{$set:{action:{liked:false,disLiked:false,view:find.action.view}}}).exec()
        res.send({success:true})
      }else{
        if(find.action.liked){
          await BlogInfo.findOneAndUpdate({_id:req.query.blogId},{$set:{likes:(blog.likes-1),disLikes:(blog.disLikes+1)}}).exec()
          await LikeInfo.findOneAndUpdate({userId:userId,blogId:req.query.blogId},{$set:{action:{liked:false,disLiked:true,view:find.action.view}}}).exec()
        }else{
          await BlogInfo.findOneAndUpdate({_id:req.query.blogId},{$set:{disLikes:(blog.disLikes+1)}}).exec()
          await LikeInfo.findOneAndUpdate({userId:userId,blogId:req.query.blogId},{$set:{action:{liked:false,disLiked:true,view:find.action.view}}}).exec()
        }
        res.send({success:true})
      }
     }else if(req.query.type==="like"){
      if(find.action.liked){
        await BlogInfo.findOneAndUpdate({_id:req.query.blogId},{$set:{likes:(blog.likes-1)}}).exec()
        await LikeInfo.findOneAndUpdate({userId:userId,blogId:req.query.blogId},{$set:{action:{liked:false,disLiked:false,view:find.action.view}}}).exec()
        res.send({success:true})
      }else{
        if(find.action.disLiked){
          await BlogInfo.findOneAndUpdate({_id:req.query.blogId},{$set:{likes:(blog.likes+1),disLikes:(blog.disLikes-1)}}).exec()
          await LikeInfo.findOneAndUpdate({userId:userId,blogId:req.query.blogId},{$set:{action:{liked:true,disLiked:false,view:find.action.view}}}).exec()
        }else{
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


const express=require("express")
const BlogInfo=require("../mongodb/BlgoInfo")
const UserInfo=require("../mongodb/UserInfo")
const LikeInfo=require("../mongodb/likes")
var app = express.Router();
var dbAlive=require("../functions/checkDb")
var jwt=require("jsonwebtoken")
//dbAlive
app.route("/getBlog")
.get(dbAlive,async (req,res)=>{
  //used to find the user name is in db or not
  try{
    if(req.query.logged==='true'){
      var {id}=jwt.verify(req.query.token,process.env.JWT_SALT)
      if(id){
        var posts;
        posts=await BlogInfo.find({_id:req.query.blogId}).exec()
        var find=await LikeInfo.findOne({userId:id,blogId:req.query.blogId},{_id:0}).exec()
        if(find){
          for(var i=0;i<1;i++){
            var profile=await UserInfo.findOne({_id:posts[i].userId}).exec()
            if(profile.profilePath){
              posts[i].authorImage=profile.profilePath.split("./source")[1]
            }
            posts[i].nickName=profile.nickName
            for(var j=0;j<posts[i].images.length;j++){
              posts[i].images[j]=posts[i].images[j].split("./source")[1]
            }
            posts[i].action=find.action
          }
          if(!(find.action.view)){
            posts[0].views+=1
            await LikeInfo.findOneAndUpdate({_id:id,blogId:req.query.blogId},{$set:{view:true}}).exec()
            await BlogInfo.findOneAndUpdate({_id:req.query.blogId},{$set:{views:(posts[0].views+1)}}).exec()
          }
        }else{
          var create=new LikeInfo({
            userId:id,
            blogId:req.query.blogId,
            action:{disLiked:false,liked:false,view:true}
          })
          for(var i=0;i<1;i++){
            var profile=await UserInfo.findOne({_id:posts[i].userId}).exec()
            if(profile.profilePath){
              posts[i].authorImage=profile.profilePath.split("./source")[1]
            }
            posts[i].nickName=profile.nickName
            for(var j=0;j<posts[i].images.length;j++){
              posts[i].images[j]=posts[i].images[j].split("./source")[1]
            }
            posts[i].action=create.action
            posts[i].views+=1
          }
          create.save()
          await BlogInfo.findOneAndUpdate({_id:req.query.blogId},{$set:{views:(posts[0].views)}}).exec()
        }
        res.send(posts[0])
      }else{
        res.send({error:"Invalid jwt token...login again"})
      }
    }else{
        var posts;
        posts=await BlogInfo.find({_id:req.query.blogId}).exec()
        for(var i=0;i<1;i++){
          var profile=await UserInfo.findOne({_id:posts[i].userId}).exec()
          posts[i].action={disLiked:false,liked:false,view:false}
          if(profile.profilePath){
            posts[i].authorImage=profile.profilePath.split("./source")[1]
          }
          posts[i].nickName=profile.nickName
          for(var j=0;j<posts[i].images.length;j++){
            posts[i].images[j]=posts[i].images[j].split("./source")[1]
          }
        }
        res.send(posts[0])
    }
  }catch(error){
    console.log(error)
    res.send({error:"The database server is offline."})
  }
})
module.exports=app


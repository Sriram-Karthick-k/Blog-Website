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
    //used to get queried single post by the user
    if(req.query.logged==='true'){//this will happen when the user is logged in 
      var {id}=jwt.verify(req.query.token,process.env.JWT_SALT)//used to get id from the token given
      if(id){//used to check the id is valid or not
        var posts;
        posts=await BlogInfo.find({_id:req.query.blogId}).exec()//getting current posts
        var find=await LikeInfo.findOne({userId:id,blogId:req.query.blogId},{_id:0}).exec()//getting wheather the post is liked or not
        if(find){//used to wheather the liked instance if found or not
          for(var i=0;i<1;i++){
            var profile=await UserInfo.findOne({_id:posts[i].userId}).exec()//used to get the posts user profile
            if(profile.profilePath){//check for profile is there or not
              posts[i].authorImage=profile.profilePath.split("./source")[1]//updating author image
            }
            posts[i].nickName=profile.nickName//updating nickname
            for(var j=0;j<posts[i].images.length;j++){
              posts[i].images[j]=posts[i].images[j].split("./source")[1]//updating image
            }
            posts[i].action=find.action//updating action
          }
          if(!(find.action.view)){//this will update when the instance is found and view is false
            posts[0].views+=1
            await LikeInfo.findOneAndUpdate({_id:id,blogId:req.query.blogId},{$set:{view:true}}).exec()
            await BlogInfo.findOneAndUpdate({_id:req.query.blogId},{$set:{views:(posts[0].views+1)}}).exec()
          }
        }else{
          //this will happen when the find instance if not found
          var create=new LikeInfo({
            userId:id,
            blogId:req.query.blogId,
            action:{disLiked:false,liked:false,view:true}
          })
          for(var i=0;i<1;i++){
            var profile=await UserInfo.findOne({_id:posts[i].userId}).exec()//used to get posts user profile
            if(profile.profilePath){//checking wheather the profile is there are not 
              posts[i].authorImage=profile.profilePath.split("./source")[1]//updating author image
            }
            posts[i].nickName=profile.nickName//updating nick name
            for(var j=0;j<posts[i].images.length;j++){
              posts[i].images[j]=posts[i].images[j].split("./source")[1]//updating image of the post
            }
            posts[i].action=create.action//updating action
            posts[i].views+=1//updating views
          }
          //updating dbs
          create.save()
          await BlogInfo.findOneAndUpdate({_id:req.query.blogId},{$set:{views:(posts[0].views)}}).exec()
        }
        res.send(posts[0])
      }else{
        res.send({error:"Invalid jwt token...login again"})
      }
    }else{
      //this will happen when the user if not logged in
        var posts;
        posts=await BlogInfo.find({_id:req.query.blogId}).exec()//getting post contents
        for(var i=0;i<1;i++){
          var profile=await UserInfo.findOne({_id:posts[i].userId}).exec()//getting posts user profile
          posts[i].action={disLiked:false,liked:false,view:false}//action updating
          if(profile.profilePath){//checking wheather the profile is there or not 
            posts[i].authorImage=profile.profilePath.split("./source")[1]//updating profile image
          }
          posts[i].nickName=profile.nickName//updating nick name
          for(var j=0;j<posts[i].images.length;j++){
            posts[i].images[j]=posts[i].images[j].split("./source")[1]//updating post image
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


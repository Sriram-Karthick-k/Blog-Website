const express=require("express")
const BlogInfo=require("../mongodb/BlgoInfo")
const LikeInfo=require("../mongodb/likes")
var app = express.Router();
var dbAlive=require("../functions/checkDb")
var removeFolder=require("../functions/removeFolder")
const verification =require("../functions/verification")
//dbAlive
app.route("/delete-post")
.post(dbAlive,verification,async (req,res)=>{
  //used to find the user name is in db or not
  try{
    var count=false
    //this is used to check if the folder is removed fully or not
    while(true){
      var count=removeFolder("./source/blog/"+req.body.id)
      if(count){
        break
      }
    }
    //deleting the blog
    await BlogInfo.findOneAndDelete({_id:req.body.id})
    .exec()
    .catch(err=>{
      res.send({error:"The database server is offline"})
    })
    //deleting the blog likes and views
    await LikeInfo.deleteMany({blogId:req.body.id})
    .exec()
    .catch(err=>{
      res.send({error:"The database server is offline"})
    })
    res.send({success:true})
  }catch(error){
    console.log(error)
   res.send({error:"The database server is offline."})
  }
})
module.exports=app


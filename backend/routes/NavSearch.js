const express=require("express")
const BlogInfo=require("../mongodb/BlgoInfo")
var app = express.Router();
var dbAlive=require("../functions/checkDb")
const verification =require("../functions/verification")
//dbAlive
app.route("/NavSearch")
.get(dbAlive,async (req,res)=>{
  //used to find the user name is in db or not
  try{
    var post=[];
    var search=req.query.type
    if(req.query.type==="all"){
      posts=await BlogInfo.find({}).exec()
    }else{
      posts=await BlogInfo.find({tagIds:{$elemMatch:{tagName:{$regex:search ,$options:"i"}}}}).exec()
    }
    for(var i=0;i<posts.length;i++){
      for(var j=0;j<posts[i].images.length;j++){
        posts[i].images[j]=posts[i].images[j].split("./source")[1]
      }
    }
    res.send(posts)
  }catch(error){
    res.send({error:"The database server is offline."})
  }
})
module.exports=app


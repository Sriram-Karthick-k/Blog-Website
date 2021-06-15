const express=require("express")
const BlogInfo=require("../mongodb/BlgoInfo")
const UserInfo=require("../mongodb/UserInfo")
var app = express.Router();
var dbAlive=require("../functions/checkDb")
const verification =require("../functions/verification")
//dbAlive
app.route("/navBarSearch")
.get(dbAlive,async (req,res)=>{
  //used to find the user name is in db or not
  try{
    var result=[];
    var search=req.query.text
    var users=await UserInfo.find({userName:{$regex:search ,$options:"i"}},{userName:1}).exec()
    var blogs=await BlogInfo.find({title:{$regex:search ,$options:"i"}},{title:1})
    var blogsUsingTag=await BlogInfo.find({tagIds:{$elemMatch:{tagName:{$regex:search ,$options:"i"}}}},{title:0,_id:0,tagIds:{$elemMatch:{tagName:{$regex:search ,$options:"i"}}}}).exec()
    console.log(users,blogs,blogsUsingTag)
    res.send({users:users,blogs:blogs,tag:blogsUsingTag})
  }catch(error){
    console.log(error)
    res.send({error:"The database server is offline."})
  }
})
module.exports=app


const express=require("express")
const BlogInfo=require("../mongodb/BlgoInfo")
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
    while(true){
      var count=removeFolder("./source/blog/"+req.body.id)
      if(count){
        break
      }
    }
    await BlogInfo.findOneAndDelete({_id:req.body.id})
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


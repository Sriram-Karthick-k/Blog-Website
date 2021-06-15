const express=require("express")
const TagsInfo=require("../mongodb/Tags")
const jwt=require("jsonwebtoken")
var app = express.Router();
var dbAlive=require("../functions/checkDb")
const verification =require("../functions/verification")
app.route("/tags")
.get(dbAlive,verification,async (req,res)=>{
  //used to find the user name is in db or not
  try{
    //gets all tag in the dbs
    var tags=await TagsInfo.find({}).sort({tagName:1}).exec()
    res.send(tags)
  }catch(error){
    res.send({error:"The database server is offline"})
  }
})
module.exports=app
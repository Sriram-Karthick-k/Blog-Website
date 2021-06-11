const express=require("express")
const BlogInfo=require("../mongodb/BlgoInfo")
var app = express.Router();
var dbAlive=require("../functions/checkDb")
const verification =require("../functions/verification")
const fs=require("fs")
const multer=require("multer")

// const uploads=require("../functions/uploadImage")
const storage=multer.diskStorage({
  destination:async function (req, file, cb) {
    if(req.body.page==="/post/blog"){
      var path="./source"
      cb(null,path)
    }
  },
  filename:function(req, file, cb){
    if(req.body.page==="/post/blog"){
      var fileName=JSON.parse(req.body.data)
    fileName=fileName.title+fileName.userName
    console.log(fileName)
    cb(null, fileName+".png")
    }
  }
})
var uploads = multer({ storage: storage }).array("uploadImage", 5)
app.route("/post/blog")
.post(dbAlive,verification,uploads,async (req,res)=>{
  //used to find the user name is in db or not
  //console.log(req.files)
  res.send({error:"testing"})
})
module.exports=app

// module.exports=uploads
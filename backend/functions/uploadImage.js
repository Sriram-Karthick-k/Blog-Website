const fs=require("fs")
const multer=require("multer")
const uuid=require("uuid")
const jwt=require("jsonwebtoken")
const storage=multer.diskStorage({
  destination:async function (req, file, cb) {
    if(req.body.page==="/post/blog"){
      var fileName=JSON.parse(req.body.data)
      var path="./source/blog/"+fileName.blogId
      if(fs.existsSync(path)){
        cb(null,path)
      }else{
        fs.mkdirSync(path,{recursive:true})
        cb(null,path)
      }
    }
    if(req.body.page==="/profile"){
      var id=jwt.verify(req.headers.authorization.split(" ")[1],process.env.JWT_SALT)
      id=id.id
      var path="./source/profile/"+id
      if(fs.existsSync(path)){
        cb(null,path)
      }else{
        fs.mkdirSync(path,{recursive:true})
        cb(null,path)
      }
    }
  },
  filename:function(req, file, cb){
    if(req.body.page==="/post/blog"){
      cb(null, uuid.v4()+".png")
    }
    if(req.body.page==="/profile"){
      cb(null,"Profile.png")
    }
  }
})
var uploads = multer({ storage: storage })
module.exports=uploads
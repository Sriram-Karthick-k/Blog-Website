const fs=require("fs")
const multer=require("multer")
const uuid=require("uuid")
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
  },
  filename:function(req, file, cb){
    if(req.body.page==="/post/blog"){
      cb(null, uuid.v4()+".png")
    }
  }
})
var uploads = multer({ storage: storage })
module.exports=uploads
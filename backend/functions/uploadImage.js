const multer=require("multer")
const storage=multer.diskStorage({
  destination:async function (req, file, cb) {
    console.log("hello")

    if(req.body.data==="/post/blog"){
      var path="./source"
      cb(null,path)
    }
  },
  filename:function(req, file, cb){
    var fileName=JSON.parse(req.body.data)
    fileName=fileName.title+fileName.userName
    cb(null, fileName)
  }
})
var uploads = multer({ storage: storage })
module.exports=uploads
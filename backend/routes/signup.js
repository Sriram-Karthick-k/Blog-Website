const Password=require("../functions/Password")
const express=require("express")
const UserInfo=require("../mongodb/UserInfo")
var app = express.Router();
var dbAlive=require("../functions/checkDb")
app.route("/signup")
.post(dbAlive,async (req,res)=>{
  var pass=new Password()
  if(pass.check(req.body.password)){
    var hash=pass.hash(req.body.password)
    var findUserName=await UserInfo.find({userName:req.body.userName}).exec()
    if(findUserName.length!==0){
      res.send({err:"The user name is not available."})
      return
    }
    var create=new UserInfo({
      userName:req.body.userName,
      nickName:req.body.nickName,
      password:hash
    })
    create.save((err,succ)=>{
      if(err){
        res.send({err:"The database server is offline."})
      }else{
        res.send({success:"Login..."})
      }
    })
    }else{
    res.send({err:"Password should contain one small,capital alphabet,number and symbol."})
  }
})
module.exports=app
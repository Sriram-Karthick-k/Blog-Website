const Password=require("../functions/Password")
const express=require("express")
const UserInfo=require("../mongodb/UserInfo")
const jwt=require("jsonwebtoken")
var app = express.Router();
var dbAlive=require("../functions/checkDb")
app.route("/login")
.post(dbAlive,async (req,res)=>{
  //used to find the user name is in db or not
  var user=await UserInfo.findOne({userName:req.body.userName}).exec()
  if(user){
    var pass=new Password()
    //compare user password and db password
    if(await pass.compare(req.body.password,user.password)){
      //generating token
      var token=jwt.sign({id:user._id},process.env.JWT_SALT,{ expiresIn: "3h" })
      res.send({userName:user.userName,nickName:user.nickName,token:token})
    }else{
      res.send({err:"Invalid passsword..."})
    }
  }else{
    res.send({err:"Invalid user name..."})
  }
})
module.exports=app
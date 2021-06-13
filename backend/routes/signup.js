const Password=require("../functions/Password")
const express=require("express")
const UserInfo=require("../mongodb/UserInfo")
var app = express.Router();
var dbAlive=require("../functions/checkDb")
app.route("/signup")
.post(dbAlive,async (req,res)=>{
  var pass=new Password()
  //checking password is right or wrong
  if(pass.check(req.body.password)){
    //hashing password
    var hash=pass.hash(req.body.password)
    //checking wheather the user is in db or not
    try{
      if(findUserName.length!==0){
        res.send({error:"The user name is not available."})
        return
      }
      var create=new UserInfo({
        userName:req.body.userName,
        nickName:req.body.nickName,
        password:hash
      })
      //saving the user to the db
      create.save((err,succ)=>{
        if(err){
          res.send({error:"The database server is offline."})
        }else{
          res.send({success:"Login..."})
        }
      })
    }catch(error){
      res.send({error:"The database server is offline"})
    }
    
    }else{
    res.send({error:"Password should contain 8 words, one small,capital alphabet,number and symbol."})
  }
})
module.exports=app
const express=require("express")
const jwt=require("jsonwebtoken")
require("dotenv").config()
var app = express.Router();
app.route("/Auth")
.get((req,res)=>{
  var token = req.query.token
  if(token){
    try {
      //check wheather the jwt token is valid or not
      var verified = jwt.verify(token, process.env.JWT_SALT)
    } catch (e) {
      console.log("jwt expired or invalid one")
    }
  }else{
    res.send({loggedIn:false})
  }
  if (verified) {
    res.send({ loggedIn: true })
  } else {
    res.send({ loggedIn: false })
  }
})
module.exports=app
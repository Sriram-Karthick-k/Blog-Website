//ExamInfos test Schema
const mongoose=require("./Main.js")
var Schema = mongoose.Schema;
var userinfo = new Schema({
  userName:{
    type:String,
    unique:true
  },
  nickName:String,
  password:String
});
var UserInfo = mongoose.model("UserInfo", userinfo);
module.exports=UserInfo

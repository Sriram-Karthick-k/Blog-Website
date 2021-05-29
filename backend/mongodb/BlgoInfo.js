//ExamInfos test Schema
const mongoose=require("./Main.js")
var Schema = mongoose.Schema;
var bloginfo = new Schema({
  userId:String,
  title:String,
  subject:String,
  likes:Number,
  views:Number,
  aboutPost:{date:{type:Date,default:Date.now},time:String},
  tagIds:{ type : Array , "default" : [] },
  comments:[{nickName:{type:String,default:"Non user"},text:String}]
});
var BlogInfo = mongoose.model("BlogInfo", bloginfo);
module.exports=UserInfo

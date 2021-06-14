//ExamInfos test Schema
const mongoose=require("./Main.js")
var Schema = mongoose.Schema;
var today = new Date();
//May 30,2021
var months=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
var date=today.toISOString().split("T")[0].split("-")
date=months[Number(date[1])-1]+", "+date[2]+", "+ date[0]
var hours = today.getHours() < 10 ? today.getHours() + "0" : today.getHours() 
var minutes = today.getMinutes() < 10 ? today.getMinutes() + "0" : today.getMinutes();
var bloginfo = new Schema({
  _id:String,
  userId:String,
  title:String,
  subject:String,
  likes:Number,
  disLikes:Number,
  views:Number,
  authorImage:String,
  action:{disLiked:Boolean,liked:Boolean,view:Boolean},
  nickName:String,
  aboutPost:{date:{type:String,"default":date},time:{type:String,default:hours+":"+minutes}},
  tagIds:{ type : Array , "default" : [] },
  images:{type:Array,"default":[]}
});
var BlogInfo = mongoose.model("BlogInfo", bloginfo);
module.exports=BlogInfo

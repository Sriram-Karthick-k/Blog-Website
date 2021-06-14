//ExamInfos test Schema
const mongoose=require("./Main.js")
var Schema = mongoose.Schema;
var likeinfos = new Schema({
  userId:String,
  blogId:String,
  action:{disLiked:Boolean,liked:Boolean,view:Boolean}
});
var LikeInfo = mongoose.model("LikeInfo", likeinfos);
module.exports=LikeInfo
//ExamInfos test Schema
const mongoose=require("./Main.js")
var Schema = mongoose.Schema;
var taginfo = new Schema({
  tagName:{
    type:String
  },
  _id:{
    type:Number,
    unique:true
  }
});
var TagInfo = mongoose.model("TagInfo", taginfo);
module.exports=TagInfo

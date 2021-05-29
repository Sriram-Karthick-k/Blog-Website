const mongoose=require("../mongodb/Main")

const Check=(req,res,next)=>{
  if(mongoose.connection.readyState===0 || mongoose.connection.readyState===2 || mongoose.connection.readyState===3 ){
    res.send({err:"The database server is offline."})
  }else{
    next()
  }
}
module.exports=Check
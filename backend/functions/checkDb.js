const mongoose=require("../mongodb/Main")

const Check=(req,res,next)=>{
  //to check wheather the db is alive or offline
  if(mongoose.connection.readyState===0 || mongoose.connection.readyState===2 || mongoose.connection.readyState===3 ){
    res.send({error:"The database server is offline."})
  }else{
    next()
  }
}
module.exports=Check
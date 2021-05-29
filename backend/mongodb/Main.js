const mongoose = require("mongoose")
mongoose.connect('mongodb://localhost:27017/Blog-DB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  auto_reconnect:true
}).catch(err=>console.log(err))
module.exports=mongoose

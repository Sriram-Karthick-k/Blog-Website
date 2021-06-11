const jwt =require("jsonwebtoken")
module.exports= function verification(req,res,next){
  var token = req.headers.authorization.split(" ")[1]
  try {
    var verified = jwt.verify(token, process.env.JWT_SALT)
  } catch (e) {
    console.log(e)
  }
  if (verified) {
    next()
  } else {
    res.send({ error: "not valid jwt" })
  }
}
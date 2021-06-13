const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors=require("cors")
require("dotenv").config()

//config
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.json())
app.use(cors({
  origin: ["http://localhost:3000"],
  methods: ["GET", "POST"],
  credentials: true
}))
//used to make source as static folder
app.use(express.static(__dirname + "/source"))

//Routes
//login
app.use(require("./routes/login"))
//signup
app.use(require("./routes/signup"))
//authentication
app.use(require("./routes/auth"))
//tags
app.use(require("./routes/tags"))
//upload
app.use(require("./routes/Post"))
//getPost
app.use(require("./routes/getPost"))
//userPost
app.use(require("./routes/userGetPost"))
//update profile
app.use(require("./routes/updateProfile"))
//deletePost
app.use(require("./routes/deletePost"))
//used to run server in port 3001
app.listen(3001,function(){
  console.log("app is running in 3001")
})
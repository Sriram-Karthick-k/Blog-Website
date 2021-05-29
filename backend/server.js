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
app.use(express.static(__dirname + "/source"))

//Routes
app.use(require("./routes/login"))
app.use(require("./routes/signup"))
app.use(require("./routes/auth"))
app.listen(3001,function(){
  console.log("app is running in 3001")
})
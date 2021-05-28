const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.post("/login", (req, res) => {
  res.send({success:true});
});

app.listen(3001,function(){
  console.log("app is running in 3001")
})
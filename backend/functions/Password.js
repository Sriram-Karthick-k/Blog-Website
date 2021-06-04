const bcrypt =require("bcrypt")
require("dotenv").config()
class Password{
  //used to hash passwords using bcrypt
  hash(password){
    return bcrypt.hashSync(password,process.env.PASSWORD_SALT)
  }
  //check the password is valid or not
  check(password){
    var count=0
    var format = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    //check for capital letter is present or not
    for(var i=0;i<password.length;i++){
      if(password[i]>="A" && password[i]<="Z"){
        count+=1
        break
      }
    }
    //check for small letter is there or not
    for(var i=0;i<password.length;i++){
      if(password[i]>="a" && password[i]<="z"){
        count+=1
        break
      }
    }
    //check for number is present or not
    for(var i=0;i<password.length;i++){
      if(password[i]>=0 && password[i]<=9){
        count+=1
        break
      }
    }
    //check for symbol is present for not
    for(var i=0;i<password.length;i++){
      if(format.test(password[i])){
        count+=1
        break
      }
    }
    //check for the length of the string
    if(password.length>=8){
      count+=1
    }
    //return true if valid or false
    if(count===5){
      return true
    }
    else{
      return false
    }
  } 
  //compare user password using bcrypt hashed password and user passing password
  async compare(password,hashPassword){
    return (await bcrypt.compare(password,hashPassword))
  }
}
module.exports=Password
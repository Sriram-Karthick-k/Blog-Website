const bcrypt =require("bcrypt")
require("dotenv").config()
class Password{
  hash(password){
    return bcrypt.hashSync(password,process.env.PASSWORD_SALT)
  }
  check(password){
    var count=0
    var format = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    for(var i=0;i<password.length;i++){
      if(password[i]>="A" && password[i]<="Z"){
        count+=1
        break
      }
    }
    for(var i=0;i<password.length;i++){
      if(password[i]>="a" && password[i]<="z"){
        count+=1
        break
      }
    }
    for(var i=0;i<password.length;i++){
      if(password[i]>=0 && password[i]<=9){
        count+=1
        break
      }
    }
    for(var i=0;i<password.length;i++){
      if(format.test(password[i])){
        count+=1
        break
      }
    }
    if(password.length>=8){
      count+=1
    }
    if(count===5){
      return true
    }
    else{
      return false
    }
  } 
  async compare(password,hashPassword){
    return (await bcrypt.compare(password,hashPassword))
  }
}
module.exports=Password

//import db.js file
const db=require("./db")

//creating function for registering logic

register=(acno,uname,psw)=>{

    //collection key:arg vallue

    return db.User.findOne({acno}).then(user=>{


        if(user){
            return {
                message:"user already exists",
                status:false,
                statusCode:402
            }
        }

        else{
            //creating an object for new user
            newuser= new db.User({
                acno:acno,
                uname:uname,
                psw:psw,
                balance:0,
                transactions:[]
            } )
                 // save new object to reflect the change in db
            newuser.save()

            return {
                message:"registered successfully",
                status:true,
                statusCode:200
            }
            
        }
    })

}



//login logic

login=(acno,psw)=>{

    return db.User.findOne({acno,psw}).then(user=>{

        if(user){
           
            return {

                message:"login succesful",
                status:true,
                statusCode:200,
                currentUser:user.uname,
                currentAcno:user.acno

            }
    
            
        }
        else{

            return{
                message:"incorrect acno or password",
                status:false,
                statusCode:401
            }
        }
    })

}

module.exports={

    register,login
}


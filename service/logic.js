
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

module.exports={

    register
}



//import db.js file
const db = require("./db")

//import jst

const jwt = require("jsonwebtoken")

//creating function for registering logic

register = (acno, uname, psw) => {

    //collection key:arg vallue

    return db.User.findOne({ acno }).then(user => {


        if (user) {
            return {
                message: "user already exists",
                status: false,
                statusCode: 404
            }
        }

        else {
            //creating an object for new user
            newuser = new db.User({
                acno: acno,
                uname: uname,
                psw: psw,
                balance: 0,
                transactions: []
            })
            // save new object to reflect the change in db
            newuser.save()

            return {
                message: "registered successfully",
                status: true,
                statusCode: 201
            }

        }
    })

}



//login logic

login = (acno, psw) => {

    return db.User.findOne({ acno, psw }).then(user => {

        if (user) {

            //token generation
            const token = jwt.sign({ currentAcno: acno }, "secretkey123")
            return {

                message: "login succesful",
                status: true,
                statusCode: 200,
                currentUser: user.uname,
                currentAcno: user.acno,
                //send to client
                token

            }


        }
        else {

            return {
                message: "incorrect acno or password",
                status: false,
                statusCode: 401
            }
        }
    })

}

getBalance = acno => {
    return db.User.findOne({ acno }).then(user => {
        if (user) {
            return {
                message: user.balance,
                status: true,
                statusCode: 200,
            }
        }
        else {
            return {
                message: "incorrect acno",
                status: false,
                statusCode: 404
            }
        }
    })
}
getUser = acno => {
    return db.User.findOne({ acno }).then(user => {
        if (user) {
            return {
                message: user,
                status: true,
                statusCode: 200,
            }
        }
        else {
            return {
                message: "incorrect acno",
                status: false,
                statusCode: 404
            }
        }
    })
}

fundTransfer = (toAcno, fromAcno, amount, psw, date) => {
    let amnt = parseInt(amount)
    return db.User.findOne({ acno: fromAcno, psw }).then(fromuser => {
        if (fromuser) {
            return db.User.findOne({ acno: toAcno }).then(touser => {
                if (touser) {
                    if (amnt > fromuser.balance) {

                        return {
                            message: "insufficient Balance",
                            status: false,
                            statusCode: 404
                        }

                    }
                    else {
                        fromuser.balance -= amnt
                        fromuser.transactions.push(
                            {
                                type: "DEBIT",
                                amount: amnt,
                                date
                            }
                        )
                        fromuser.save()
                        touser.balance += amnt
                        touser.transactions.push(
                            {
                                type: "CREDIT",
                                amount: amnt,
                                date
                            }
                        )

                        touser.save()

                        return {
                            message: "Transaction Success",
                            status: true,
                            statusCode: 200,
                            balance: fromuser.balance
                        }
                    }

                }
                else {
                    return {
                        message: "Invalid Credit credential",
                        status: false,
                        statusCode: 404
                    }
                }
            })

        }
        else {
            return {
                message: "invalid debit credential",
                status: false,
                statusCode: 404
            }
        }
    })
}
//transaction history
getTransaction = (acno) => {
    return db.User.findOne({ acno }).then(user => {
        if (user) {
            return {
                message: user.transactions,
                status: true,
                statusCode: 200
            }

        }
    })
}

deleteAc = (acno) => {
    return db.User.deleteOne({ acno }).then(deleteCount => {
        if (deleteCount) {
            return {
                message: "user deleted",
                status: false,
                statusCode: 200
            }
        }
        else {
            return {
                message: "invalid user",
                status: false,
                statusCode: 404
            }
        }
    })
}

module.exports = {

    register, login, getBalance, getUser, fundTransfer, getTransaction,deleteAc
}


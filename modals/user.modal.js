const moongose = require("mongoose")

const userschema = new moongose.Schema({
    username : String,
    email : String,
    password : String,
})

const user = moongose.model("eventuser" , userschema)


module.exports = user
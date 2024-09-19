const {Router} =  require("express")
const { signupui, create, loginui, login } = require("../controllers/user.controller")
const userrouter = Router()

userrouter.get("/signup" , signupui)
userrouter.post("/create" , create)
userrouter.get("/login" , loginui)
userrouter.post("/login" , login)


module.exports = userrouter
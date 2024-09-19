const express = require("express")
const cookie = require("cookie-parser")
const path=require("path")
const connect = require("./config/db")
const userrouter = require("./routes/user.route")
const eventroute = require("./routes/event.route")
const methodOverride = require("method-override")
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.set("view engine", "ejs")
app.set("views", __dirname + "/view")
app.use(methodOverride("_method"))
app.use(cookie())
require("dotenv").config()
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use("/user", userrouter)
app.use("/event" , eventroute)

app.use("/" ,(req , res)=>{
    res.redirect("/user/signup")
})

app.listen(process.env.PORT, () => {
    connect()
    console.log(`port is start ${process.env.PORT}`)
})
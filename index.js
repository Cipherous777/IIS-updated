
// requiring modules
require("dotenv").config()
const express = require("express")
const app = express()
const PORT = process.env.PORT ||1234
const welcomePage = require("./router/welcomePage")
const register = require("./router/registeration")
const portal = require("./router/portal")
const create = require("./router/createAccount")

// middleware

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.set("view engine" , "ejs")
app.use(express.static("public"))
app.use("/" , welcomePage)
app.use("/", register)
app.use("/", portal)
app.use("/", create)



// listening to port 
app.listen(PORT,()=>{
    console.log(`Server is running at ${PORT}`)
})
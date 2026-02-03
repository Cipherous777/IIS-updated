

// requiring modules

const admin = require("../firebase")
const db = admin.firestore()

// functions

const welcomePage = (req,res)=>{
    res.render("index")
}
const aboutPage = (req,res)=>{
    res.render("about")
}
const newsPage = (req,res)=>{
    res.render("news")
}
const news1 = (req,res)=>{
    res.render("news1")
}
const newsDated = (req,res)=>{
    res.render("dated")
}
const galleryPage = (req,res)=>{
    res.render("gallery")
}
const contactPage = (req,res)=>{
    res.render("contact")
}

const kg = (req,res)=>{
    res.render("kg")
}

const primary = (req,res)=>{
    res.render("primary")
}
const secondary = (req,res)=>{
    res.render("secondary")
}

const help = (req,res)=>{
    res.render("help")
}
const footer = async(req,res)=>{
    try{
    const {email} = req.body
    const footerSend = await db.collection("footer").add({email})
    res.render("success")}
    catch(err){
        console.log(`${err}`)
        res.render("fail")
    }
}
module.exports = {welcomePage, aboutPage, newsPage, galleryPage , contactPage, news1, newsDated, kg, primary, secondary, help, footer}

// requring modules
const admin = require("firebase-admin");

// parse the JSON from the environment variable
const serviceAccount = JSON.parse(process.env.serviceAccount);

// initializing Firestore
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore()
const auth = admin.auth()

const registerMain = (req,res)=>{
    res.render("register-main")
}
const registerStudent = (req,res)=>{
    res.render("register-student")

}
const registerTeacher = (req,res)=>{
    res.render("register-teacher")
}
const registerStudentPost = async(req,res)=>{
    try{
   const {name, email, phone, text} = req.body
   const storeData = db.collection("registeration-students").add({name,email,phone,text})
    res.render("success")
    }
    catch(err){
    console.log(`${err}`)
    res.render("fail")
    }
}
const registerTeacherPost = async(req,res)=>{
    try{
   const {name, email, phone, text} = req.body
   const storeData = db.collection("registeration-teachers").add({name,email,phone,text})
    res.render("success")
    }
    catch(err){
    console.log(`${err}`)
    res.render("fail")
    }
   
}
module.exports = {registerMain, registerStudent , registerTeacher , registerStudentPost, registerTeacherPost}
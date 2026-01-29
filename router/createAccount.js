


// requring modules

const express = require("express")
const router = express.Router()
const {studentCreate, teacherCreate , adminCreate, createStudent, createAdmin, createTeacher} = require("../controller/createAccount")

router.get("/create-account/student", studentCreate)
router.get("/create-account/teacher", teacherCreate)
router.get("/create-account/admin", adminCreate)
router.post("/createAccount/student", createStudent )
router.post("/createAccount/admin" , createAdmin)
router.post("/createAccount/teacher", createTeacher)
module.exports = router
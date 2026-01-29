

// requiring modules

const express = require("express")
const router = express.Router()
const {registerStudent, registerTeacher, registerMain, registerStudentPost, registerTeacherPost} = require("../controller/registeration")


// routes

router.get("/register" , registerMain)
router.get("/register/student" , registerStudent)
router.get("/register/teacher", registerTeacher)
router.post("/register/student", registerStudentPost)
router.post("/register/teacher", registerTeacherPost)


module.exports = router
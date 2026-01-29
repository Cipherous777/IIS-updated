// requiring modules
const express = require("express")
const router = express.Router()
const {
  mainPortal, loginStudent, loginTeacher, loginAdmin,
  studentLogin, teacherLogin, adminLogin,
  studentPortal, teacherPortal, adminPortal,
  updateStudentGrades, fetchStudentsByGrade
} = require("../controller/portal")

// main pages
router.get("/portal" , mainPortal)
router.get("/login/student" , loginStudent)
router.get("/login/teacher", loginTeacher)
router.get("/login/admin", loginAdmin)

// login actions
router.post("/login/student" , studentLogin)
router.post("/login/teacher" , teacherLogin)
router.post("/login/admin", adminLogin)

// portals
router.get("/portal/student", studentPortal)
router.get("/portal/teacher",teacherPortal)
router.get("/portal/admin", adminPortal)
router.get("/portal/teacher/students/:teacherId", fetchStudentsByGrade);
router.post("/portal/teacher/students/:teacherId/:studentId/update", updateStudentGrades);


module.exports = router

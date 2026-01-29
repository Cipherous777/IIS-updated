// requiring modules
const admin = require("firebase-admin");
const db = admin.firestore();
const auth = admin.auth();


const mainPortal = (req, res) => {
  res.render("portal");
};

const loginStudent = (req, res) => {
  res.render("login-student");
};

const loginTeacher = (req, res) => {
  res.render("login-teacher");
};

const loginAdmin = (req, res) => {
  res.render("login-admin");
};

const adminPortal = async (req, res) => {
  try {
    const studentsSnap = await db.collection("registeration-students").get();
    const students = studentsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    const teachersSnap = await db.collection("registeration-teachers").get();
    const teachers = teachersSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    res.render("portal-admin", { students, teachers });
  } catch (err) {
    console.error(err);
    res.render("fail");
  }
};
const teacherPortal = (req, res) => {
  const teacherId = req.query.teacherId;
  if (!teacherId) return res.render("fail"); // just in case
  res.render("select-grade", { teacherId });
};



const fetchStudentsByGrade = async (req, res) => {
  try {
    const { teacherId } = req.params;
    const { grade } = req.query;
    if (!grade) return res.redirect("/portal/teacher");

    // Fetch teacher's subject
    const teacherDoc = await db.collection("createAccount-teachers").doc(teacherId).get();
    if (!teacherDoc.exists) return res.render("fail");
    const teacherData = teacherDoc.data();
    const subject = teacherData.subject;

    // Fetch students of that grade
    const studentsSnap = await db.collection("createAccount-students")
      .where("grade", "==", grade)
      .get();

    const students = studentsSnap.docs.map(doc => {
      const data = doc.data();
      const subData = data.subjects?.[subject] || {};
      return {
        id: doc.id,
        name: data.name,
        phone: data.phone,
        subject,
        classTest1: subData.classTest1 || 0,
        classTest2: subData.classTest2 || 0,
        classTest3: subData.classTest3 || 0,
        mid: subData.mid || 0,
        final: subData.final || 0,
        total: ((subData.classTest1 || 0) + (subData.classTest2 || 0) + (subData.classTest3 || 0) + (subData.mid || 0) + (subData.final || 0))
      };
    });

    res.render("portal-teacher", { students, grade, teacherId });
  } catch(err) {
    console.error(err);
    res.render("fail");
  }
};

const updateStudentGrades = async (req, res) => {
  try {
    const { teacherId, studentId } = req.params;
    const { grade, classTest1, classTest2, classTest3, mid, final, subject } = req.body;

    const studentRef = db.collection("createAccount-students").doc(studentId);
    const studentDoc = await studentRef.get();
    if (!studentDoc.exists) return res.render("fail");

    const subjects = studentDoc.data().subjects || {};
    subjects[subject] = {
      classTest1: Number(classTest1 || 0),
      classTest2: Number(classTest2 || 0),
      classTest3: Number(classTest3 || 0),
      mid: Number(mid || 0),
      final: Number(final || 0)
    };

    await studentRef.update({ subjects });

    res.redirect(`/portal/teacher/students/${teacherId}?grade=${grade}`);
  } catch(err) {
    console.error(err);
    res.render("fail");
  }
};


const studentPortal = async (req, res) => {
  try {
    const studentId = req.query.studentId; // or from session
    if (!studentId) return res.render("fail");

    const studentDoc = await db.collection("createAccount-students").doc(studentId).get();
    if (!studentDoc.exists) return res.render("fail");

    const studentData = studentDoc.data();

    // Subjects & grades
    const subjects = [];
    if (studentData.subjects) {
      for (let [sub, grades] of Object.entries(studentData.subjects)) {
        subjects.push({
          name: sub,
          classTest1: grades.classTest1 || 0,
          classTest2: grades.classTest2 || 0,
          classTest3: grades.classTest3 || 0,
          mid: grades.mid || 0,
          final: grades.final || 0,
          total: (grades.classTest1 || 0) + (grades.classTest2 || 0) + (grades.classTest3 || 0) + (grades.mid || 0) + (grades.final || 0)
        });
      }
    }

    // Resources → Ministry of Education / SAT / Scholarships
    const resources = [
      { title: "Ethiopian MoE Exam Guidelines", link: "https://www.moe.gov.et/exam-guidelines" },
      { title: "SAT Test Info", link: "https://collegereadiness.collegeboard.org/sat" },
      { title: "Scholarship Opportunities", link: "https://www.moe.gov.et/scholarships" }
    ];

    // Functional tab → Exams & Deadlines
    const exams = [
      { title: "Mid-term Exams", date: "2026-02-15" },
      { title: "National Exam Registration Deadline", date: "2026-03-01" },
      { title: "Final Exams", date: "2026-05-20" }
    ];

    res.render("portal-student", { studentData, subjects, resources, exams });
  } catch (err) {
    console.error(err);
    res.render("fail");
  }
};


const studentLogin = async (req, res) => {
  try {
    const { secret, phone, password } = req.body;
    const fetchData = await db.collection("createAccount-students")
      .where("phone", "==", phone)
      .where("password", "==", password)
      .where("secret", "==", secret)
      .get();

    if (fetchData.empty) return res.render("fail");

    const studentDoc = fetchData.docs[0];
    const studentId = studentDoc.id;  // get the actual document ID

    // redirect with studentId in query
    res.redirect(`/portal/student?studentId=${studentId}`);
  } catch (err) {
    console.error(err);
    res.render("fail");
  }
};


/* -------------------------
   TEACHER & ADMIN LOGIN
------------------------- */

const teacherLogin = async (req, res) => {
  try {
    const { phone, password, secret } = req.body;
    const fetchData = await db.collection("createAccount-teachers")
      .where("phone", "==", phone)
      .where("password", "==", password)
      .where("secret", "==", secret)
      .get();

    if (fetchData.empty) return res.render("fail");

    const teacherDoc = fetchData.docs[0]; // first match
    const teacherId = teacherDoc.id;       // real teacher document ID

    // redirect with teacherId in query
    res.redirect(`/portal/teacher?teacherId=${teacherId}`);
  } catch (err) {
    console.error(err);
    res.render("fail");
  }
};


const adminLogin = async (req, res) => {
  try {
    const { phone, password, secret } = req.body;
    const fetchData = await db.collection("createAccount-admins")
      .where("phone", "==", phone)
      .where("password", "==", password)
      .where("secret", "==", secret)
      .get();

    if (fetchData.empty) return res.render("fail");
    res.redirect("/portal/admin");
  } catch (err) {
    console.error(err);
    res.render("fail");
  }
};

module.exports = {
  mainPortal,
  loginStudent,
  loginTeacher,
  loginAdmin,
  teacherLogin,
  adminLogin,
  studentLogin,
  studentPortal,
  teacherPortal,
  adminPortal,
  fetchStudentsByGrade,
  updateStudentGrades
};

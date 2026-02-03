// requiring modules
const admin = require("firebase-admin");

const db = admin.firestore();

const adminCreate = (req, res) => {
  res.render("adminCreate" , {errorMessage:""});
};

const studentCreate = (req, res) => {
  res.render("studentCreate", {errorMessage:""});
};

const teacherCreate = (req, res) => {
  res.render("teacherCreate", {errorMessage:""});
};



const getSecrets = async () => {
  const doc = await db.collection("secrets").doc("secrets").get();
  if (!doc.exists) return null;
  return doc.data();
};



const createAdmin = async (req, res) => {
  try {
    const { name, phone, password, secret } = req.body;

    if (!name || !phone || !password || !secret) {
      return res.render("fail");
    }
    const phoneExists = await db
    .collection("createAccount-admins")
    .where("phone", "==", phone)
    .get()
    let errorMessage
    if(!phoneExists.empty){
      errorMessage = "Phone number exists"
      return res.render("adminCreate" , {errorMessage})
    }

    const secrets = await getSecrets();
    if (!secrets || secret !== secrets.admin) {
      return res.render("fail");
    }

    await db.collection("createAccount-admins").add({
      name,
      phone,
      password,
      secret,
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    });

    res.render("success");
  } catch (err) {
    console.error(err);
    res.render("fail");
  }
};

/* ---------- STUDENT ---------- */

const createStudent = async (req, res) => {
  try {
    const { name, phone, password, secret, grade } = req.body;

    if (!name || !phone || !password || !secret) {
      return res.render("fail");
    }
   
      // check if phone exists
      const checkPhone = await db
      .collection("createAccount-students")
      .where("phone", "==" , phone)
      .get()
   
       let errorMessage
      if(!checkPhone.empty){
        errorMessage = "Phone already exists"
        return res.render("studentCreate" , {errorMessage})
      }

    const secrets = await getSecrets();
    if (!secrets || secret !== secrets.student) {
      return res.render("fail");
    }

    await db.collection("createAccount-students").add({
      name,
      phone,
      password,
      grade,
      secret,
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    });

    res.render("success");
  } catch (err) {
    console.error(err);
    res.render("fail");
  }
};

/* ---------- TEACHER ---------- */

const createTeacher = async (req, res) => {
  try {
    const { name, phone, password, secret, subject } = req.body;

    if (!name || !phone || !password || !secret) {
      return res.render("fail");
    }

     // check if phone number exists
     const checkPhone = await db
     .collection("createAccount-teachers")
     .where("phone" , "==", phone)
     .get()
     
     let errorMessage

     if(!checkPhone.empty){
      errorMessage = "Phone number is taken!"
      res.render("teacherCreate", {errorMessage})
     }


    const secrets = await getSecrets();
    if (!secrets || secret !== secrets.teacher) {
      return res.render("fail");
    }

    await db.collection("createAccount-teachers").add({
      name,
      phone,
      password,
         secret,
         subject,
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    });

    res.render("success");
  } catch (err) {
    console.error(err);
    res.render("fail");
  }
};

/* ========================= */

module.exports = {
  adminCreate,
  studentCreate,
  teacherCreate,
  createAdmin,
  createStudent,
  createTeacher
};

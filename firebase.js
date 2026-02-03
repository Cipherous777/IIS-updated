const admin = require('firebase-admin');
const serviceAccount = require('./firebase-key.json'); // correct path

if (!admin.apps.length) { // this ensures it initializes only once
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
       
    });
}

module.exports = admin;

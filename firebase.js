const admin = require('firebase-admin');

if (!process.env.FIREBASE_KEY) {
  throw new Error("FIREBASE_KEY env variable is missing!");
}

let serviceAccount;
try {
  serviceAccount = JSON.parse(process.env.FIREBASE_KEY);
} catch (err) {
  console.error("Failed to parse FIREBASE_KEY:", err);
  process.exit(1);
}

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

module.exports = admin;

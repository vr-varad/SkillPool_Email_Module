let admin = require("firebase-admin");

let serviceAccount = require("../skillpool-73396-firebase-adminsdk-9dy8e-f2411388b6.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
const emailId = db.collection("emailId");
const emails = db.collection('emails')
module.exports = {
    emailId,
    emails
};


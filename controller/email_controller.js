const admin = require("firebase-admin");
const { emailId, emails } = require("../database/firebase");

// to generate a random email
const generateMail = async (req, res) => {
  try {
    const { name } = req.body;
    const formattedName = name.toLowerCase().replace(/\s/g, "");
    const randomNumber = Math.floor(Math.random() * 10000);
    const email = `${formattedName}${randomNumber}@skillpool.tech`;
    await emailId.add({ email });
    return res.status(200).json({ email });
  } catch (error) {
    console.log(error);
  }
};

const sendEmails = async (req, res) => {
  const { sender, reciever, message } = req.body;
  const isSender = await emailId.get({ email: sender });
  const isReciever = await emailId.get({ email: reciever });

  // postmark api

  if (!isSender || !isReciever)
    return res.status(400).json({ error: "Invalid email" });
  const email = await emails.add({ sender, reciever, message });
  return res.json({ message: "Email sent", email });
};

// to get all the emails recieved by a particular user
const recievedEmails = async (req, res) => {
  try {
    const { reciever } = req.body;
    const isSender = await emailId.get({ email: reciever });
    if (!isSender) {
      return res.status(400).json({ error: "Invalid email" });
    }
    const snapshot = await emails.get();
    const allEmail = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    const email = allEmail.filter((mail) => mail.reciever === reciever);
    return res.json({ email });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};


// to get all the emails sent by a particular user
const sentEmails = async (req, res) => {
  try {
    const { sender } = req.body;
    const isSender = await emailId.get({ email: sender });
    if (!isSender) {
      return res.status(400).json({ error: "Invalid email" });
    }
    const snapshot = await emails.get();
    const allEmail = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    const email = allEmail.filter((mail) => mail.sender === sender);
    return res.json({ email });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  generateMail,
  sendEmails,
  sentEmails,
  recievedEmails,
};

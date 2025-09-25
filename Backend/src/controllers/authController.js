// Backend/controllers/authController.js
const { OAuth2Client } = require('google-auth-library');
const Student = require('../models/Student');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const verifyGoogleToken = async (token) => {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_CLIENT_ID,
  });
  return ticket.getPayload();
};

exports.googleLogin = async (req, res) => {
  try {
    const { token } = req.body;
    const payload = await verifyGoogleToken(token);

    const { sub: googleId, name, email, picture } = payload;

    let student = await Student.findOne({ googleId });
    if (!student) {
      student = await Student.create({ googleId, name, email, profilePic: picture });
    }

    res.status(200).json({ message: 'Login successful', student });
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: 'Invalid token' });
  }
};
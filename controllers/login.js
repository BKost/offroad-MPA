const { getDB } = require("../db");
const jwt = require("jsonwebtoken");

const db = getDB("Offroad");
const usersCollection = db.collection("Users");

const login = async (req, res) => {
  const { password, email } = req.body;

  // console.log(password, email);

  if (!password || !email) {
    return res.status(400).json({ message: "Please fill required fields" });
  }

  try {
    const user = await usersCollection.findOne({ email });

    if (!user) {
      return res.json({ message: `Account with email ${email} doesnt exist.` });
    }

    if (user.password !== password) {
      return res.json({ message: "Incorrect credentials" });
    }

    // console.log(user);
    const { user_name, _id } = user;

    const token = jwt.sign({ _id, user_name }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_LIFETIME,
    });

    // console.log(req.cookies);

    const oneDay = 1000 * 60 * 60 * 24;

    res.cookie("token", token, {
      maxAge: oneDay,
      httpOnly: true,
    });

    res.cookie(
      "user",
      { user_name, _id },
      {
        maxAge: oneDay,
      }
    );

    res.json({ user_name, message: "Cookie sent" });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  login,
};

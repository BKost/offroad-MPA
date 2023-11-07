const { getDB } = require("../db");

const db = getDB("Offroad");

const login = async (req, res) => {
  // const eightHours = 1000 * 60 * 60 * 8;

  // res.cookie("myCookie", "shortCookieSet", {
  //   maxAge: 20000,
  //   httpOnly: true,
  // });

  // console.log(req.cookies);

  console.log(req.headers.cookie);

  res.json({ message: "logged in" });

  // retrieve email and password, check if user exists in db
  // if user exists send back cookie
  //
};

module.exports = {
  login,
};

const { getDB } = require("../db");

const db = getDB("Offroad");

const registerUser = async (req, res) => {
  const data = req.body;

  const responseObject = {};

  const {
    first_name,
    last_name,
    user_name,
    email,
    password,
    confirm_password,
  } = data;

  if (
    !first_name ||
    !last_name ||
    !user_name ||
    !email ||
    !password ||
    !confirm_password
  ) {
    responseObject.message = "Please fill the required fields";
    return res.status(400).json(responseObject);
  }

  if (password !== confirm_password) {
    responseObject.message = "Password doesn't match after confirmation";

    return res.status(400).json(responseObject);
  }

  try {
    const existingEmail = await db.collection("Users").findOne({ email });

    if (existingEmail) {
      responseObject.message = `User with email ${email} already exists`;
      return res.status(400).json(responseObject);
    }

    await db.collection("Users").insertOne(data);
    responseObject.location = "/login";
    responseObject.message = "New user registered";
    res.status(200).json(responseObject);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  registerUser,
};

const e = require("express");
const { getDB } = require("../db");
const { ObjectId } = require("mongodb");

const db = getDB("Offroad");

const getUserData = async (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    return res.status(400).json({ message: "Provide user ID" });
  }

  try {
    const user = await db
      .collection("Users")
      .findOne({ _id: new ObjectId(userId) });

    if (!user) {
      console.log("User doesnt exist");
      return res.status(400).json({ message: "User doesnt exist" });
    }

    res.status(200).json(user);
    // console.log(userId);
    // console.log(user);
  } catch (error) {
    console.log(error);
  }
};

const updateUser = async (req, res) => {
  const { userId } = req.params;

  const data = req.body;

  const { password, confirm_password } = data;

  console.log(data);

  if (!userId) {
    res.status(400).json({ messge: "Invalid userId" });
  }

  if (password !== confirm_password) {
    res.status(400).json({ message: "Passwords do not match" });
  }

  try {
    const user = await db
      .collection("Users")
      .findOneAndUpdate({ _id: new ObjectId(userId) }, { $set: data });

    console.log(user);

    res.status(200).json({ message: "User updated" });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getUserData,
  updateUser,
};

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

module.exports = {
  getUserData,
};

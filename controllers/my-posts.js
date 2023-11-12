const { getDB } = require("../db");

const db = getDB("Offroad");

const getPosts = async (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    res.status(400).json({ message: "Provide userId" });
  }

  try {
    const posts = await db
      .collection("Posts")
      .find({ "createdBy.userId": userId })
      .toArray();
    console.log(posts);

    console.log(userId);

    if (!posts) {
      res.status(400).json({ message: "Error getting posts data" });
    }

    res.status(200).json({ data: posts });
  } catch (error) {
    console.log(error);
  }
};

const uploadNewPost = async (req, res) => {
  const postData = req.body;
  // Add addditional checks

  if (!postData) {
    res.status(400).json({ message: "Provide post data" });
  }

  try {
    const postUpload = await db.collection("Posts").insertOne(postData);
    console.log(postUpload);
    res.status(200).json({ message: "Uploaded post" });
  } catch (error) {
    res.json({ message: "Something went wrong" });
    console.log(error);
  }
};

module.exports = {
  getPosts,
  uploadNewPost,
};

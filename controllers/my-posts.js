const { getDB } = require("../db");

const db = getDB("Offroad");

const getPosts = async (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    res.status(400).json({ message: "Provide userId" });
  }

  try {
    const posts = await db.collection("Posts").find().toArray();
    console.log(posts);

    if (!posts) {
      res.status(400).json({ message: "Error getting posts data" });
    }

    res.status(200).json({ data: posts });
  } catch (error) {
    console.log(error);
  }
};

const uploadNewPost = async (req, res) => {
  const data = req.body;

  console.log(data);

  res.json({ message: "Uploaded new post" });
};

module.exports = {
  getPosts,
  uploadNewPost,
};

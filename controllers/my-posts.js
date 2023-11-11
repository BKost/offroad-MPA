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
  // const imageFile = req.files.image;
  // console.log(req.files.image);
  // console.log("Success");
  // const filePath = path.join(__dirname, `../uploads/${imageFile.name}`);
  // try {
  //   await imageFile.mv(filePath);
  //   res.json({ message: "Upload Image" });
  // } catch (error) {
  //   console.log(error);
  // }
  res.json({ message: "Upload Image" });
};

module.exports = {
  getPosts,
  uploadNewPost,
};

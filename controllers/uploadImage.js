const path = require("path");

const uploadImage = async (req, res) => {
  const imageFile = req.files.image;
  console.log(req.files.image);

  const filePath = path.join(__dirname, `../uploads/${imageFile.name}`);

  try {
    await imageFile.mv(filePath);
    res.json({ message: "Upload Image" });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  uploadImage,
};

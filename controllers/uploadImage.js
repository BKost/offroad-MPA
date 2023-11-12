const path = require("path");

const uploadImage = async (req, res) => {
  const imageFile = req.files.image;
  console.log(req.files.image);
  console.log("Success");

  const filePath = path.join(__dirname, `../uploads/${imageFile.name}`);

  try {
    await imageFile.mv(filePath);
    res.json({ imagePath: `/uploads/${imageFile.name}` });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  uploadImage,
};

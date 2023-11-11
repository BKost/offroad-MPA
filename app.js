const express = require("express");
require("dotenv").config();
const app = express();

const { connectToDatabase, getDB } = require("./db");

// const registerRouter = require("./routes/register");

// Controllers
const { registerUser } = require("./controllers/register");
const { login } = require("./controllers/login");
const { getUserData, updateUser } = require("./controllers/user");
const { getPosts, uploadNewPost } = require("./controllers/my-posts");
const { uploadImage } = require("./controllers/uploadImage");

const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const authMiddleware = require("./middleware/auth");

// const db = getDB("Offroad");
app.use(fileUpload());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// app.use("/auth", authMiddleware);

app.use("/images", express.static("./images"));
app.use("/styles", express.static("./styles"));
app.use("/scripts", express.static("./scripts"));

const pathToStaticHtml = `${__dirname}/static-2`;

// Home
app.get("/", (req, res) => {
  res.status(200).sendFile(`${pathToStaticHtml}/home.html`);
});

// Register
app.get("/register", (req, res) => {
  res.status(200).sendFile(`${pathToStaticHtml}/register.html`);
});

app.post("/register", registerUser);

// Log in
app.get("/login", (req, res) => {
  res.status(200).sendFile(`${pathToStaticHtml}/login.html`);
});
app.post("/login", login);

app.get("/logout", authMiddleware, (req, res) => {
  // const { token } = req.cookies;

  // res.clearCookie('token')
  res.cookie("token", "token-cookie-deleted", { httpOnly: true, maxAge: 0 });
  res.redirect("/");
});

app.get("/marketplace", (req, res) => {
  res.status(200).sendFile(`${pathToStaticHtml}/marketplace.html`);
});

app.get("/my-posts/:userId", getPosts);

app.post("/my-posts/:userId", uploadNewPost);

app.post("/uploads", uploadImage);

app.get("/my-posts", (req, res) => {
  res.status(200).sendFile(`${pathToStaticHtml}/my-posts.html`);
});

app.get("/user", authMiddleware, (req, res) => {
  res.status(200).sendFile(`${pathToStaticHtml}/user.html`);
});

app.get("/user/:userId", authMiddleware, getUserData);

app.post("/user/:userId", authMiddleware, updateUser);

// async function getUserData(req, res) {
//   console.log(req.params);
//   res.status(200).json({ message: "Success" });
// }

const start = async () => {
  try {
    await connectToDatabase();
    const port = 4000;
    app.listen(port, () => {
      console.log(`App listening on port ${port}`);
    });
  } catch (error) {
    console.log(`Error starting app ${error}`);
  } finally {
    // dbClient.close();
  }
};

start();

// app.use("/", express.static("./static/home"));
// app.use("/marketplace", express.static("./static/marketplace"));
// app.use("/register", express.static("./static/register"));
// app.use("/login", express.static("./static/login"));
// app.use("/user", express.static(".static/user"));
// app.use("/my-posts", express.static("./static/my-posts"));

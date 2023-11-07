const express = require("express");
require("dotenv").config();
const app = express();

const { connectToDatabase, getDB } = require("./db");

// const registerRouter = require("./routes/register");

const { registerUser } = require("./controllers/register");
const { login } = require("./controllers/login");

const cookieParser = require("cookie-parser");

// const db = getDB("Offroad");
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

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

app.get("/marketplace", (req, res) => {
  res.status(200).sendFile(`${pathToStaticHtml}/marketplace.html`);
});

app.get("/my-posts", (req, res) => {
  res.status(200).sendFile(`${pathToStaticHtml}/my-posts.html`);
});
app.get("/user", (req, res) => {
  res.status(200).sendFile(`${pathToStaticHtml}/user.html`);
});

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

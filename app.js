const express = require("express");
require("dotenv").config();
const app = express();

const { connectDB } = require("./db");

app.use("/images", express.static("./images"));
app.use("/styles", express.static("./styles"));
app.use("/scripts", express.static("./scripts"));

const pathToStaticHtml = `${__dirname}/static-2`;

app.get("/", (req, res) => {
  res.status(200).sendFile(`${pathToStaticHtml}/home.html`);
});
app.get("/register", (req, res) => {
  res.status(200).sendFile(`${pathToStaticHtml}/register.html`);
});
app.get("/marketplace", (req, res) => {
  res.status(200).sendFile(`${pathToStaticHtml}/marketplace.html`);
});
app.get("/login", (req, res) => {
  res.status(200).sendFile(`${pathToStaticHtml}/login.html`);
});
app.get("/my-posts", (req, res) => {
  res.status(200).sendFile(`${pathToStaticHtml}/my-posts.html`);
});
app.get("/user", (req, res) => {
  res.status(200).sendFile(`${pathToStaticHtml}/user.html`);
});

app.post("/register/");

const start = async () => {
  const port = 4000;
  try {
    await connectDB("Offroad");
    app.listen(port, () => {
      console.log(`App listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();

// app.use("/", express.static("./static/home"));
// app.use("/marketplace", express.static("./static/marketplace"));
// app.use("/register", express.static("./static/register"));
// app.use("/login", express.static("./static/login"));
// app.use("/user", express.static(".static/user"));
// app.use("/my-posts", express.static("./static/my-posts"));

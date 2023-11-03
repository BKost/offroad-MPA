const express = require("express");
const app = express();

const port = 4000;

app.use("/images", express.static("./images"));

app.use("/", express.static("./home"));

app.use("/marketplace", express.static("./marketplace"));
app.use("/register", express.static("./register"));
app.use("/login", express.static("./login"));
app.use("/user", express.static("./user"));
app.use("/my-posts", express.static("./my-posts"));

// app.get("/", (req, res) => {
//   res.send("More");
// });

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

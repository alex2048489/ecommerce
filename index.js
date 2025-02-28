const express = require("express");
const dotenv = require("dotenv");
const initAPIRoutes = require("./src/routes/index.js");

dotenv.config();
const app = express();
const port = process.env.PORT | 8000;

//Hỗ trợ gửi data lên server và ngược lại
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );

  next();
});

initAPIRoutes(app);

//404 Not Found
app.use((req, res) => {
  return res.send("404 Page Not Found");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

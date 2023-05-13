const express = require("express");
const app = express();

// //Get the database
const db = require("./utils/connectdb");
db.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("DB have been connected");
  }
});

//Use JSON FILES
app.use(express.json());

//Require all routes
const authRoute = require("./routes/auth");

app.use("/api/v1", authRoute);

app.listen(3000, () => {
  console.log("Server is listing at port 3000");
});
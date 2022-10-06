const express = require("express");
const app = express();
const cors = require("cors");

require("dotenv").config();
const mongoose = require("mongoose");
//const cors = require("cors");

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//require
 
const user = require("./routes/user")
const category = require("./routes/category")
const subcategory = require("./routes/subcategory")
//console
 
//use
app.use("/", user);
app.use("/", category);
app.use("/", subcategory);
app.get("/", (req, res) => {
  res.send("Hello World!");
});

//console.log(process.env.DB);
mongoose
  .connect(process.env.DB, {
    useNewUrlParser: true,
    // useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    //useFindAndModify: false,
  })
  .then(() => {
    console.log("DB CONNECTED SUCCEFULLY");
  })
  .catch((error) => {
    console.log(error);
  });
  

app.listen(process.env.PORT || 9000, () => {
  console.log("Example app listening on port 9000");
});

//    http://localhost:5000/admin

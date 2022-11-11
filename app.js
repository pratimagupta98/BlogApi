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
const admin = require("./routes/admin")
const year = require("./routes/year")
const language = require("./routes/language")

const submit_resrc = require("./routes/submit_resrc")
const blog = require("./routes/blog")
const newsletter = require("./routes/newsletter")

const contact_us = require("./routes/contact_us")
const featured_cnt = require("./routes/featured_cnt")
const newslttr_video = require("./routes/newslttr_video")
const like = require("./routes/like")
const comments = require("./routes/comments")
const faq = require("./routes/faq")
const privacy_policy = require("./routes/privacy_policy")
const terms_condition = require("./routes/terms_condition")
const how_it_works = require("./routes/how_it_works")
const notification = require("./routes/notification")


//console

//use
app.use("/", user);
app.use("/", category);
app.use("/", subcategory);
app.use("/", admin);
app.use("/", year);

app.use("/", language);
app.use("/", submit_resrc);
app.use("/", blog);
app.use("/", newsletter);
app.use("/", contact_us);
app.use("/", featured_cnt);
app.use("/", newslttr_video);
app.use("/", like);
app.use("/", comments);
app.use("/", faq);
app.use("/", privacy_policy);
app.use("/", terms_condition);
app.use("/", how_it_works);
app.use("/", notification);









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

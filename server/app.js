var express = require("express");
var bodyParser = require("body-parser");
var mysql = require("mysql2");
var path = require("path");

var connection = mysql.createConnection({
  host: "35.193.80.86",
  user: "root",
  password: "Qal:5;Xl^{3?blmT",
  database: "crime_in_la",
});
// const cors = require("cors");
// const corsOptions = {
//   origin: "*",
//   credentials: true,
//   optionSuccessStatus: 200,
// };
// app.use(cors(corsOptions));

connection.connect;

var app = express();

// set up ejs view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + "../public"));

/* GET home page, respond by rendering index.ejs */
app.get("/", function (req, res) {
  res.render("index", { title: "Mark Attendance" });
});

app.get("/success", function (req, res) {
  res.send({ message: "Attendance marked successfully!" });
});

// this code is executed when a user clicks the form submit button
app.post("/mark", function (req, res) {
  var netid = req.body.netid;

  var sql = `INSERT INTO users VALUES ('${netid}')`;

  console.log(sql);
  connection.query(sql, function (err, result) {
    if (err) {
      res.send(err);
      return;
    }
    res.redirect("/success");
  });
});

app.listen(80, function () {
  console.log("Node app is running on port 80");
});

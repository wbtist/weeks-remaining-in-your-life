const express = require("express");
const bodyParser = require("body-parser");
const { differenceInDays } = require("date-fns");
const path = require("path");

const port = 3000;
const app = express();

// TODO: Variables can be defined and used per page, clean it up!
let firstname = "";
let dob = "";
let birthYear = "";
let birthMonth = "";
let birthDay = "";
const today = new Date();
let date =
  today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
let currentYear = today.getFullYear();
let currentMonth = today.getMonth() + 1;
let currentDay = today.getDay();
// let weeksLived;
// let daysLived;

// app.use(express.static(__dirname + "/public"));
app.use(express.static(path.join(__dirname, "/public")));
app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
});
app.get("/second", (req, res) => {
  const daysLived = differenceInDays(
    new Date(currentYear, currentMonth, currentDay),
    new Date(birthYear, birthMonth, birthDay)
  );
  const weeksLived = Math.floor((daysLived + 1) / 7);
  console.log(dob, daysLived);
  res.render("second", {
    firstName: firstname,
    dob: dob,
    daysLived: daysLived,
    weeksLived: weeksLived,
  });
});

app.post("/", (req, res) => {
  const now = new Date();
  firstname = req.body.firstname;
  dob = req.body.dob;
  birthYear = Number(dob.slice(0, 4));
  birthMonth = Number(dob.slice(5, 7));
  birthDay = Number(dob.slice(-2));
  res.redirect("/second");
});

app.listen(process.env.port || port, () => {
  console.log(`Server is running on port ${port}`);
});

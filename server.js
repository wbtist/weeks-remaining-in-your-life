const express = require("express");
const bodyParser = require("body-parser");
const { differenceInDays } = require("date-fns");
// const path = require("path");

const port = 3000;
const app = express();

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
let age = 0;
let weeksleft = 0;
const ukLifeExpectancy = 83;

app.use(express.static(__dirname + "/public"));
// app.use(express.static(path.join(__dirname, "/public")));
app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/test", (req, res) => {
  res.render("test");
});

app.get("/results", (req, res) => {
  const daysLived = differenceInDays(
    new Date(currentYear, currentMonth, currentDay),
    new Date(birthYear, birthMonth, birthDay)
  );
  const weeksLived = Math.floor((daysLived + 1) / 7);
  console.log(dob, daysLived);
  res.render("results", {
    firstName: firstname,
    dob: dob,
    daysLived: daysLived,
    weeksLived: weeksLived,
    age: age,
    weeksleft: weeksleft
  });
});

app.post("/", (req, res) => {
  const now = new Date();
  firstname = req.body.firstname;
  dob = req.body.dob;
  birthYear = Number(dob.slice(0, 4));
  birthMonth = Number(dob.slice(5, 7));
  birthDay = Number(dob.slice(-2));
  age = currentYear - birthYear;
  weeksleft = Math.floor((ukLifeExpectancy - age) * 52.143);
  res.redirect("/results");
});

app.listen(process.env.port || port, () => {
  console.log(`Server is running on port ${port}`);
});

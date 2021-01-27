var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var session = require("./node_modules/express-session");
const { mongoDB, frontendURL } = require("./Utils/config");
var cors = require("./node_modules/cors/lib");
const approveusers = require("./routes/admin/approveusers");
const adminuser = require("./routes/admin/users");
const nodemailer = require('nodemailer');
const Login = require("./routes/Login/Login");
const search = require("./routes/search/propertySearch");
const manageProperty = require("./routes/property/manageProperty");
const applicants = require("./routes/applications/applicants");

//use cors to allow cross origin resource sharing
app.use(cors({ origin: frontendURL, credentials: true }));

app.use(express.static("./public"));

//use express session to maintain session data
app.use(
  session({
    secret: "cmpe20_passport_mongo",
    resave: false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized: false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
    duration: 60 * 60 * 1000, // Overall duration of Session : 30 minutes : 1800 seconds
    activeDuration: 5 * 60 * 1000,
  })
);

app.use(bodyParser.json());

//Allow Access Control
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", frontendURL);
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  res.setHeader("Cache-Control", "no-cache");
  next();
});

const mongoose = require("mongoose");

var options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  poolSize: 400,
  bufferMaxEntries: 0,
};

mongoose.connect(mongoDB, options, (err, res) => {
  if (err) {
    console.log(err);
    console.log(`MongoDB Connection Failed`);
  } else {
    console.log(`MongoDB Connected`);
  }
});



app.use(express.json());
//const Login = require("./routes/Login/Login");
const renter = require("./routes/renter/application");

app.use("/user", Login);

//start your server on port 3001
//app.listen(8000, () => console.log("Server Listening on port 8000"));

app.use("/authorise", approveusers);
app.use("/search", search);
app.use("/admin/users", adminuser);
app.use("/renter", renter);

app.use("/manageProperty", manageProperty);
app.use("/applicants", applicants);
//start your server on port 3001
app.listen(3001, () => console.log("Server Listening on port 3001"));

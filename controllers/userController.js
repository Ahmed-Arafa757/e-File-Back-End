const Users = require("../models/userModel");
require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
var mongoose = require("mongoose");


module.exports = function (app) {



    /////////login/////////
   app.post("/user/login", (req, res) => {
       Users.find({
               userName: req.body.userName,
           },
           async function (err, USER) {
               if (err) throw err;

               try {
                   if (
                       (req.body.password === USER[0].password)
                   ) {
                       const accessToken = jwt.sign(
                           USER[0].userName,
                           process.env.ACCESS_TOKEN_SECRET
                       );
                       const UserName = USER[0].userName;

                       res.status(200).json({
                           accessToken,
                           UserName,
                       });
                   } else {
                       res.status(401).send("incorrect password");
                   }
               } catch {
                   res.status(401).send("User Name not found");
               }
           }
       );
   });



};


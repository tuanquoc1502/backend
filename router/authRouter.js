const express = require('express')
let routerAuth = express.Router()
const AuthSchema = require('../models/auth')

routerAuth.post("/register", (req, res) => {
    const authSchema = new AuthSchema(req.body);
    authSchema
      .save()
      .then((authSchema) => {
        res.status(200).json(authSchema);
      })
      .catch((err) => {
        res.status(400).send("adding new authSchema failed");
      });
  });

  routerAuth.get('/usersList', function(req, res) {
    AuthSchema.find({}, function(err, users) {
      var userMap = {};
  
      users.forEach(function(user) {
        userMap[user._id] = user;
      });
  
      res.send(userMap);  
    });
  });

module.exports = routerAuth
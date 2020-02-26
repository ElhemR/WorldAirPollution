
const express = require('express');
const app = express();
const cityRoutes = express.Router();

let City = require('../models/City');


cityRoutes.route('/').get(function (req, res) {
  City.find(function (err, citites) {
    if (err) {
      console.log(err);
    }
    else {
      res.json(cities);
    }
  });
});






module.exports = cityRoutes;

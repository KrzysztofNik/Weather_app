const express = require('express');
const router = express.Router();
const getWeather = require('./Weather')

router.post('/getWeather',getWeather);

module.exports = router
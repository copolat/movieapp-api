const express = require('express')
const router = express.Router()

// import the model
const MovieModel = require('../models/Movie')

// GET request with node-express-get snippet
router.get('/', (req, res) => {
  res.send('GET request to the homepage !!!!')
})

// Export the route
module.exports = router
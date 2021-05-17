const express = require('express')
const testingController = require('../controllers/testing.js')
const testingRouter = express.Router()

testingRouter.post('/reset', testingController.resetDatabase)

module.exports = testingRouter
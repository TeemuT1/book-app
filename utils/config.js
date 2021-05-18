require('dotenv').config()

let PORT = process.env.PORT || 5000
let MONGODB_URI = process.env.MONGODB_URI
let TEST = false

if (process.env.NODE_ENV === 'test') {
  TEST = true
  MONGODB_URI = process.env.TEST_MONGODB_URI
}

module.exports = {
  MONGODB_URI,
  PORT,
  TEST
}
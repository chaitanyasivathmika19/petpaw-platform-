const maincontroller = require('../controllers/maincontroller')

const express = require("express")
const mainrouter  = express.Router()

mainrouter.get("/viewproducts",maincontroller.viewproducts)
mainrouter.post("/sellerapplicantregistration",maincontroller.sellerapplicantregistration)


module.exports = mainrouter
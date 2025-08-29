//admin routes
const admincontroller = require("../controllers/admincontroller")

const express = require("express")
const adminrouter  = express.Router()


adminrouter.get("/viewcustomers",admincontroller.viewcustomers)
adminrouter.delete("/deletecustomer/:email",admincontroller.deletecustomer)
adminrouter.post("/checkadminlogin",admincontroller.checkadminlogin)


adminrouter.post("/addseller",admincontroller.addseller)
adminrouter.get("/viewsellers",admincontroller.viewsellers)
adminrouter.delete("/deleteseller/:username",admincontroller.deleteseller)

adminrouter.get("/viewsellerapplicants",admincontroller.viewsellerapplicants)
adminrouter.post("/changesellerstatus",admincontroller.changesellerstatus)
module.exports = adminrouter
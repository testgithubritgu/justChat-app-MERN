const express = require("express")
const { login, newUser, userAccountUpdate, getAllusers } = require("../controller/UserController")
// const { authCheck } = require("../middelware/authCheck")
// const { roleUser } = require("../middelware/role")
const route = express.Router()

route.post("/register" ,newUser)
route.post("/login" ,login)
route.put("/updateAccount", userAccountUpdate)
route.get("/getAllUsers",  getAllusers)


module.exports = route 
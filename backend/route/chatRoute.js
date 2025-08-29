const { createChat, findUserChats } = require("../controller/chatController")

const router = require("express").Router()

router.post("/",createChat)
router.get("/:userId",findUserChats)
// router.get("/find/:firstId/:secondId",findChat)
module.exports = router
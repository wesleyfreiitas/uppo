const express = require("express")
const router = express.Router()
const userAuth = require("../middleware/userAuth")
const Integration = require("./Integration")

router.get("/integrations", userAuth, (req,res)=>{
    res.render("integrations", req.session.user)
})
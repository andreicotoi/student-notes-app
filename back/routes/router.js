const express = require('express')
const router = express.Router()
const student = require("./student")
const course = require("./course")
const note = require("./note")

router.use("/students", student)
router.use("/courses", course)
router.use("/notes", note)

module.exports = router;
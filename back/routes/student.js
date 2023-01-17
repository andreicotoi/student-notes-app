const controller = require("../controllers/student")
const express = require('express')
const router = express.Router()

router.get("/", controller.getAllStuds)
router.get("/:id", controller.getStud)
router.post("/check", controller.check)
router.post("/", controller.createStud)
router.put("/:id", controller.updateStud)
router.delete("/:id", controller.deleteStud)
router.put("/:studentId/:courseId", controller.enrollToCourse)

module.exports = router;
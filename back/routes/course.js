const controller = require("../controllers/course")
const express = require('express')
const router = express.Router()

router.get("/", controller.getAllCourses)
router.get("/:id", controller.getCourse)
router.post("/", controller.createCourse)
router.post("/multiple", controller.createCourses)
router.put("/:id", controller.updateCourse)
router.delete("/:id", controller.deleteCourse)

module.exports = router;
const controller = require("../controllers/note")
const express = require('express')
const router = express.Router()

router.get("/", controller.getAllNotes)
router.get("/:id", controller.getNote)
router.post("/", controller.createNote)
router.put("/:id", controller.updateNote)
router.delete("/:id", controller.deleteNote)

module.exports = router;
const Note = require('../models/note')
const Student = require('../models/student')
const Course = require('../models/course')

const getAllNotes = async (req, res) => {
	try {
		const notes = await Note.findAll()
		return res.status(200).json(notes)
	} catch (error) {
		res.status(500).json({ message: "Server error." })
	}
}

const getNote = async (req, res) => {
	try {
		const note = await Note.findByPk(req.params.id)
		return res.status(200).json(note)
	} catch (error) {
		res.status(500).json({ message: "Server error." })
	}
}

const createNote = async (req,res) => {
	try {
		const student = Student.findByPk(req.body.studentId)
		const course = Student.findByPk(req.body.courseId)
		if (student && course) {
			const note = await Note.create(req.body)
			await note.save()
			return res.status(201).json(note)
		}
		else {
			res.status(400).json({ message: "Student or course not found."})
		}
	} catch (error) {
		res.status(500).json(error)
	}
}

const updateNote = async (req, res) => {
	try {
		const note = await Note.findByPk(req.params.id)
		if (!note) {
			return res.status(400).json({ message: 'Your note was not found.' })
		}
		await note.update(req.body)
		return res.status(200).json(note)
	} catch (error) {
		res.status(500).json(error)
	}
}

const deleteNote = async (req, res) => {
	try {
		const note = await Note.findByPk(req.params.id)
		if (!note) {
			return res.status(400).json({ message: 'Your note was not found.' })
		}
		await note.destroy()
		return res.status(200).json({ message: 'Your note was deleted.' })
	} catch (error) {
		res.status(500).json(error)
	}
}

module.exports = { getAllNotes, getNote, createNote, updateNote, deleteNote }
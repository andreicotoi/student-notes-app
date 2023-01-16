const Student = require('../models/student')
const Note = require('../models/note')
const Course = require('../models/course')

const getAllStuds = async (req, res) => {
	try {
		const students = await Student.findAll()
		return res.status(200).json(students)
	} catch (error) {
		res.status(500).json({ message: "Server error." })
	}
}

const getStud = async (req, res) => {
	try {
		const student = await Student.findByPk(req.params.id)
		return res.status(200).json(student)
	} catch (error) {
		res.status(500).json({ message: "Server error." })
	}
}

const createStud = async (req,res) => {
	try {
		const student = await Student.create(req.body)
		await student.save()
		return res.status(200).json(student)
	} catch (error) {
		res.status(500).json(error)
	}
}

const updateStud = async (req, res) => {
	try {
		const student = await Student.findByPk(req.params.id)
		if (!student) {
			return res.status(400).json({ message: 'Your student was not found.' })
		}
		await student.update(req.body)
		return res.status(200).json(student)
	} catch (error) {
		res.status(500).json(error)
	}
}

const deleteStud = async (req, res) => {
	try {
		const student = await Student.findByPk(req.params.id)
		if (!student) {
			return res.status(400).json({ message: 'Your student was not found.' })
		}
		await student.destroy()
		return res.status(200).json({ message: 'Your student was deleted.' })
	} catch (error) {
		res.status(500).json(error)
	}
}

const enrollToCourse = async (req, res) => {
	try {
		const student = await Student.findByPk(req.params.studentId)
		if (student) {
			const course = await Course.findByPk(req.params.studentId)
			if (course) {
				await student.addCourse(course)
				return res.status(200).json(course)
			}
		}
	} catch (error) {
		res.status(500).json(error)
	}
}



module.exports = { getAllStuds, getStud, createStud, updateStud, deleteStud, enrollToCourse}
const Student = require('../models/student')
const Note = require('../models/note')
const Course = require('../models/course')
const { ValidationError } = require('sequelize')

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

const check = async (req, res) => {
	try {
		if (!req.body.email) {
			return res.status(400).json({ message: 'Email can not be empty.' })
		}
		if (!req.body.password) {
			return res.status(400).json({ message: 'Password can not be empty.' })
		}
		const student = await Student.findOne({ where: {email: req.body.email} })
		if (student && student.password === req.body.password) {
			return res.status(200).json({ message: 'Login successfull.' })
		} else {
			return res.status(400).json({ message: 'User was not found. Make sure you are using your institutional email address.' })
		}
	} catch (error) {
		res.status(500).json({ message: "Server error." })
	}
}

const createStud = async (req,res) => {
	try {
		if (!req.body.firstName) {
			return res.status(400).json({ message: 'First name can not be empty.' })
		}
		if (!req.body.lastName) {
			return res.status(400).json({ message: 'Last name can not be empty.' })
		}
		if (!req.body.email) {
			return res.status(400).json({ message: 'Email can not be empty.' })
		}
		if (!req.body.password) {
			return res.status(400).json({ message: 'Password can not be empty.' })
		}
		const student = await Student.findOne({ where: {email: req.body.email}})
		if (student) {
			return res.status(400).json({ message: 'Email has already been registered' })
		} else {
			const student = await Student.create(req.body)
			await student.save()
			return res.status(200).json(student)
		}
	} catch (error) {
		if (error instanceof ValidationError) {
			res.status(400).json({ message: 'Please use the institutional address (@stud.ase.ro).'})
		} else {
			res.status(500).json(error)
		}
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

module.exports = { getAllStuds, getStud, check, createStud, updateStud, deleteStud, enrollToCourse }
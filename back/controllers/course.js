const Course = require('../models/course')

const getAllCourses = async (req, res) => {
	try {
		const courses = await Course.findAll()
		return res.status(200).json(courses)
	} catch (error) {
		res.status(500).json({ message: "Server error." })
	}
}

const getCourse = async (req, res) => {
	try {
		const course = await Course.findByPk(req.params.id)
		return res.status(200).json(course)
	} catch (error) {
		res.status(500).json({ message: "Server error." })
	}
}

const createCourse = async (req,res) => {
	try {
		const course = await Course.create(req.body)
		await course.save()
		return res.status(200).json(course)
	} catch (error) {
		res.status(500).json(error)
	}
}

const updateCourse = async (req, res) => {
	try {
		const course = await Course.findByPk(req.params.id)
		if (!course) {
			return res.status(400).json({ message: 'Your course was not found.' })
		}
		await course.update(req.body)
		return res.status(200).json(course)
	} catch (error) {
		res.status(500).json(error)
	}
}

const deleteCourse = async (req, res) => {
	try {
		const course = await Course.findByPk(req.params.id)
		if (!course) {
			return res.status(400).json({ message: 'Your course was not found.' })
		}
		await course.destroy()
		return res.status(200).json({ message: 'Your course was deleted.' })
	} catch (error) {
		res.status(500).json(error)
	}
}

module.exports = { getAllCourses, getCourse, createCourse, updateCourse, deleteCourse }
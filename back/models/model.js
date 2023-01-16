const Student = require('./student')
const Course = require('./course')
const Note = require('./note')

Student.hasMany(Note, { foreignKey: { name: 'studentId', allowNull: false } })
Course.hasMany(Note, { foreignKey: { name: 'courseId', allowNull: false } })
Student.belongsToMany(Course, { through: 'Enrollment' })
Course.belongsToMany(Student, { through: 'Enrollment' })

module.exports = { Student, Course, Note }
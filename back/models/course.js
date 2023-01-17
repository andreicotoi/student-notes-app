const Sequelize = require('sequelize').Sequelize;

const sequelize = new Sequelize({
	dialect: 'sqlite',
	storage: './nope.db',
	define: {
		timestamps: false
	}
})

const Course = sequelize.define('course', {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		primaryKey: true
	},
	name: {
		type : Sequelize.STRING,
		allowNull : false
	},
    type: {
		type : Sequelize.STRING,
		allowNull : false
	}
})

sequelize.sync({ /* force: true */ })
	.then( () => {
		console.log('Courses synchronized succesfully.')
	}).catch( (error) => {
		console.log(error)
	})

module.exports = Course;
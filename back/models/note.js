const Sequelize = require('sequelize').Sequelize

const sequelize = new Sequelize({
	dialect: 'sqlite',
	storage: './nope.db'
})

const Note = sequelize.define('note', {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		primaryKey: true
	},
    title : {
		type : Sequelize.STRING,
		allowNull : false
	},
	content : {
		type : Sequelize.TEXT,
		allowNull : false
	}
	// se fac automat createdAt si updatedAt ca am timestamps
})

sequelize.sync({ /* force: true */ })
	.then( () => {
		console.log('Notes synchronized succesfully.')
	}).catch( (error) => {
		console.log(error)
	})

module.exports = Note;
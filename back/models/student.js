const Sequelize = require('sequelize').Sequelize

const sequelize = new Sequelize({
	dialect: 'sqlite',
	storage: './nope.db',
	define: {
		timestamps: false
	}
})

const Student = sequelize.define('student', {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		primaryKey: true
	},
	firstName: {
		type: Sequelize.STRING,
		allowNull: false
	},
	lastName: {
		type: Sequelize.STRING,
		allowNull: false
	},
	email : {
		type : Sequelize.STRING,
		allowNull : false,
		validate: {
			isEmail: true,
			institutionalAddress: (email) => {
				if (!email.endsWith('@stud.ase.ro')) {
				  	throw new Error('Please use the institutional address (@stud.ase.ro).')
				}
			}
		}
	},
	password: {
		type: Sequelize.STRING,
		allowNull: false
	},
	year: {
		type: Sequelize.INTEGER,
		allowNull: false,
		validate: {
			min: 1,
			max: 3
		}
	}
})
// }, {
// 	instanceMethods: {
// 		generateHash: function (password) {
// 			return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
// 		},
// 		validPassword: function (password) {
// 			return bcrypt.compareSync(password, this.password)
// 		}
// 	}
// })

sequelize.sync({ /* force: true */ })
	.then( () => {
		console.log('Students synchronized succesfully.')
	}).catch( (error) => {
		console.log(error)
	})

module.exports = Student;
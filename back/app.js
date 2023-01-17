const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const router = require("./routes/router")
const model = require("./models/model")
const sequelize = model.sequelize

const app = express()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use("/api", router)

app.listen(8080, async () => {
    console.log('Server for student notes app started on 8080.');
	// try{
	// 	// await sequelize.authenticate()
	// } catch (error) {
	// 	console.error(error)
	// }
});

module.exports = app
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { useEffect, useState,  Component } from 'react'
import axios from 'axios'
import Home from './components/HomePage/Home'
import Login from './components/LoginPage/Login'
import Register from './components/RegisterPage/Register'
import Dashboard from './components/DashboardPage/Dashboard'

const SERVER = 'http://localhost:8080'

class App extends Component {
	constructor(props) {
		super(props)
	}

	logout = () => {
		localStorage.setItem('isLoggedIn', false)
	}

	login = async (student) => {
		await axios.post(`${SERVER}/api/students/check`, student)
		localStorage.setItem('isLoggedIn', true)
	}

	register = async (student) => {
		await axios.post(`${SERVER}/api/students/`, student)
	}

	render() {
		return <>
			<Router>
				<Routes>
					<Route path="/" exact element={<Home />} />
					<Route path="/login" element={<Login login={this.login} />} />
					<Route path="/register" element={<Register register={this.register} />} />
					<Route path="/dashboard" element={<Dashboard onLogout={this.logout} />} />
				</Routes>
			</Router>
		</>
	}
}

export default App
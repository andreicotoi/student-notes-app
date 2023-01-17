import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Login from './components/Login'
import Register from './components/Login'
import Home from './components/Home'

function App() {
	return (
		<Router>
			<Routes>
          		<Route path="/" exact element={<Home />} />
          		<Route path="/login" element={<Login />} />
          		<Route path="/register" element={<Register />} />
			</Routes>
		</Router>
	)
}

export default App;

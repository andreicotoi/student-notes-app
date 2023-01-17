import { ButtonGroup, Button, Box } from "@mui/material"
import './Home.css';
import { useNavigate } from "react-router-dom";

function Home() {
	const navigate = useNavigate()
	return (
		<Box id="box1" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
			<Box sx={{ marginBottom: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
				<h1>Welcome to your student notes app.</h1>
			</Box>
			<ButtonGroup variant="contained" size="large" aria-label="outlined primary button group">
				<Button onClick={() => {navigate('/login')}}>log in</Button>
				<Button onClick={() => {navigate('/register')}}>register</Button>
			</ButtonGroup>
		</Box>
 	)
}

export default Home

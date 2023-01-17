import { ButtonGroup, Button, Box } from "@mui/material"
import { useEffect } from 'react'
import './Home.css';
import { useNavigate } from "react-router-dom";

export default function Home() {
	const navigate = useNavigate()

	useEffect(() => {
		document.body.style.width = '100vw'
		document.body.style.height = '100vh'
		document.body.style.display = 'flex'
		document.body.style.flexDirection = 'column'
		document.body.style.alignItems = 'center'
		document.body.style.justifyContent = 'center'
    }, [])

	return (
		<Box id="box1" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
			<Box sx={{ marginBottom: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
				<h1 sx={{textAlign: 'center'}}>Welcome to your student notes app.</h1>
			</Box>
			<ButtonGroup variant="contained" size="large" aria-label="outlined primary button group">
				<Button onClick={() => {navigate('/login')}}>log in</Button>
				<Button onClick={() => {navigate('/register')}}>register</Button>
			</ButtonGroup>
		</Box>
 	)
}

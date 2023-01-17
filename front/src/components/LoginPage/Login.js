import React, { useState, useEffect } from 'react'
import { Avatar, Button, CssBaseline, TextField, Box, Container } from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link, useNavigate } from 'react-router-dom'
import './Login.css'

const theme = createTheme();
export default function Login(props) {
	const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

	useEffect(() => {
		document.body.style.width = '100vw'
		document.body.style.height = '100vh'
		document.body.style.display = 'flex'
		document.body.style.flexDirection = 'column'
		document.body.style.alignItems = 'center'
		document.body.style.justifyContent = 'center'
    }, [])

    const {login} = props

	const handleSubmit = (e) => {
		e.preventDefault();
		login({
            email,
            password
        }).then(() =>  {
            setEmail('')
            setPassword('')
			navigate('/dashboard')
        }).catch((error) => {
			console.error(error)
			if (error.response.data.message)
				alert(error.response.data.message)
		})
	};

	return (
		<ThemeProvider theme={theme}>
			<Container component="main" maxWidth="xs">
				<CssBaseline />
				<Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', fontFamily: 'Trebuchet MS' }}>
					<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
						<LockOutlinedIcon />
					</Avatar>
					<h2> Log in to your student account </h2>
					<Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
						<TextField margin="normal" required fullWidth id="email" label="Email Address" name="email" autoComplete="email" autoFocus onChange={(event) => setEmail(event.target.value)} value={email} />
						<TextField margin="normal" required fullWidth name="password" label="Password" type="password" id="password" autoComplete="current-password" onChange={(event) => setPassword(event.target.value)} value={password} />
						{/* <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" /> */}
						<Button type="submit" className="Button" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
							Sign In
						</Button>
					</Box>
					<Link className="link" to="/register">
						Don't have an account? Sign Up
					</Link>
				</Box>
			</Container>
		</ThemeProvider>
	);
}
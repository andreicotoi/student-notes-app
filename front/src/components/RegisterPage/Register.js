import React, { useEffect, useState } from 'react';
import { Avatar, Button, CssBaseline, TextField, Grid, Box, Container, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link, useNavigate } from 'react-router-dom'
import './Register.css'

const theme = createTheme();

export default function Register(props) {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [year, setYear] = useState('')

	const {register} = props

	const navigate = useNavigate()

	const handleSubmit = (e) => {
		e.preventDefault();
		register({
			firstName,
			lastName,
            email,
            password,
			year
        }).then(() =>  {
			setFirstName('')
			setLastName('')
            setEmail('')
            setPassword('')
            setYear('')
			navigate('/login')
        }).catch((error) => {
			console.error(error)
			if (error.response.data.message)
				alert(error.response.data.message)
		})
	};

	useEffect(() => {
		document.body.style.width = '100vw'
		document.body.style.height = '100vh'
		document.body.style.display = 'flex'
		document.body.style.flexDirection = 'column'
		document.body.style.alignItems = 'center'
		document.body.style.justifyContent = 'center'
    }, [])

	return (
		<ThemeProvider theme={theme}>
			<Container component="main" maxWidth="xs">
				<CssBaseline />
				<Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', }} >
					<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
						<LockOutlinedIcon />
					</Avatar>
					<h2> Create a new account </h2>
					<Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
						<Grid container spacing={2}>
							<Grid item xs={12} sm={6}>
								<TextField
									autoComplete="given-name"
									name="firstName"
									required
									fullWidth
									id="firstName"
									label="First Name"
									autoFocus
									onChange={(event) => setFirstName(event.target.value)}
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField
									required
									fullWidth
									id="lastName"
									label="Last Name"
									name="lastName"
									autoComplete="family-name"
									onChange={(event) => setLastName(event.target.value)}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									required
									fullWidth
									id="email"
									label="Email Address"
									name="email"
									autoComplete="email"
									onChange={(event) => setEmail(event.target.value)}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									required
									fullWidth
									name="password"
									label="Password"
									type="password"
									id="password"
									autoComplete="new-password"
									onChange={(event) => setPassword(event.target.value)}
								/>
							</Grid>
							<Grid item xs={12} >
								<FormControl fullWidth>
									<InputLabel id="demo-simple-select-label">Year</InputLabel>
									<Select
										labelId="demo-simple-select-label"
										id="demo-simple-select"
										label="Age"
										value={1}
										onChange={(event) => setYear(event.target.value)}
									>
										<MenuItem value={1}>1</MenuItem>
										<MenuItem value={2}>2</MenuItem>
										<MenuItem value={3}>3</MenuItem>
									</Select>
								</FormControl>
							</Grid>
						</Grid>
						<Button type="submit" onClick={handleSubmit} fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} >
							Sign Up
						</Button>
					</Box>
					<Link className="link" to="/login">
						Already have an account? Log in
					</Link>
				</Box>
			</Container>
		</ThemeProvider>
	);
}
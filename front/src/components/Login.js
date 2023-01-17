import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link } from 'react-router-dom'
import './Login.css'

const theme = createTheme();

export default function SignIn() {

	// const handleSubmit = (event) => {
	// 	event.preventDefault();
	// 	const data = new FormData(event.currentTarget);
	// 	console.log({
	// 		email: data.get('email'),
	// 		password: data.get('password'),
	// 	});
	// };

	return (
		<ThemeProvider theme={theme}>
			<Container component="main" maxWidth="xs">
				<CssBaseline />
				<Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', fontFamily: 'Trebuchet MS' }}>
					<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
						<LockOutlinedIcon />
					</Avatar>
					<h2>
						Log in to your student account
					</h2>
					<Box component="form" /* onSubmit={handleSubmit} */ noValidate sx={{ mt: 1 }}>
						<TextField margin="normal" required fullWidth id="email" label="Email Address" name="email" autoComplete="email" autoFocus />
						<TextField margin="normal" required fullWidth name="password" label="Password" type="password" id="password" autoComplete="current-password" />
						{/* <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" /> */}
						<Button type="submit" className="Button" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
							Sign In
						</Button>
					</Box>
					<Link class="link" to="/register">
						Don't have an account? Sign Up
					</Link>
				</Box>
			</Container>
		</ThemeProvider>
	);
}
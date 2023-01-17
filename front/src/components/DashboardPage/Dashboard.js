import { useEffect, useState, Component } from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import MainListItems, { manageCourses, secondaryListItems } from './listItems';
import Deposits from './Deposits';
import NotesList from './NotesList';
import { useNavigate } from 'react-router-dom';

import './Dashboard.css'

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
	shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
	zIndex: theme.zIndex.drawer + 1,
	transition: theme.transitions.create(['width', 'margin'], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	...(open && {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	}),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
	({ theme, open }) => ({
		'& .MuiDrawer-paper': {
			position: 'relative',
			whiteSpace: 'nowrap',
			width: drawerWidth,
			transition: theme.transitions.create('width', {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.enteringScreen,
			}),
			boxSizing: 'border-box',
			...(!open && {
				overflowX: 'hidden',
				transition: theme.transitions.create('width', {
					easing: theme.transitions.easing.sharp,
					duration: theme.transitions.duration.leavingScreen,
				}),
				width: theme.spacing(7),
				[theme.breakpoints.up('sm')]: {
					width: theme.spacing(9),
				},
			}),
		},
	}),
);

const mdTheme = createTheme();

class DashboardContent extends Component {
	constructor(props) {
		super(props)
		this.state = {
			open: true,
			openModal: false
		}
	}

	toggleDrawer = () => {
		this.setState({
			open: !this.state.open
		})
	}

	openModal = () => {
		this.setState({
			openModal: true
		})
	}

	closeModal = () => {
		this.setState({
			openModal: false
		})
	}

	render() {
		return (
			<ThemeProvider theme={mdTheme}>
				<Box sx={{ display: 'flex', maxHeight: '50', overflow: 'hidden'}}>
					<CssBaseline />
					<AppBar position="absolute" open={this.state.open}>
						<Toolbar sx={{ pr: '24px' }} >
						<IconButton
							edge="start"
							color="inherit"
							aria-label="open drawer"
							onClick={this.toggleDrawer}
							sx={{
								marginRight: '36px',
								...(this.state.open && { display: 'none' }),
							}} >
								<MenuIcon />
							</IconButton>
							<Typography component="h1" variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
								Dashboard
							</Typography>
							<Button color="inherit" onClick={this.props.logout}>
								<p className='log-out'>Log out</p>
							</Button>
						</Toolbar>
					</AppBar>
					<Drawer variant="permanent" open={this.state.open}>
						<Toolbar sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', px: [1], }}>
							<IconButton onClick={this.toggleDrawer}>
								<ChevronLeftIcon />
							</IconButton>
						</Toolbar>
						<Divider />
						<List component="nav">
							{manageCourses}
							<Divider sx={{ my: 1 }} />
							<MainListItems/>
							<Divider sx={{ my: 1 }} />
							{secondaryListItems}
						</List>
					</Drawer>
					<Box component="main" sx={{ backgroundColor: (theme) =>
								theme.palette.mode === 'light'
									? theme.palette.grey[100]
									: theme.palette.grey[900], flexGrow: 1, height: '100vh', overflow: 'auto', }}>
						<Toolbar />
						<Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
							<Grid container>
								<Grid item xs={20}>
									<Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
										<NotesList />
									</Paper>
								</Grid>
							</Grid>
						</Container>
					</Box>
				</Box>
			</ThemeProvider>
		)
	}
}

export default function Dashboard(props) {

	useEffect(() => {
		document.body.style.width = 'auto'
		document.body.style.height = 'auto'
		document.body.style.display = 'block'
	}, [])

	const {onLogout} = props

	const navigate = useNavigate()

	const logOut = () => {
		onLogout()
		navigate('/login')
	}

	return <DashboardContent logout={logOut} />;
}
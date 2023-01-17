import { useEffect, useState, Component } from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import Modal from '@mui/material/Modal'
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
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
import MainListItems, { manageCourses } from './listItems';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import NotesList from './NotesList';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { DataGrid } from '@mui/x-data-grid';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import NoteIcon from '@mui/icons-material/Note';

import './Dashboard.css'

const drawerWidth = 350;

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
			openCoursesModal: false,
			openAddNoteModal: false,
			courses: [],
			noteTitle: '',
			noteContent: ''
		}
		this.modalStyle = {
			position: 'absolute',
			top: '50%',
			left: '50%',
			transform: 'translate(-50%, -50%)',
			width: '40%',
			bgcolor: 'background.paper',
			border: '2px solid #000',
			boxShadow: 24,
			p: 4
		}
		this.coursesTableColumns = [
			{ field: 'id', headerName: 'ID', width: 70 },
			{ field: 'type', headerName: 'Type', width: 130 },
			{ field: 'name', headerName: 'Course name', width: 500 },
		]
	}

	async componentDidMount() {
		const courses = await axios.get(`http://localhost:8080/api/courses`)
		this.setState({
			courses: courses.data
		})
	}

	toggleDrawer = () => {
		this.setState({
			open: !this.state.open
		})
	}

	openCoursesModal = () => {
		this.setState({
			openCoursesModal: true
		})
	}

	closeCourseModal = () => {
		this.setState({
			openCoursesModal: false
		})
	}

	openAddNoteModal = () => {
		this.setState({
			openAddNoteModal: true
		})
	}

	closeAddNoteModal = () => {
		this.setState({
			openAddNoteModal: false
		})
	}

	saveNote = async () => {
		let title = this.state.noteTitle
		let content = this.state.noteContent
		let id1 = 1, id2 = 1
		await axios.post(`http://localhost:8080/api/notes`, { title, content, id1, id2 })
		// this.closeAddNoteModal()
	}

	render() {
		return (
			<ThemeProvider theme={mdTheme}>
				<Modal
					open={this.state.openCoursesModal}
					onClose={this.closeCourseModal}
					aria-labelledby="modal-modal-title"
					aria-describedby="modal-modal-description" >
						<Box sx={this.modalStyle}>
							<Typography id="modal-modal-title" variant="h6" component="h2">
								These are the available courses
							</Typography>
							<div style={{ height: 400, width: '100%' }}>
								<DataGrid
									rows={this.state.courses}
									columns={this.coursesTableColumns}
									pageSize={5}
									rowsPerPageOptions={[5]}
									checkboxSelection
								/>
							</div>
						</Box>
				</Modal>
				<Modal
					open={this.state.openAddNoteModal}
					onClose={this.closeAddNoteModal}
					aria-labelledby="modal-modal-title"
					aria-describedby="modal-modal-description" >
						<Box sx={this.modalStyle} style={{textAlign: 'center'}}>
							<Typography id="modal-modal-title" variant="h6" component="h2" style={{display: 'inline'}}>
								Insert your new note
							</Typography>
							<Select
								labelId="demo-simple-select-label"
								id="demo-simple-select"
								value={1} 
								style={{marginLeft: 10 + '%'}}
							>
								{
									this.state.courses.map((e) => (
										<MenuItem key={e.id} value={e.id}>
											{ `[${e.type.substring(0, 1).toUpperCase()}] ${e.name}` }
										</MenuItem>
									))
								}
							</Select>
							<br />
							<Box component="form" noValidate sx={{ mt: 1 }}>
								<TextField margin="normal" required fullWidth id="title" label="Title" name="title" 
									onChange={(event) => 
										this.setState({
											noteTitle: event.target.value
										})
									} value={this.state.noteTitle}
								/>
								<div style={{ height: 400, width: '100%' }}>
									<TextField
										placeholder="type your note here..."
										multiline
										fullWidth
										required
										minRows={15}
										style={{height: 80 + '%', maxHeight: 80 + '%'}}
										label="Content"
										id="content"
										name="content"
										onChange={(event) => 
											this.setState({
												noteContent: event.target.value
											})
										}
										value={this.state.noteContent}
									/>
								</div>
								<Button variant="contained" type="submit" size="medium" startIcon={<AddCircleIcon/>}
									onClick={this.saveNote} style={{float: 'right'}}>
									add note
								</Button>
							</Box>
						</Box>
				</Modal>
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
						<Toolbar sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', px: [1] }}
							>
							<IconButton onClick={this.toggleDrawer}>
								<ChevronLeftIcon />
							</IconButton>
						</Toolbar>
						<Divider />
						<List component="nav" style={{maxHeight: 90 + 'vh'}}>
							<span onClick={this.openCoursesModal}>
								{manageCourses}
							</span>
							<Divider sx={{ my: 1 }} />
							<MainListItems/>
							{/* <Divider sx={{ my: 1 }} />
							{secondaryListItems} */}
						</List>
					</Drawer>
					<Box component="main" sx={{ backgroundColor: (theme) =>
								theme.palette.mode === 'light'
									? theme.palette.grey[100]
									: theme.palette.grey[900], flexGrow: 1, height: '100vh', overflow: 'auto', }}>
						<Toolbar />
						<Button variant="contained" size="medium" startIcon={<AddCircleIcon/>} id='add-icon'
							onClick={this.openAddNoteModal} >
							add note
						</Button>
						<Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
							<Grid container>
								<Grid item xs={20}>
									<Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
										<NotesList/>
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

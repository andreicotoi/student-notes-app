import React, { Component } from 'react'
import axios from 'axios'
import Divider from '@mui/material/Divider';
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListSubheader from '@mui/material/ListSubheader'
import NotesIcon from '@mui/icons-material/Notes'
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications'
import NoteIcon from '@mui/icons-material/Note'

class MainListItems extends Component {
	constructor(){
		super()
		this.state = {
		  	courses : [],
			notes: []
		}
	}

	async componentDidMount() {
		let c = await axios.get(`http://localhost:8080/api/courses`)
		let n = await axios.get(`http://localhost:8080/api/notes`)
		this.setState({
			courses: c.data,
			notes: n.data
		})
	}

	render() {
		return (
			<React.Fragment>
				<ListSubheader component="div" inset>
					Your courses
				</ListSubheader>
				{
					this.state.courses.map( (e, i) => 
						<ListItemButton key={i}>
							<ListItemIcon>
								<NotesIcon />
							</ListItemIcon>
							<p className='overflow'>{`[${e.type.substring(0, 1).toUpperCase()}] ${e.name}`}</p>
						</ListItemButton>
					)
				}
				<Divider sx={{ my: 1 }} />
				<ListSubheader component="div" inset>
					Your notes
				</ListSubheader>
				{
					this.state.notes.map( (e, i) => 
						<ListItemButton key={i}>
							<ListItemIcon>
								<NoteIcon />
							</ListItemIcon>
							<p className='overflow'>{e.title}</p>
						</ListItemButton>
					)
				}
			</React.Fragment>
		)
	}
}
export default MainListItems

export const manageCourses = (
	<React.Fragment>
		<ListItemButton>
			<ListItemIcon>
				<SettingsApplicationsIcon />
			</ListItemIcon>
			<p className='overflow'>Manage courses</p>
		</ListItemButton>
	</React.Fragment>
)

// export const secondaryListItems = (
// 	<React.Fragment>
// 		<ListSubheader component="div" inset>
// 			Your notes
// 		</ListSubheader>
// 		{
// 			this.state.notes.map( (e, i) => 
// 				<ListItemButton key={i}>
// 					<ListItemIcon>
// 						<NotesIcon />
// 					</ListItemIcon>
// 					<p className='overflow'>{`${e.title}`}</p>
// 				</ListItemButton>
// 			)
// 		}
// 	</React.Fragment>
// )
import React, { Component } from 'react'
import axios from 'axios'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListSubheader from '@mui/material/ListSubheader'
import NotesIcon from '@mui/icons-material/Notes'
import AssignmentIcon from '@mui/icons-material/Assignment'
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications'

class MainListItems extends Component {
	constructor(){
		super()
		this.state = {
		  	courses : []
		}
	}

	async componentDidMount() {
		let resp = await axios.get(`http://localhost:8080/api/courses`)
		this.setState({
			courses: resp.data
		})
		console.log(this.state.courses);
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
							<p className='overflow'>{`[${e.type}] ${e.name}`}</p>
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

export const secondaryListItems = (
	<React.Fragment>
		<ListSubheader component="div" inset>
			Your notes
		</ListSubheader>
		<ListItemButton>
			<ListItemIcon>
				<AssignmentIcon />
			</ListItemIcon>
			<p className='overflow'>Course 1 my notesadsadsa</p>
		</ListItemButton>
		<ListItemButton>
			<ListItemIcon>
				<AssignmentIcon />
			</ListItemIcon>
			<p className='overflow'>Course 2 - my notesadsadsa</p>
		</ListItemButton>
		<ListItemButton>
			<ListItemIcon>
				<AssignmentIcon />
			</ListItemIcon>
			<p className='overflow'>Course 5 note</p>
		</ListItemButton>
				<ListItemButton>
			<ListItemIcon>
				<AssignmentIcon />
			</ListItemIcon>
			<p className='overflow'>Course 6 note</p>
		</ListItemButton>
		
	</React.Fragment>
)
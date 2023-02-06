import React, { useState, useEffect, Component } from 'react'
import axios from 'axios'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Title from './Title'

class NotesList extends Component {
	constructor(props) {
		super(props)
		this.state = {
			notes : []
		}
	}
	
	componentDidMount() {
		const f = async () => {
			let resp = await axios.get(`http://localhost:8080/api/notes`)
			this.setState({
				notes : resp.data
			})
		}
		f()
	}

	render() {
		return (
			<React.Fragment>
				<Title>Your notes</Title>
				<Table size="medium">
					<TableHead>
						<TableRow>
							<TableCell>Created</TableCell>
							<TableCell>Last updated</TableCell>
							<TableCell>Title</TableCell>
							<TableCell colSpan={2}>Content</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{this.state.notes.map((row) => (
							<TableRow key={row.id}>
								<TableCell>{row.createdAt}</TableCell>
								<TableCell>{row.updatedAt}</TableCell>
								<TableCell>{row.title}</TableCell>
								<TableCell>{row.content}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</React.Fragment>
		)
	}
}

export default NotesList
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';

export default function NotesList() {

	

	return (
		<React.Fragment>
			<Title>Your notes</Title>
			<Table size="medium">
				<TableHead>
					<TableRow>
						<TableCell>Date</TableCell>
						<TableCell>Title</TableCell>
						<TableCell align="center">Content</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{/* {rows.map((row) => (
						<TableRow key={row.id}>
							<TableCell>{row.date}</TableCell>
							<TableCell>{row.name}</TableCell>
							<TableCell>{row.shipTo}</TableCell>
							<TableCell>{row.paymentMethod}</TableCell>
							<TableCell align="right">{`$${row.amount}`}</TableCell>
						</TableRow>
					))} */}
				</TableBody>
			</Table>
		</React.Fragment>
	);
}

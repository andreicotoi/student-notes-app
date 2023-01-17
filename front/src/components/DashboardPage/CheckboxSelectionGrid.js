import * as React from 'react';
import Button from '@mui/material/Button';
// import { DataGrid } from '@mui/x-data-grid';
// import { useDemoData } from '@mui/x-data-grid-generator';

export default function CheckboxSelectionGrid() {
	const [checkboxSelection, setCheckboxSelection] = React.useState(true);


	return (
		<div style={{ width: '100%' }}>
			<Button
				sx={{ mb: 2 }}
				onClick={() => setCheckboxSelection(!checkboxSelection)}
			>
				Toggle checkbox selection
			</Button>
			<div style={{ height: 400 }}>
				{/* <DataGrid checkboxSelection={checkboxSelection} {...data} /> */}
			</div>
		</div>
	);
}
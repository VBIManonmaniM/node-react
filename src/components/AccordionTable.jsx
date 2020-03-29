import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { TextField } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { useState } from 'react';

const useStyles = makeStyles((theme) => ({
	root: {
		width: '50%',
	},
	table: {
		width: '100%'
	},
	heading: {
		fontSize: theme.typography.pxToRem(15),
		fontWeight: theme.typography.fontWeightRegular,
	},
}));

function createData(name, calories, fat, carbs, protein) {
	return { name, calories, fat, carbs, protein };
}

const rows = [
	createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
	createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
	createData('Eclair', 262, 16.0, 24, 6.0),
	createData('Cupcake', 305, 3.7, 67, 4.3),
	createData('Gingerbread', 356, 16.0, 49, 3.9)
];
  
export default function AccordionTable() {
	const classes = useStyles();
	const [expanded, setExpand] = useState(false);

	const onclick = (event) => {
		event.stopPropagation();
		setExpand(true);
	}

	const onDoubleClick = (event) => {
		event.stopPropagation();
		setExpand(true);
		const {value, selectionStart, selectionEnd} = event.target;
		const selectedText = value.substring(selectionStart, selectionEnd);
		console.log("selectedText", selectedText);
	}

	return (
		<div className={classes.root}>
			<ExpansionPanel expanded={expanded}>
				<ExpansionPanelSummary
					expandIcon={<ExpandMoreIcon />}
					aria-controls="panel1a-content"
					id="panel1a-header"
				>
				<TextField
					style={{ margin: 8 }}
					placeholder="Add User Expression"
					fullWidth
					onClick={onclick}
					onDoubleClick={onDoubleClick}
				/>
				</ExpansionPanelSummary>
				<ExpansionPanelDetails>
						<TableContainer component={Paper}>
							<Table stickyHeader className={classes.table}>
								<TableHead>
									<TableRow>
										<TableCell>Dessert (100g serving)</TableCell>
										<TableCell align="right">Calories</TableCell>
										<TableCell align="right">Fat&nbsp;(g)</TableCell>
										<TableCell align="right">Carbs&nbsp;(g)</TableCell>
										<TableCell align="right">Protein&nbsp;(g)</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{rows.map((row) => (
										<TableRow key={row.name}>
											<TableCell component="th" scope="row">
												{row.name}
											</TableCell>
											<TableCell align="right">{row.calories}</TableCell>
											<TableCell align="right">{row.fat}</TableCell>
											<TableCell align="right">{row.carbs}</TableCell>
											<TableCell align="right">{row.protein}</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</TableContainer>
				</ExpansionPanelDetails>
			</ExpansionPanel>
		</div>
	);
}

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { TextField } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { useState } from 'react';
import "../style/AccordionTable.css";

const useStyles = makeStyles((theme) => ({
	root: {
		width: '50%',
		padding: "1rem"
	},
	table: {
		width: '100%',
		left: "100px"
	},
	heading: {
		fontSize: theme.typography.pxToRem(15),
		fontWeight: theme.typography.fontWeightRegular,
	},
}));


// Entities are hard coded here, Normally It will be fetched from DB
const avaliableEntities = [{
	parameterName: "geo-country-code",
	entity: "@sys.geo-country-code"
}, {
	parameterName: "zip-code",
	entity: "@sys.zip-code"
}, {
	parameterName: "url",
	entity: "@sys.url"
}, {
	parameterName: "currency-name",
	entity: "@sys.currency-name"
}, {
	parameterName: "age",
	entity: "@sys.age"
}]
  
export default function AccordionTable(props) {
	const {userExpressionText = ""} = props;

	const classes = useStyles();

	const [expanded, setExpand] = useState(false);
	const [resolvedValue, setresolvedValue] = useState("");
	const [menuConfig, setMenuConfig] = useState({
		coordinateX: 0,
		coordinateY: 0,
		anchorEl: null
	});
	const [entitiyList, setEntitiyList] = useState([]);

	const onMenuItemSelect = (event) => {
		const rows = [...entitiyList];
		const parameterName = event.target.getAttribute("parametername");
		const entity = event.target.getAttribute("entity");
		let existingItem = rows.filter(row => row.resolvedValue === resolvedValue)[0];
		if (existingItem) {
			existingItem.parameterName = parameterName;
			existingItem.entity = entity;
		} else {
			rows.push({
				parameterName,
				resolvedValue: resolvedValue,
				entity
			});
		}
		setMenuConfig({
			anchorEl: null
		});
		rows.length && setExpand(true);
		setEntitiyList(rows);
	}

	const onTextclick = (event) => {
		event.stopPropagation();
		entitiyList.length && setExpand(true);
	}

	const onTextDoubleClick = (event) => {
		event.stopPropagation();
		entitiyList.length && setExpand(true);
		const {value, selectionStart, selectionEnd} = event.target;
		setresolvedValue(value.substring(selectionStart, selectionEnd));
		setMenuConfig({
			coordinateX: event.clientX,
			coordinateY: event.clientY,
			anchorEl: event.target
		})
	}

	return (
		<div className={classes.root}>

			<Menu 
				className="custom-menu"
				anchorEl={menuConfig.anchorEl}
				open={Boolean(menuConfig.anchorEl)}
				onClose={() => {
					setMenuConfig({
						anchorEl: null
					});
				}}
				style={{
					position: "absolute",
					left: menuConfig.coordinateX  + "px", 
					top: menuConfig.coordinateY  + "px", 
				}}
			>
				{
					avaliableEntities.map(entitItem => 
						<MenuItem onClick={onMenuItemSelect} parametername={entitItem.parameterName} entity={entitItem.entity}>
							{entitItem.entity}
						</MenuItem>
					)
				}
	    	</Menu>

			<ExpansionPanel expanded={expanded}>
				<ExpansionPanelSummary
					aria-controls="panel1a-content"
					id="panel1a-header"
				>
				<TextField
					style={{ margin: 8 }}
					placeholder="Add User Expression"
					fullWidth
					onClick={onTextclick}
					value={userExpressionText}
					onDoubleClick={onTextDoubleClick}
				/>
				</ExpansionPanelSummary>
				<ExpansionPanelDetails>
						<TableContainer component={Paper}>
							<Table stickyHeader className={classes.table}>
								<TableHead>
									<TableRow>
										<TableCell>PARAMETER NAME</TableCell>
										<TableCell align="right">ENTITY</TableCell>
										<TableCell align="right">RESOLVED VALUES</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{entitiyList.map((entitiyItem) => (
										<TableRow key={entitiyItem.entity}>
											<TableCell component="th" scope="row">
												{entitiyItem.parameterName}
											</TableCell>
											<TableCell align="right">{entitiyItem.entity}</TableCell>
											<TableCell align="right">{entitiyItem.resolvedValue}</TableCell>
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

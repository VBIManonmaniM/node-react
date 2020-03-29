import React, {useState} from 'react';
import AccordionTable from "./AccordionTable";
import { TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	root: {
		width: '50%',
    }
}));

export default function AccordionTables() {
    const [userExpressions, setUserExpressions] = useState([]);
	const classes = useStyles();

    const onTextChange = (event) => {
        if (event.which === 13 || event.keyCode === 13) { // Trigger Event only When Enter press
            setUserExpressions([
                ...userExpressions,
                event.target.value
            ]);
            event.target.value = '';
        }
    }

    return <div useStyles>
        <TextField
            className={classes.root}
            style={{ margin: 8 }}
            placeholder="Add User Expression"
            fullWidth
            onKeyUp={onTextChange}
        />
        {
            userExpressions.map(userExpression => <AccordionTable userExpressionText={userExpression}/>)
        }
    </div>;
}
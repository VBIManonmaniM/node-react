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
    const [activeAccordion, setActiveAccordion] = useState(0);
	const classes = useStyles();

    const onTextChange = (event) => {
        if (event.which === 13 || event.keyCode === 13) { // Trigger Event only When Enter press
            const newUserExpressions = [
                ...userExpressions,
                event.target.value
            ];
            setUserExpressions(newUserExpressions);
            setActiveAccordion(newUserExpressions.length - 1);
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
            userExpressions.map((userExpression, index) => 
                <AccordionTable 
                    activeAccordion={index === activeAccordion}
                    userExpressionText={userExpression} 
                    setActiveAccordion={() => {
                        setActiveAccordion(index);
                    }}
                />
            )
        }
    </div>;
}
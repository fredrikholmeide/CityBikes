import React from 'react';
import classes from './StatusBox.module.css'

//Each StatusBox is represented as shown, with the styling from the css file
const statusbox = (props) => {
    return (
        <div className={classes.StatusBox}>
            <h4>{props.name}</h4>
            <p>Ledige sykler: {props.bikes}</p>
            <p>Ledige sykkelplasser: {props.spots}</p>
        </div>
    );
}

export default statusbox
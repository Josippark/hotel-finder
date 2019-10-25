import React from 'react';
import spinner from '../../assets/images/Spinner.gif';
import classes from './Spinner.module.css'

const Spinner = () => {
    return (
        <div className={classes.Spinner}>
            <img alt="loading" src={spinner}/>
        </div>
    );
}
export default Spinner;

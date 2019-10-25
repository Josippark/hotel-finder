import React from 'react'
import classes from './Heading.module.scss'
const heading = (props) => {
    return (
        <div {...props}>
            <h1 className={classes['Heading-main']}>
               <span>HOTEL FINDER</span>
            </h1>
        </div>
    )
}

export default heading

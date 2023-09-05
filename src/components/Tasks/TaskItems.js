import React from 'react';
import classes from './TaskItems.module.css'
const TaskItems=(props)=>{
    return(
        <div className={classes.task}>
            {props.children}
        </div>
    )
}

export default TaskItems;
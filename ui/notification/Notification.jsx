import React from 'react';
import classes from "./notification.module.css"

const Notification = ({status, message}) => {
    let statusClasses = "";

    if (status === "success") {
        statusClasses = classes.success;
    }

    if (status === "error") {
        statusClasses = classes.error;
    }

    return (
        <div className={`${classes.notification} ${statusClasses}`}>
            <p>{message}</p>
        </div>
    );
};

export default Notification;
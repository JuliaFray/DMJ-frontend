import React from 'react';
import StyleSheet from './../Dialogs.module.css';

const MessageItem = (props) => {
    return (
        <div className={StyleSheet.messageItem}>
            {props.message}
        </div>
    )
}

export default MessageItem;
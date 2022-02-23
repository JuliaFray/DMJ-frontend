import React from 'react';
import StyleSheet from './../Dialogs.module.css';
import {MessageType} from "../../../types/types";

const MessageItem: React.FC<MessageType> = (props) => {
    return (
        <div className={StyleSheet.messageItem}>
            {props.message}
        </div>
    )
};

export default MessageItem;

import React from 'react';
import StyleSheet from './../Dialogs.module.css';
import {IMessage} from "../../../types/types";

const MessageItem: React.FC<IMessage> = (props) => {
    return (
        <div className={StyleSheet.messageItem}>
            {props.message}
        </div>
    )
};

export default MessageItem;

import React from 'react';
import StyleSheet from './Dialogs.module.css';
import DialogItem from './DialogItem/DialogItem';
import MessageItem from './MessageItem/MessageItem';
import SendMsg, {FormDataType} from './SendMsg/SendMsg';
import {MessageType, SimpleNameObjType} from '../../types/types';

type PropsType = {
    messages: Array<MessageType>,
    dialogs: Array<SimpleNameObjType>,
    sendMsg: (text: string) => void
}

const Dialogs: React.FC<PropsType> = (props) => {

    let dialogsElements = props.dialogs.map(el => <DialogItem id={el.id} name={el.name} key={el.id}/>);
    let messagesElements = props.messages.map(el => <MessageItem id={el.id} message={el.message} key={el.id}/>);

    let addNewMessage = (values: FormDataType) => {
        props.sendMsg(values.message)
    };

    return (
        <div className={StyleSheet.dialogs}>
            <div className={StyleSheet.dialogItems}>
                {dialogsElements}
            </div>
            <div className={StyleSheet.messages}>
                {messagesElements}
                <SendMsg onSubmit={addNewMessage}/>
            </div>
        </div>
    )
};

export default Dialogs;

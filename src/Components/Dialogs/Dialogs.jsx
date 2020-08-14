import React from 'react';
import StyleSheet from './Dialogs.module.css';
import DialogItem from './DialogItem/DialogItem';
import MessageItem from './MessageItem/MessageItem';
import SendMsg from './SendMsg/SendMsg';
// import { addMsgActionCreator } from './../../redux/dialog-reducer';

const Dialogs = (props) => {

    let dialogsElements = props.dialogs.map(el => <DialogItem id={el.id} name={el.name} />);
    let messagesElements = props.messages.map(el => <MessageItem message={el.message} />);

    let addNewMessage = (values) => {
        props.sengMsg(values.message)
        // alert('op')
    }

    return (
        <div className={StyleSheet.dialogs}>
            <div className={StyleSheet.dialogItems}>
                {dialogsElements}
            </div>

            <div className={StyleSheet.messages}>
                {messagesElements}
                <SendMsg onSubmit={addNewMessage} />
            </div>




        </div>
    )
};

export default Dialogs;
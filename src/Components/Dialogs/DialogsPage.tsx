import React from 'react';
import StyleSheet from './Dialogs.module.css';
import DialogItem from './DialogItem/DialogItem';
import MessageItem from './MessageItem/MessageItem';
import SendMsg, {FormDataType} from './SendMsg/SendMsg';
import {useDispatch, useSelector} from 'react-redux';
import {getDialogs, getMessages} from '../../redux/dialog/dialogs-selectors';
import {actions} from '../../redux/dialog/dialog-reducer';
import {IMessage, SimpleNameObj} from '../../types/types';


const DialogsPage: React.FC = () => {

    const dialogs = useSelector(getDialogs);
    const messages = useSelector(getMessages);

    const dispatch = useDispatch();

    const onSendMsg = (values: FormDataType) => {
        dispatch(actions.sendMsg(values.message))
    };

    let dialogsElements = dialogs.map((el: SimpleNameObj) => <DialogItem id={el.id} name={el.name} key={el.id}/>);
    let messagesElements = messages.map((el: IMessage) => <MessageItem id={el.id} message={el.message} key={el.id}/>);

    return (
        <>
            {/*{isFetching ? <Preloader/> : null}*/}
            <div className={StyleSheet.dialogs}>
                <div className={StyleSheet.dialogItems}>
                    {dialogsElements}
                </div>
                <div className={StyleSheet.messages}>
                    {messagesElements}
                    <SendMsg onSubmit={onSendMsg}/>
                </div>
            </div>
        </>

    )
};

export default DialogsPage;

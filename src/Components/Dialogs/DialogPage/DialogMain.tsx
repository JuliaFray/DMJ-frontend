import React from 'react';
import styles from './Dialog.module.css';
import {Box} from '@mui/material';
import {IMessage, SimpleNameObj} from '../../../types/types';
import DialogItem from '../DialogItem/DialogItem';
import MessageItem from '../MessageItem/MessageItem';

const DialogMain = () => {
    return(
        <Box sx={{ flexGrow: 1, overflow: 'hidden', px: 3 }}>
            {[{id: 1, message: 'a'}, {id: 2, message: 'b'}].map(
                (el: IMessage) => <MessageItem id={el?.id} message={el?.message} key={el?.id}/>)}
            {/*<SendMsg onSubmit={onSendMsg}/>*/}
        </Box>
    );
}

export default DialogMain;

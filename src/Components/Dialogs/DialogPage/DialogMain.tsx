import React, {useCallback, useEffect} from 'react';
import styles from './Dialog.module.scss';
import {Box, Grid} from '@mui/material';
import {IMessage} from '../../../types/types';
import MessageItem from '../MessageItem/MessageItem';
import SendMsg from '../SendMsg/SendMsg';
import DialogHeader from '../DialogHeader';
import useWebSocket, {useAppDispatch} from '../../../hook/hooks';
import {SocketEvents} from '../../../Utils/DictConstants';
import {useSelector} from 'react-redux';
import {getDialogs, getMessages, getSelectedDialog} from '../../../redux/dialog/dialog-selectors';
import {dialogActions} from '../../../redux/dialog/dialog-slice';
import {v4 as uuidv4} from 'uuid';
import {getMessagesByDialogId} from '../../../redux/dialog/dialog-thunks';
import {useParams} from 'react-router-dom';

const DialogMain = () => {

    const ws = useWebSocket();
    const dispatch = useAppDispatch();
    const {id} = useParams();
    const messages = useSelector(getMessages);
    const dialogs = useSelector(getDialogs);
    const selectedDialog = useSelector(getSelectedDialog);

    useEffect(() => {
        if (id) {
            dispatch(getMessagesByDialogId({dialogId: id}));
        }
    }, [id])

    useEffect(() => {
        if (!selectedDialog && dialogs.length) {
            dispatch(dialogActions.addSelectedDialog(dialogs.find(d => d._id === id)))
        }
    }, [dialogs])

    const handleWS = useCallback(
        (e: any) => {
            const {type, data} = JSON.parse(e.data);
            if(type === SocketEvents.MSG_EVENT) {
                dispatch(dialogActions.addMsg(data));
            }
        },
        [dispatch]
    );

    useEffect(() => {
        if(!ws) return;

        ws.addEventListener('message', handleWS);
        return () => ws.removeEventListener('message', handleWS);
    }, [handleWS, ws]);

    if(!id) {
        return <Grid container rowSpacing={1} columnSpacing={{xs: 1, sm: 2, md: 3}} className={styles.dialogMain}
                     sx={{margin: 0}} style={{marginBottom: '20px'}}>
            Выберите, кому хотели бы написать
        </Grid>
    }

    return (
        <Grid container rowSpacing={1} columnSpacing={{xs: 1, sm: 2, md: 3}} className={styles.dialogMain}
              sx={{margin: 0}} style={{marginBottom: '20px'}}>
            {selectedDialog && <DialogHeader selectedDialog={selectedDialog}/>}

            <Box sx={{flexGrow: 1, overflow: 'hidden', px: 3}} className={styles.dialogBox}>
                {messages.map(
                    (el: IMessage) => <MessageItem id={el?.id} key={uuidv4()}
                                                   text={el?.text} from={el?.from}/>)}
            </Box>

            {selectedDialog && <SendMsg selectedDialog={selectedDialog}/>}
        </Grid>

    );
}

export default DialogMain;

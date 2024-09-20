import React, {useCallback, useEffect, useRef} from 'react';
import {Box, Grid} from '@mui/material';
import {TDialog, TMessage} from 'entities/message';
import {Message} from 'entities/message';
import SendMsg from 'features/create-message/SendMsg';
import {useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import useWebSocket, {useAppDispatch} from 'shared/hook/hooks';
import {SocketEvents} from 'shared/lib/DictConstants';
import {dialogSelector, dialogSlice} from 'shared/model/dialog';
import {getMessagesByDialogId} from 'shared/model/dialog/dialog-thunks';
import {v4 as uuidv4} from 'uuid';
import styles from '../dialog-page.module.scss';
import DialogHeader from './../DialogHeader';
import DialogItems from './DialogItems';

const DialogMain = () => {

    const ws = useWebSocket();
    const dispatch = useAppDispatch();
    const {id} = useParams();

    const listRef = useRef(null);

    const messages = useSelector(dialogSelector.getMessages);
    const dialogs = useSelector(dialogSelector.getDialogs);
    const selectedDialog = useSelector(dialogSelector.getSelectedDialog);

    useEffect(() => {
        if(id) {
            dispatch(dialogSlice.dialogActions.clearState());
            dispatch(getMessagesByDialogId({dialogId: id}));
        }
    }, [id])

    useEffect(() => {
        if(!selectedDialog && dialogs.length) {
            dispatch(dialogSlice.dialogActions.addSelectedDialog(dialogs.find((d: TDialog) => d._id === id)))
        }
    }, [dialogs])

    const handleWS = useCallback(
        (e: any) => {
            const {type, data} = JSON.parse(e.data);
            if(type === SocketEvents.MSG_EVENT) {
                dispatch(dialogSlice.dialogActions.addMsg(data));
            }
        },
        [dispatch]
    );

    useEffect(() => {
        if(!ws) return;

        ws.addEventListener('message', handleWS);
        return () => ws.removeEventListener('message', handleWS);
    }, [handleWS, ws]);


    useEffect(() => {
        // @ts-ignore
        listRef.current?.lastElementChild?.scrollIntoView();
    }, [messages])


    if(!id) {
        return <DialogItems/>
    }

    return (
        <div style={{position: 'relative', height: '100%'}}>
        <Grid container sx={{margin: 0}}
              className={styles.dialogMain}
              direction={'column'}
                       rowSpacing={{xs: 1, sm: 2, md: 3}}
                       style={{marginTop: '-10px', marginBottom: '30px'}}>
            {selectedDialog && <DialogHeader selectedDialog={selectedDialog}/>}

            <Box ref={listRef} sx={{overflow: 'hidden', px: 3}} className={styles.dialogBox}>
                {messages.map(
                    (el: TMessage) => <Message id={el?.id} key={uuidv4()} createdAt={el?.createdAt}
                                               text={el?.text} from={el?.from}/>)}
            </Box>

            {selectedDialog && <SendMsg selectedDialog={selectedDialog}/>}
        </Grid>
        </div>
    );
}

export default DialogMain;

import React, { useCallback, useContext, useEffect, useRef } from 'react';

import { useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import { Direction, Grid } from '@mui/material';
import List from '@mui/material/List';

import { DialogHeader } from 'widgets/dialog';

import { SendMsg } from 'features/create-message';

import { ProfileContext } from 'shared/context';
import { useAppDispatch, useAppSelector, useWebSocket } from 'shared/hook';
import { SocketEvents } from 'shared/lib';
import { appActions, dialogActions, dialogSelector, getMessagesByDialogId } from 'shared/model';
import { IDialog, IMessage } from 'shared/types';
import { SimpleMessage } from 'shared/ui';

import styles from '../dialog-page.module.scss';

import DialogItems from './DialogItems';

function DialogMain() {
  const ws = useWebSocket();
  const dispatch = useAppDispatch();
  const { id } = useParams();

  const listRef = useRef(null);

  const { authId } = useContext(ProfileContext);

  const messages = useAppSelector(dialogSelector.getMessages);
  const dialogs = useAppSelector(dialogSelector.getDialogs);
  const selectedDialog = useAppSelector(dialogSelector.getSelectedDialog);

  useEffect(() => {
    if (id) {
      dispatch(dialogActions.clearState());
      dispatch(getMessagesByDialogId({ dialogId: id }));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (!selectedDialog && dialogs.length) {
      dispatch(dialogActions.addSelectedDialog(dialogs.find((d: IDialog) => d._id === id)));
    }
  }, [dialogs, dispatch, id, selectedDialog]);

  const handleWS = useCallback(
    (e: MessageEvent<string>) => {
      const { type, data } = JSON.parse(e.data);
      if (type === SocketEvents.MSG_EVENT) {
        dispatch(dialogActions.addMsg(data));
      }
    },
    [dispatch],
  );

  useEffect(() => {
    if (!ws) return;

    ws.addEventListener('message', handleWS);
    return () => ws.removeEventListener('message', handleWS);
  }, [handleWS, ws]);

  useEffect(() => {
    // @ts-ignore
    listRef.current?.lastElementChild?.scrollIntoView();
  }, [messages]);

  useEffect(() => {
    dispatch(appActions.clearNewMsgCounter());
  }, []);

  if (!id) {
    return <DialogItems />;
  }

  return (
    <div style={{ position: 'relative', height: '100%' }}>
      <Grid container sx={{ margin: 0 }} className={styles.dialogMain} direction='column'>
        {selectedDialog && <DialogHeader selectedDialog={selectedDialog} />}

        <List className={styles.dialogBox}>
          {messages.map((el: IMessage, index: number, array: IMessage[]) => {
            const sx =
              el?.fromUserId._id === authId
                ? {
                    direction: 'ltr' as Direction,
                    backgroundColor: `rgba(159, 237, 215, 0.2)`,
                  }
                : {
                    direction: 'rtl' as Direction,
                    backgroundColor: `rgba(2, 102, 112, 0.2)`,
                  };

            return (
              <SimpleMessage
                key={uuidv4()}
                sx={sx}
                text={el?.text}
                withNext={array[index + 1]?.fromUserId._id === array[index].fromUserId._id}
                withPrev={array[index - 1]?.fromUserId._id === array[index].fromUserId._id}
                user={el?.fromUserId.userId === authId ? el?.fromUserId : el?.toUserId}
              />
            );
          })}
        </List>

        {selectedDialog && <SendMsg selectedDialog={selectedDialog} />}
      </Grid>
    </div>
  );
}

export default DialogMain;

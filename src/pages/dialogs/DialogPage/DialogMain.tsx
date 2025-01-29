import React, { useCallback, useEffect, useRef } from "react";

import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { SocketEvents } from "shared/lib/DictConstants";
import { v4 as uuidv4 } from "uuid";

import { Direction, Grid } from "@mui/material";
import List from "@mui/material/List";

import {
  appActions,
  dialogActions,
  getAuthId,
  getDialogs,
  getMessages,
  getMessagesByDialogId,
  getSelectedDialog,
  SimpleMessage,
  TDialog,
  TMessage,
  useAppDispatch,
  useWebSocket,
} from "shared";

import { SendMsg } from "features";

import { DialogHeader } from "widgets";

import styles from "../dialog-page.module.scss";

import DialogItems from "./DialogItems";

const DialogMain = () => {
  const ws = useWebSocket();
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const authId = useSelector(getAuthId);
  const listRef = useRef(null);

  const messages = useSelector(getMessages);
  const dialogs = useSelector(getDialogs);
  const selectedDialog = useSelector(getSelectedDialog);

  useEffect(() => {
    if (id) {
      dispatch(dialogActions.clearState());
      dispatch(getMessagesByDialogId({ dialogId: id }));
    }
  }, [id]);

  useEffect(() => {
    if (!selectedDialog && dialogs.length) {
      dispatch(
        dialogActions.addSelectedDialog(
          dialogs.find((d: TDialog) => d._id === id)
        )
      );
    }
  }, [dialogs]);

  const handleWS = useCallback(
    (e: any) => {
      const { type, data } = JSON.parse(e.data);
      if (type === SocketEvents.MSG_EVENT) {
        dispatch(dialogActions.addMsg(data));
      }
    },
    [dispatch]
  );

  useEffect(() => {
    if (!ws) return;

    ws.addEventListener("message", handleWS);
    return () => ws.removeEventListener("message", handleWS);
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
    <div style={{ position: "relative", height: "100%" }}>
      <Grid
        container
        sx={{ margin: 0 }}
        className={styles.dialogMain}
        direction={"column"}
      >
        {selectedDialog && <DialogHeader selectedDialog={selectedDialog} />}

        <List className={styles.dialogBox}>
          {messages.map((el: TMessage, index: number, array: TMessage[]) => {
            const sx =
              el?.from._id === authId
                ? {
                    direction: "ltr" as Direction,
                    backgroundColor: `rgba(159, 237, 215, 0.2)`,
                  }
                : {
                    direction: "rtl" as Direction,
                    backgroundColor: `rgba(2, 102, 112, 0.2)`,
                  };

            return (
              <SimpleMessage
                key={uuidv4()}
                sx={sx}
                text={el?.text}
                withNext={array[index + 1]?.from._id === array[index].from._id}
                withPrev={array[index - 1]?.from._id === array[index].from._id}
                user={el?.from.userId === authId ? el?.from : el?.to}
              />
            );
          })}
        </List>

        {selectedDialog && <SendMsg selectedDialog={selectedDialog} />}
      </Grid>
    </div>
  );
};

export default DialogMain;

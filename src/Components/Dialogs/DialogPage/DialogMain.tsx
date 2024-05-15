import React from 'react';
import styles from './Dialog.module.scss';
import {Box, Grid} from '@mui/material';
import {IMessage} from '../../../types/types';
import MessageItem from '../MessageItem/MessageItem';
import SendMsg from '../SendMsg/SendMsg';
import DialogHeader from '../DialogHeader';

const DialogMain = () => {
    return (
        <Grid container rowSpacing={1} columnSpacing={{xs: 1, sm: 2, md: 3}} className={styles.dialogMain}
              sx={{margin: 0}} style={{marginBottom: '20px'}}>
            <DialogHeader/>
            <Box sx={{flexGrow: 1, overflow: 'hidden', px: 3}} className={styles.dialogBox}>
                {[
                    {id: 1, message: 'a', author: 'name1', avatar: ''},
                    {id: 2, message: 'b', author: 'name2', avatar: ''}
                ].map(
                    (el: IMessage) => <MessageItem id={el?.id} key={el?.id} avatar={el?.avatar}
                                                   message={el?.message} author={el?.author}/>)}
            </Box>

            <SendMsg/>
        </Grid>

    );
}

export default DialogMain;

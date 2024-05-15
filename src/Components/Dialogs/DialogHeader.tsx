import React from 'react';
import styles from './DialogPage/Dialog.module.scss';
import {IMessage} from '../../types/types';
import MessageItem from './MessageItem/MessageItem';
import {Box} from '@mui/material';
import Divider from '@mui/material/Divider';

const DialogHeader = () => {
    return (
        <Box sx={{flexGrow: 1, overflow: 'hidden', px: 3}}  className={styles.dialogHeader}>
            <div  className={styles.dialogHeaderInfo}>name</div>
            <Divider sx={{marginBottom: '20px'}}/>
        </Box>
    )
};

export default DialogHeader;

import React from 'react';
import {IMessage} from "../../../types/types";
import {Avatar, Paper, Typography} from '@mui/material';
import Stack from '@mui/material/Stack';
import {styled} from '@mui/material/styles';
import styles from './../DialogPage/Dialog.module.scss'
import {NO_AVATAR} from '../../../Utils/DictConstants';


const Item = styled(Paper)(({theme}) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    maxWidth: '95%',
}));

const MessageItem: React.FC<IMessage> = (props) => {
    return (
        <Item sx={{my: 1, mx: 'auto', p: 2,}} className={styles.msgItem}>
            <Stack spacing={2} direction='row' alignItems='center'>
                <Avatar src={(props.avatar && `data:image/jpeg;base64,${props.avatar}`) || NO_AVATAR}
                        alt={props.author}/>
                <Stack spacing={2} direction='column' alignItems='center'>
                    <Typography className={styles.author} noWrap>{props.author}</Typography>
                    <Typography noWrap>{props.message}</Typography>
                </Stack>
            </Stack>
        </Item>
    )
};

export default MessageItem;

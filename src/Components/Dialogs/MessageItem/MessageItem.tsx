import React from 'react';
import {IMessage} from "../../../types/types";
import {Paper, Typography} from '@mui/material';
import Stack from '@mui/material/Stack';
import {styled} from '@mui/material/styles';
import styles from './../DialogPage/Dialog.module.scss'
import {v4 as uuidv4} from 'uuid';
import {useSelector} from 'react-redux';
import {getAuthId} from '../../../redux/auth/auth-selectors';

const Item = styled(Paper)(({theme}) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    maxWidth: '95%',
}));

const MessageItem: React.FC<IMessage> = (props) => {
    const authId = useSelector(getAuthId);
    let sx: Record<string, any> = {my: 1};
    sx = props.from._id === authId
        ? {ml: '55%', backgroundColor: `rgba(159, 237, 215, 0.2)`, ...sx}
        : {mr: '55%', backgroundColor: `rgba(2, 102, 112, 0.2)`, ...sx};

    return (
        <Item sx={sx} className={styles.msgItem}>
            <Stack spacing={2} direction='row' alignItems='center'>
                <Stack direction='column' alignItems='center'>
                    <Typography key={uuidv4()} noWrap>{props.text}</Typography>
                </Stack>
            </Stack>
        </Item>
    )
};

export default MessageItem;

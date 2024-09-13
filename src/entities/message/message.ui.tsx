import React from 'react';
import {Paper, Typography} from '@mui/material';
import Stack from '@mui/material/Stack';
import {styled} from '@mui/material/styles';
import {TMessage} from "entities/message";
import moment from 'moment';
import {useSelector} from 'react-redux';
import {getAuthId} from 'shared/model/auth/auth-selectors';
import {v4 as uuidv4} from 'uuid';
import styles from './message.module.scss';

const Item = styled(Paper)(({theme}) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    maxWidth: '95%',
}));

export const Message: React.FC<TMessage> = (props) => {
    const authId = useSelector(getAuthId);
    let sx: Record<string, any> = {my: 1};
    sx = props.from._id === authId
        ? {ml: '55%', backgroundColor: `rgba(159, 237, 215, 0.2)`, ...sx}
        : {mr: '55%', backgroundColor: `rgba(2, 102, 112, 0.2)`, ...sx};

    return (
        <Item sx={sx} className={styles.msgItem}>
            <Stack direction='column' alignItems='start'>
                <Stack direction='row' className={styles.msgItemInfo}>
                    <Typography  key={uuidv4()} paragraph noWrap>{props.from.secondName}</Typography>
                    <Typography key={uuidv4()} paragraph noWrap>{moment(props.createdAt).format('LLL')}</Typography>
                </Stack>

                <Typography className={styles.text} key={uuidv4()} noWrap>{props.text}</Typography>
            </Stack>
        </Item>
    )
};

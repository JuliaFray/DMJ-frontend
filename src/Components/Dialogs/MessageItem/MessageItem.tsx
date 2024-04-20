import React from 'react';
import {IMessage} from "../../../types/types";
import {Avatar, Paper, Typography} from '@mui/material';
import Stack from '@mui/material/Stack';
import {styled} from '@mui/material/styles';


const Item = styled(Paper)(({theme}) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    maxWidth: 400,
}));

const MessageItem: React.FC<IMessage> = (props) => {
    return (
        <>
            <Item sx={{my: 1, mx: 'auto', p: 2}}>
                <Stack spacing={2} direction="row" alignItems="center">
                    <Avatar>W</Avatar>
                    <Typography noWrap>{props.message}</Typography>
                </Stack>
            </Item>

            <Item sx={{my: 1, mx: 'auto', p: 2,}}>
                <Stack spacing={2} direction="row" alignItems="center">
                    <Avatar>W</Avatar>
                    <Typography noWrap>{props.message}</Typography>
                </Stack>
            </Item>
        </>
    )
};

export default MessageItem;

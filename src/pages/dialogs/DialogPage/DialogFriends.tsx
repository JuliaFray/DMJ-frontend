import React from 'react';
import {Divider, ListItem, Typography} from '@mui/material';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import {TDialogFriends} from "~entities/message";
import {useSelector} from 'react-redux';
import {dialogSelector} from '~shared/model/dialog';

const DialogFriends: React.FC = () => {
    const users = useSelector(dialogSelector.getUsers);

    return (
        <List sx={{width: '100%', maxWidth: 360}}>
            Участники
            {
                users.map((item: TDialogFriends) => {
                    return (
                        <>
                            <ListItem alignItems="flex-start">
                                <ListItemAvatar>
                                    <Avatar alt={item.name} src={item.avatar}/>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={item.name}
                                    secondary={
                                        <React.Fragment>
                                            <Typography
                                                sx={{display: 'inline'}}
                                                component="span"
                                                variant="body2"
                                                color="text.primary">
                                            </Typography>
                                        </React.Fragment>
                                    }
                                />
                            </ListItem>
                            <Divider variant="inset" component="li"/>
                        </>
                    )
                })
            }
        </List>
    )
}

export default DialogFriends;

import React from 'react';
import List from '@mui/material/List';
import {Divider, ListItem, Typography} from '@mui/material';
import Avatar from '@mui/material/Avatar';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import {useSelector} from 'react-redux';
import {getUsers} from '../../../redux/dialog/dialog-selectors';

const DialogFriends: React.FC = (props, context) => {
    const users = useSelector(getUsers);

    return (
        <List sx={{width: '100%', maxWidth: 360}}>
            Участники
            {
                users.map(item => {
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

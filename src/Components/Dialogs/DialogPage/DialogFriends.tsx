import React from 'react';
import List from '@mui/material/List';
import {Divider, ListItem, Typography} from '@mui/material';
import Avatar from '@mui/material/Avatar';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';

const DialogFriends = () => {
    return (
        <List sx={{width: '100%', maxWidth: 360, bgcolor: 'background.paper'}}>
            <ListItem alignItems="flex-start">
                <ListItemAvatar>
                    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg"/>
                </ListItemAvatar>
                <ListItemText
                    primary="friend1"
                    secondary={
                        <React.Fragment>
                            <Typography
                                sx={{display: 'inline'}}
                                component="span"
                                variant="body2"
                                color="text.primary">
                                preview...
                            </Typography>

                        </React.Fragment>
                    }
                />
            </ListItem>
            <Divider variant="inset" component="li"/>
            <ListItem alignItems="flex-start">
                <ListItemAvatar>
                    <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg"/>
                </ListItemAvatar>
                <ListItemText
                    primary="friend2"
                    secondary={
                        <React.Fragment>
                            <Typography
                                sx={{display: 'inline'}}
                                component="span"
                                variant="body2"
                                color="text.primary"
                            >
                                preview...
                            </Typography>
                        </React.Fragment>
                    }
                />
            </ListItem>
            <Divider variant="inset" component="li"/>
            <ListItem alignItems="flex-start">
                <ListItemAvatar>
                    <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg"/>
                </ListItemAvatar>
                <ListItemText
                    primary="friend3"
                    secondary={
                        <React.Fragment>
                            <Typography
                                sx={{display: 'inline'}}
                                component="span"
                                variant="body2"
                                color="text.primary"
                            >
                                preview...
                            </Typography>

                        </React.Fragment>
                    }
                />
            </ListItem>

        </List>
    )
}

export default DialogFriends;

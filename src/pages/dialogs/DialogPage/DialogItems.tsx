import React from 'react';
import {AvatarGroup, ListItem, Typography} from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import Stack from '@mui/material/Stack';
import {TDialog} from '~entities/message';
import {useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {useAppDispatch} from '~shared/hook/hooks';
import {getFullName, getImage} from '~shared/lib/helper';
import {authSelector} from '~shared/model/auth';
import {dialogSelector, dialogSlice} from '~shared/model/dialog';
import {v4 as uuidv4} from 'uuid';

const DialogItems: React.FC = () => {

    const items = useSelector(dialogSelector.getDialogs);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const authId = useSelector(authSelector.getAuthId);

    const onDialogSelect = (item: TDialog) => {
        dispatch(dialogSlice.dialogActions.addSelectedDialog(item));
        navigate(`/dialogs/${item._id}`)
    }

    return (
        <List key={uuidv4()} sx={{width: '100%'}}>
            {
                items.map((item: TDialog) => {
                    const users = item.isPrivate ? item.users.filter(u => u._id !== authId) : item.users
                    return (<>
                        <ListItem key={uuidv4()} alignItems="flex-start">
                            <ListItemButton key={uuidv4()} onClick={() => onDialogSelect(item)}>
                                <AvatarGroup key={uuidv4()} max={5}>
                                    {users.map(user => <Stack key={uuidv4()} spacing={2} direction='row' alignItems='center'>
                                        <Avatar key={uuidv4()} alt={getFullName(user)} src={getImage(user.avatar, true)}/>
                                        <Typography key={uuidv4()} noWrap>{getFullName(user)}</Typography>
                                    </Stack>)}
                                </AvatarGroup>
                            </ListItemButton>
                        </ListItem>
                        <Divider/>
                    </>)
                })
            }

        </List>
    )
}

export default DialogItems;

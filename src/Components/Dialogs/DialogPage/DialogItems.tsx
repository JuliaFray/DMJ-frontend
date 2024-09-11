import React from 'react';
import {AvatarGroup, ListItem, Typography} from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import Stack from '@mui/material/Stack';
import {useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {v4 as uuidv4} from 'uuid';
import {useAppDispatch} from '../../../hook/hooks';
import {getAuthId} from '../../../redux/auth/auth-selectors';
import {getDialogs} from '../../../redux/dialog/dialog-selectors';
import {dialogActions} from '../../../redux/dialog/dialog-slice';
import {IDialog} from '../../../types/types';
import {getFullName, getImage} from '../../../Utils/helper';

const DialogItems: React.FC = (props, context) => {

    const items = useSelector(getDialogs);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const authId = useSelector(getAuthId);

    const onDialogSelect = (item: IDialog) => {
        dispatch(dialogActions.addSelectedDialog(item));
        navigate(`/dialogs/${item._id}`)
    }

    return (
        <List key={uuidv4()} sx={{width: '100%'}}>
            {
                items.map(item => {
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

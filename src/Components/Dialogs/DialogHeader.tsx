import React from 'react';
import styles from './DialogPage/Dialog.module.scss';
import {IDialog} from '../../types/types';
import {AvatarGroup, Box, Typography} from '@mui/material';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import {getFullName, getImage} from '../../Utils/helper';
import {v4 as uuidv4} from 'uuid';
import {useSelector} from 'react-redux';
import {getAuthId} from '../../redux/auth/auth-selectors';

type IDialogHeader = {
    selectedDialog: IDialog
}

const DialogHeader: React.FC<IDialogHeader> = (props, context) => {
    const authId = useSelector(getAuthId);

    if(!props.selectedDialog.users) {
        return <></>
    }

    if(props.selectedDialog.isPrivate) {
        const to = props.selectedDialog.users.find(u => u._id !== authId);
        if(!to) {
            return <></>
        }
        return (
            <Box sx={{overflow: 'hidden', px: 3}} className={styles.dialogHeader}>
                <div className={styles.dialogHeaderInfo}>
                    <Avatar key={uuidv4()} alt={getFullName(to)} src={getImage(to.avatar, true)}/>
                    <Typography key={uuidv4()} className={styles.author} noWrap>{getFullName(to)}</Typography>
                </div>
                <Divider sx={{marginBottom: '20px'}}/>
            </Box>
        )
    }

    return (
        <Box sx={{overflow: 'hidden', px: 3}} className={styles.dialogHeader}>
            <div className={styles.dialogHeaderInfo}>
                {}
                <AvatarGroup max={5}>
                    {props.selectedDialog.users.filter(u => u._id !== authId).map(
                        user => <Avatar key={uuidv4()} alt={getFullName(user)} src={getImage(user.avatar, true)}/>)}
                </AvatarGroup>
            </div>
            <Divider sx={{marginBottom: '20px'}}/>
        </Box>
    )
};

export default DialogHeader;

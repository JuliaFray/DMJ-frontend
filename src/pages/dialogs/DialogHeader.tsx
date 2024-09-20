import React from 'react';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import {AvatarGroup, Box, Typography} from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import {TDialog} from 'entities/message';
import {useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {getFullName, getImage} from 'shared/lib/helper';
import {getAuthId} from 'shared/model/auth/auth-selectors';
import {v4 as uuidv4} from 'uuid';
import styles from './dialog-page.module.scss';

type IDialogHeader = {
    selectedDialog: TDialog
}

const DialogHeader: React.FC<IDialogHeader> = (props, context) => {
    const authId = useSelector(getAuthId);
    const navigate = useNavigate();

    const handleBack = () => {
        navigate('/dialogs');
    }

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
                    <IconButton className={styles.btn} type={'submit'} color='primary' onClick={handleBack}>
                        <ArrowBackIosIcon/>
                    </IconButton>
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
                <IconButton className={styles.btn} type={'submit'} color='primary' onClick={handleBack}>
                    <ArrowBackIosIcon/>
                </IconButton>
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

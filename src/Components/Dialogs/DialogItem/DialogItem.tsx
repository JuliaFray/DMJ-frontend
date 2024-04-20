import React from 'react';
import StyleSheet from '../DialogPage/Dialog.module.css';
import {Link} from 'react-router-dom';
import {SimpleNameObj} from "../../../types/types";
import {Box} from '@mui/material';

const DialogItem: React.FC<SimpleNameObj> = (props) => {
    return (
        <Box className={StyleSheet.dialogItem}>
            <img alt='dialogUser' src='https://upload.wikimedia.org/wikipedia/commons/f/f4/User_Avatar_2.png'/>
            <Link to={'/dialogs/' + props.id}>{props.name}</Link>
        </Box>

    )
};

export default DialogItem;

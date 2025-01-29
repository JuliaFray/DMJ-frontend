import React, {useEffect} from 'react';
import {Grid, useMediaQuery} from '@mui/material';
import {useAppDispatch} from 'shared/hook/hooks';
import {getAllDialogs} from 'shared/model/dialog/dialog-thunks';
import {theme} from "shared/themes/theme";
import styles from './dialog-page.module.scss';
import DialogMain from './DialogPage/DialogMain';


export const DialogPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const isMore1200px = useMediaQuery(theme.breakpoints.up('lg'));

    useEffect(() => {
        dispatch(getAllDialogs({query: ''}))
    }, []);

    return (
        <Grid container spacing={2} style={{height: '100%'}}>
            <Grid item md={isMore1200px ? 9 : 12}>
                <DialogMain/>
            </Grid>
            <Grid item md={3} className={styles.right}></Grid>
        </Grid>
    )
};


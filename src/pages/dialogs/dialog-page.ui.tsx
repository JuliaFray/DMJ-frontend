import React, {useEffect} from 'react';
import { Grid } from '@mui/material';
import {useAppDispatch} from 'shared/hook/hooks';
import {getAllDialogs} from 'shared/model/dialog/dialog-thunks';
import styles from './dialog-page.module.scss';
import DialogMain from './DialogPage/DialogMain';


export const DialogPage: React.FC = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getAllDialogs({query: ''}))
    }, []);

    return (
        <Grid container spacing={2} style={{height: '100%'}}>
            <Grid item md={9}>
                <DialogMain/>
            </Grid>
            <Grid item md={3} className={styles.right}></Grid>
        </Grid>
    )
};


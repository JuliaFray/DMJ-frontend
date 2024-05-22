import React, {ReactNode} from 'react';
import {Grid, useMediaQuery} from '@mui/material';
import styles from './PageLayout.module.scss';
import ScrollToTop from '../ScrollToTop';
import {theme} from '../../../styles/theme';

type IPageLayout = {
    isMainPage: boolean,
    mainChildren: ReactNode,
    leftChildren?: ReactNode,
    rightChildren?: ReactNode,
    mainSx?: Record<string, any>
}
const PageLayout: React.FC<IPageLayout> = (props, context) => {
    const isMore1200px = useMediaQuery(theme.breakpoints.up('lg'));

    const mdMain = props.isMainPage
        ? isMore1200px
            ? 7
            : props.rightChildren ? 8.5 : 12
        : 12

    const mdSide = isMore1200px
        ? 2.5
        : 3.5;

    return (
        <div className={styles.main}>

            <Grid container spacing={2} sx={{height: '100%'}}>
                {isMore1200px && props.isMainPage && <Grid item md={2.5} className={styles.left}>{props.leftChildren}</Grid>}

                <Grid item xs={12} sm={12} md={mdMain} sx={props.mainSx ? props.mainSx : {height: 'auto'}}>
                    {props.mainChildren}
                </Grid>

                {props.rightChildren && props.isMainPage && <Grid item md={mdSide} className={styles.right}>{props.rightChildren}</Grid>}

            </Grid>
            <ScrollToTop/>
        </div>

    );
}

export default PageLayout;

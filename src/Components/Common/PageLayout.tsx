import React, {ReactNode} from 'react';
import {Grid} from '@mui/material';
import styles from './PageLayout.module.scss';

type IPageLayout = {
    isMainPage: boolean,
    mainChildren: ReactNode,
    leftChildren?: ReactNode,
    rightChildren?: ReactNode,
}
const PageLayout: React.FC<IPageLayout> = (props, context) => {
    return (
        <Grid container spacing={2}>

            {props.isMainPage && <Grid item md={2} className={styles.left}>{props.leftChildren}</Grid>}

            <Grid item xs={12} sm={12} md={props.isMainPage ? 8 : 12}>
                {props.mainChildren}
            </Grid>

            {props.isMainPage && <Grid item md={2} className={styles.right}>{props.rightChildren}</Grid>}

        </Grid>
    );
}

export default PageLayout;

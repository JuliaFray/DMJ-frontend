import React from 'react';
import {Grid, useMediaQuery} from '@mui/material';
import {CreateArticle} from "features/create-article/create-article.ui";
import {theme} from "shared/themes/theme";

export const ArticleEditorPage: React.FC = React.memo(() => {
    const isMore1200px = useMediaQuery(theme.breakpoints.up('lg'));

    return (
        <Grid container spacing={2}>
            <Grid item md={isMore1200px ? 9 : 12}>
                <CreateArticle/>
            </Grid>
        </Grid>
    );
});

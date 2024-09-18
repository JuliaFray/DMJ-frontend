import React from "react";
import {Grid} from "@mui/material";
import {ArticleSkeleton} from "entities/article";

export const ArticlesFeedSkeleton = () => {
    return <Grid item xs={12} sm={12} md={12}>
        {new Array(10).fill(0).map((__, index) => (
            <ArticleSkeleton key={index}/>))}
    </Grid>
}

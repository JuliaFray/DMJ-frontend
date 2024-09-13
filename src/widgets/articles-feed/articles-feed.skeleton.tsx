import React from "react";
import {ArticleSkeleton} from "entities/article";

export const ArticlesFeedSkeleton = () => {
    return new Array(10).fill(0).map((__, index) => (
        <ArticleSkeleton key={index}/>
    ))
}

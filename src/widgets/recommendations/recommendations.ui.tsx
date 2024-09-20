import React from 'react';
import {TArticle} from 'entities/article';
import {ArticleCard, ArticleCarousel} from 'widgets';

export const Recommendations: React.FC<{ posts: TArticle[] }> = (props, context) => {
    return (
        <ArticleCarousel posts={props.posts}>
            {props.posts.map(item => <ArticleCard isMain={true} key={item._id} post={item}
                                                  avatarAbbr={item.author?.firstName?.substring(0, 1).toUpperCase() || 'U'}/>)}
        </ArticleCarousel>
    )
}

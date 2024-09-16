import React from 'react';
import {TArticle} from 'entities/article';
import {ArticleCarousel} from 'widgets';
import {ArticleCard} from 'widgets/article-card';

export type IRecommendations = {
    posts: TArticle[],
}
const Recommendations: React.FC<IRecommendations> = (props, context) => {
    return (
        <ArticleCarousel posts={props.posts}>
            {props.posts.map(item => <ArticleCard isMain={true} key={item._id} post={item}
                                                  avatarAbbr={item.author?.firstName?.substring(0, 1).toUpperCase() || 'U'}/>)}
        </ArticleCarousel>
    )
}

export default Recommendations;

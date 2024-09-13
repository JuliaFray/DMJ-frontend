import React from 'react';
import {TArticle} from 'entities/article';
import {PostCarousel} from './../PostCarousel';
// eslint-disable-next-line boundaries/element-types
import {PostCard} from '../article-card/PostCard';

export type IRecommendations = {
    posts: TArticle[],
}
const Recommendations: React.FC<IRecommendations> = (props, context) => {
    return (
        <PostCarousel posts={props.posts}>
            {props.posts.map(item => <PostCard isMain={true} key={item._id} post={item}
                                               avatarAbbr={item.author?.firstName?.substring(0, 1).toUpperCase() || 'U'}/>)}
        </PostCarousel>
    )
}

export default Recommendations;

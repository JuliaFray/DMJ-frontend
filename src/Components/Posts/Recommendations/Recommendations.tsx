import React from 'react';
import {IPost} from '../../../types/types';
import {PostCard} from '../PostCard/PostCard';
import PostCarousel from '../PostCarousel';

export type IRecommendations = {
    posts: IPost[],
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

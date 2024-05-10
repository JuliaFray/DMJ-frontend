import React from 'react';
import Carousel from 'react-material-ui-carousel'
import {IPost} from '../../types/types';

type IPostCarousel = {
    posts: IPost[],
    children: React.JSX.Element[]
}
const PostCarousel: React.FC<IPostCarousel> = (props) => {
    return (
        <Carousel autoPlay interval={10000} fullHeightHover={false}>
            {props.children}
        </Carousel>
    )
}

export default PostCarousel;

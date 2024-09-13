import React from 'react';
import {TArticle} from 'entities/article';
import Carousel from 'react-material-ui-carousel'

type IPostCarousel = {
    posts: TArticle[],
    children: React.JSX.Element[]
}
export const PostCarousel: React.FC<IPostCarousel> = (props) => {
    return (
        <Carousel autoPlay interval={10000} fullHeightHover={false}>
            {props.children}
        </Carousel>
    )
}

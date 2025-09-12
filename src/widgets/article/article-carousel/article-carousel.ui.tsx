import React from 'react';

import Carousel from 'react-material-ui-carousel';

import { TArticle } from 'shared/types';

type IPostCarousel = {
  posts: TArticle[];
  children: React.JSX.Element[];
};
export const ArticleCarousel: React.FC<IPostCarousel> = (props) => {
  return (
    <Carousel autoPlay interval={10000} fullHeightHover={false}>
      {props.children}
    </Carousel>
  );
};

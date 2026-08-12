import React from 'react';

import { ArticleCard, ArticleCarousel } from 'widgets/article';

import { IPost } from 'shared/types';

export const Recommendations: React.FC<{ posts: IPost[] }> = ({ posts }) => {
  return (
    <ArticleCarousel posts={posts}>
      {posts.map((item) => (
        <ArticleCard isOneArticlePage key={item._id} post={item} />
      ))}
    </ArticleCarousel>
  );
};

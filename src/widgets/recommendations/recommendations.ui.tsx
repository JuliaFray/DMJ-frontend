import React from 'react';

import { TArticle } from 'shared/types';

import { ArticleCard, ArticleCarousel } from 'widgets';

export const Recommendations: React.FC<{ posts: TArticle[] }> = ({ posts }) => {
  return (
    <ArticleCarousel posts={posts}>
      {posts.map((item) => (
        <ArticleCard
          isMain
          key={item._id}
          post={item}
          avatarAbbr={item.author?.firstName?.substring(0, 1).toUpperCase() || 'U'}
        />
      ))}
    </ArticleCarousel>
  );
};

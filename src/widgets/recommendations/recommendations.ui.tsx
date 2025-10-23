import React from 'react';

import { ArticleCard, ArticleCarousel } from 'widgets/article';

import { TArticle } from 'shared/types';

export const Recommendations: React.FC<{ posts: TArticle[] }> = ({ posts }) => {
  return (
    <ArticleCarousel posts={posts}>
      {posts.map((item) => (
        <ArticleCard
          isOneArticlePage
          key={item._id}
          post={item}
          avatarAbbr={item.author?.login?.substring(0, 1).toUpperCase() || 'U'}
        />
      ))}
    </ArticleCarousel>
  );
};

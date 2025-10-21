import React, { useEffect } from 'react';

import { useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import List from '@mui/material/List';

import { Comment } from 'entities/comment';

import { useAppDispatch } from 'shared/hook';
import { getPostComments, getUserPostComments } from 'shared/model';
import { TArticle, TComment } from 'shared/types';

// eslint-disable-next-line no-restricted-imports
import { ArticleCard } from 'widgets';

// eslint-disable-next-line no-restricted-imports
import { CommonLayoutUi } from '../../../app/layouts';

type IPostCommentPage = {
  userId: string;
};

const PostCommentItem: React.FC<{ item: TArticle }> = ({ item }) => {
  return (
    <>
      <ArticleCard
        key={item._id}
        isOneArticlePage={false}
        isComments
        post={item}
        avatarAbbr={item.author?.login?.substring(0, 1).toUpperCase() || 'U'}
      />
      <List key={uuidv4()}>
        {item.comments.map((obj: TComment) => (
          <Comment key={uuidv4()} item={obj} isLoading={false} />
        ))}
      </List>
    </>
  );
};

export const CommentsFeed: React.FC<IPostCommentPage> = ({ userId }) => {
  const dispatch = useAppDispatch();

  const postComments = useSelector(getPostComments);

  useEffect(() => {
    dispatch(getUserPostComments({ userId }));
  }, [dispatch, userId]);

  return (
    <CommonLayoutUi
      isMainPage={false}
      mainChildren={
        <div>
          {postComments.map((it: TArticle) => (
            <PostCommentItem key={uuidv4()} item={it} />
          ))}
        </div>
      }
    />
  );
};

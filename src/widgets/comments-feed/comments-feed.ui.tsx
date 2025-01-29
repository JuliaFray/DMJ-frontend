import React, { useEffect } from "react";

import { Comment } from "entities/comment";
import CommonLayoutUi from "pages/layouts/common-layout.ui";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";

import List from "@mui/material/List";

import { getPostComments, getUserPostComments, useAppDispatch } from "shared";
import { TArticle, TComment } from "shared";

import { ArticleCard } from "widgets";

type IPostCommentPage = {
  userId: string;
};

export const CommentsFeed: React.FC<IPostCommentPage> = (props, context) => {
  const dispatch = useAppDispatch();

  const postComments = useSelector(getPostComments);

  useEffect(() => {
    dispatch(getUserPostComments({ userId: props.userId }));
  }, []);

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

const PostCommentItem: React.FC<{ item: TArticle }> = (props, context) => {
  return (
    <>
      <ArticleCard
        key={props.item._id}
        isMain={false}
        isComments={true}
        post={props.item}
        avatarAbbr={
          props.item.author?.firstName?.substring(0, 1).toUpperCase() || "U"
        }
      />
      <List key={uuidv4()}>
        {props.item.comments.map((obj: TComment) => (
          <Comment key={uuidv4()} item={obj} isLoading={false} />
        ))}
      </List>
    </>
  );
};

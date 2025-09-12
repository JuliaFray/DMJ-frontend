import { RootState } from '../redux-store';

export const getPosts = (state: RootState) => {
  return state.posts.posts || [];
};

export const getPostsDataLength = (state: RootState) => {
  return state.posts.totalCount || 0;
};

export const getPopularPosts = (state: RootState) => {
  return state.posts.popularPosts;
};

export const getRecommendations = (state: RootState) => {
  return state.posts.recommendations;
};

export const getPost = (state: RootState) => {
  return state.posts.post;
};

export const getFetchedPopularTags = (state: RootState) => {
  return state.posts.popularTags;
};

export const getFetchedPopularAuthors = (state: RootState) => {
  return state.posts.popularAuthors;
};

export const getAllFetchedTags = (state: RootState) => {
  return state.posts.allTags;
};

export const getPostsIsFetching = (state: RootState) => {
  return state.posts.isFetching;
};

export const getImg = (state: RootState) => {
  return state.posts.img;
};

export const getPostComments = (state: RootState) => {
  return state.posts.postComments;
};

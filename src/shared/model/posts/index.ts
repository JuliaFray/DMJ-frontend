export { postsSlice, postsReducer, postsActions } from "./posts-slice";
export {
  getPostsIsFetching,
  getPost,
  getPopularPosts,
  getPosts,
  getPostsDataLength,
  getPostComments,
  getImg,
  getFetchedPopularTags,
  getAllFetchedTags,
  getRecommendations,
} from "./posts-selectors";
export {
  getRecommendationPost,
  togglePostRating,
  getOnePost,
  createPostComment,
  markPostFavorite,
  createPost,
  getPopularPost,
  deletePost,
  editPost,
  getUserPostComments,
  toggleCommentRating,
  getPopularTags,
} from "./posts-thunks";

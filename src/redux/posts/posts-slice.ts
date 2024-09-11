import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {PostsResponseType} from '../../api/api-types';
import {IChipData, IImage, IPost} from '../../types/types';
import {
    createPost,
    createPostComment,
    deletePost,
    editPost,
    getAllPosts,
    getAllTags,
    getOnePost,
    getPopularPost,
    getPopularTags,
    getRecommendationPost,
    getUserPostComments
} from './posts-thunks';

type InitialStateType = {
    isFetching: boolean,
    totalCount: number,
    posts: IPost[],
    popularPosts: IPost[],
    recommendations: IPost[],
    post: IPost | null,
    popularTags: IChipData[],
    allTags: IChipData[],
    img: IImage | null,
    postComments: IPost[],
}

const initialState: InitialStateType = {
    posts: [],
    totalCount: 0,
    popularPosts: [],
    post: null,
    isFetching: true,
    popularTags: [],
    allTags: [],
    img: null,
    recommendations: [],
    postComments: []
};

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        clearState: (state) => {
            state.posts = [];
            state.totalCount = 0;
            state.popularPosts = [];
            state.post = null;
            state.isFetching = false;
            state.popularTags = [];
            state.allTags = [];
            state.img = null;
        },
        clearPostState: (state) => {
            state.post = null;
            state.isFetching = false;
            state.img = null;
        },
        clearImg: (state) => {
            state.img = null;
        }
    },
    extraReducers: (builder) => {
        builder
            //=====getAllPosts=====//
            .addCase(getAllPosts.pending, (state) => {
                state.isFetching = true;
                state.posts = [];
                state.popularPosts = [];
                state.post = null;
                state.totalCount = 0;
            })
            .addCase(getAllPosts.fulfilled, (state, action: PayloadAction<PostsResponseType>) => {
                state.isFetching = false;
                state.posts = action.payload.data;
                state.totalCount = action.payload.totalCount;
            })
            .addCase(getAllPosts.rejected, (state) => {
                state.isFetching = false;
                state.posts = [];
                state.totalCount = 0;
            })
            //=====getAllTags=====//
            .addCase(getAllTags.pending, (state) => {
                state.isFetching = true;
                state.allTags = [];
            })
            .addCase(getAllTags.fulfilled, (state, action: PayloadAction<IChipData[]>) => {
                state.isFetching = false;
                state.allTags = action.payload;
            })
            .addCase(getAllTags.rejected, (state) => {
                state.isFetching = false;
                state.allTags = [];
            })
            //=====getPopularTags=====//
            .addCase(getPopularTags.pending, (state) => {
                state.isFetching = true;
                state.popularTags = [];
            })
            .addCase(getPopularTags.fulfilled, (state, action: PayloadAction<IChipData[]>) => {
                state.isFetching = false;
                state.popularTags = action.payload;
            })
            .addCase(getPopularTags.rejected, (state) => {
                state.isFetching = false;
                state.popularTags = [];
            })
            //=====getPopularPost=====//
            .addCase(getPopularPost.pending, (state) => {
                state.isFetching = true;
            })
            .addCase(getPopularPost.fulfilled, (state, action) => {
                state.isFetching = false;
                state.popularPosts = action.payload;
            })
            .addCase(getPopularPost.rejected, (state) => {
                state.isFetching = false;
                state.popularPosts = [];
            })
            //=====getRecommendationPost=====//
            .addCase(getRecommendationPost.pending, (state) => {
                state.isFetching = true;
            })
            .addCase(getRecommendationPost.fulfilled, (state, action) => {
                state.isFetching = false;
                state.recommendations = action.payload;
            })
            .addCase(getRecommendationPost.rejected, (state) => {
                state.isFetching = false;
                state.recommendations = [];
            })
            //=====getOnePost=====//
            .addCase(getOnePost.pending, (state) => {
                state.isFetching = true;
                state.post = null;
            })
            .addCase(getOnePost.fulfilled, (state, action) => {
                state.isFetching = false;
                state.post = action.payload;
            })
            .addCase(getOnePost.rejected, (state) => {
                state.isFetching = false;
                state.post = null;
            })
            //=====editPost=====//
            .addCase(editPost.pending, (state) => {
                state.isFetching = true;
            })
            .addCase(editPost.fulfilled, (state) => {
                state.isFetching = false;
            })
            .addCase(editPost.rejected, (state) => {
                state.isFetching = false;
            })
            //=====createPost=====//
            .addCase(createPost.pending, (state) => {
                state.isFetching = true;
            })
            .addCase(createPost.fulfilled, (state, action) => {
                state.isFetching = false;
                state.post = action.payload
            })
            .addCase(createPost.rejected, (state) => {
                state.isFetching = false;
            })
            //=====deletePost=====//
            .addCase(deletePost.pending, (state) => {
                state.isFetching = true;
            })
            .addCase(deletePost.fulfilled, (state, action) => {
                state.isFetching = false;
                state.posts = state.posts.filter(p => p._id !== action.meta.arg.payload._id)
            })
            .addCase(deletePost.rejected, (state) => {
                state.isFetching = false;
            })
            //=====createPostComment=====//
            .addCase(createPostComment.pending, (state) => {
                state.isFetching = true;
            })
            .addCase(createPostComment.fulfilled, (state) => {
                state.isFetching = false;
            })
            .addCase(createPostComment.rejected, (state) => {
                state.isFetching = false;
            })
            //=====getUserPostComments=====//
            .addCase(getUserPostComments.pending, (state) => {
                state.isFetching = true;
            })
            .addCase(getUserPostComments.fulfilled, (state, action) => {
                state.isFetching = false;
                state.postComments = action.payload;
            })
            .addCase(getUserPostComments.rejected, (state) => {
                state.isFetching = false;
                state.postComments = [];
            })
    }
});

export default postsSlice.reducer;
export const postActions = postsSlice.actions;

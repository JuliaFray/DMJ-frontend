import {IPost} from '../../types/types';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {createPost, createPostComment, deletePost, editPost, getAllPosts, getLastTags, getOnePost, getPopularPost, markPostFavorite} from './posts-thunks';

type InitialStateType = {
    posts: IPost[],
    newPostId: string,
    isFetching: boolean,
    post: IPost | null,
    tags: string[]
}

const initialState: InitialStateType = {
    posts: [],
    newPostId: '',
    isFetching: false,
    post: null,
    tags: []
};

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        clearState: (state) => {
            state.posts = [];
            state.isFetching = false;
            state.newPostId = '';
        }
    },
    extraReducers: (builder) => {
        builder
            //=====getAllPosts=====//
            .addCase(getAllPosts.pending, (state) => {
                state.isFetching = true;
                state.posts = [];
                state.post = null;
            })
            .addCase(getAllPosts.fulfilled, (state, action: PayloadAction<IPost[]>) => {
                state.isFetching = false;
                state.posts = action.payload;
            })
            .addCase(getAllPosts.rejected, (state) => {
                state.isFetching = false;
                state.posts = [];
            })
            //=====getLastTags=====//
            .addCase(getLastTags.pending, (state) => {
                state.isFetching = true;
                state.tags = [];
            })
            .addCase(getLastTags.fulfilled, (state, action: PayloadAction<string[]>) => {
                state.isFetching = false;
                state.tags = action.payload;
            })
            .addCase(getLastTags.rejected, (state) => {
                state.isFetching = false;
                state.tags = [];
            })
            //=====getPopularPost=====//
            .addCase(getPopularPost.pending, (state) => {
                state.isFetching = true;
            })
            .addCase(getPopularPost.fulfilled, (state, action) => {
                state.isFetching = false;
                state.post = action.payload;
            })
            .addCase(getPopularPost.rejected, (state) => {
                state.isFetching = false;
                state.post = null;
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
            .addCase(createPost.fulfilled, (state) => {
                state.isFetching = false;
            })
            .addCase(createPost.rejected, (state) => {
                state.isFetching = false;
                state.newPostId = '';
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
    }
});

export default postsSlice.reducer;

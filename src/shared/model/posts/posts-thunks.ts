import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

import { TArticle, TChipData, TComment } from "shared";

import { postAPI } from "../../api";
import { ResultCodeEnum } from "../../api/api-types";
import { ACCESS_DENIED } from "../../lib/DictConstants";
import { appActions } from "../app";
import { authActions } from "../auth";

export const markPostFavorite = createAsyncThunk<
  void,
  { postId: string },
  { rejectValue: string }
>("posts/favorite", async (data, thunkAPI) => {
  const response = await postAPI.markPostFavorite(data.postId);
  try {
    if (response.resultCode === ResultCodeEnum.Error) {
      return thunkAPI.rejectWithValue(response.message);
    }
    return response.data;
  } catch (e) {
    thunkAPI.dispatch(authActions.logout());
    thunkAPI.dispatch(appActions.setUninitialized());
    return thunkAPI.rejectWithValue(ACCESS_DENIED);
  }
});

export const togglePostRating = createAsyncThunk<
  void,
  { postId: string; rating: number },
  { rejectValue: string }
>("posts/rating", async (data, thunkAPI) => {
  const response = await postAPI.toggleRating(data.postId, data.rating);
  try {
    if (response.resultCode === ResultCodeEnum.Error) {
      return thunkAPI.rejectWithValue(response.message);
    }
    return response.data;
  } catch (e) {
    thunkAPI.dispatch(authActions.logout());
    thunkAPI.dispatch(appActions.setUninitialized());
    return thunkAPI.rejectWithValue(ACCESS_DENIED);
  }
});

export const getPopularPost = createAsyncThunk<
  TArticle[],
  {},
  { rejectValue: string }
>("posts/popular", async (__, thunkAPI) => {
  const response = await postAPI.getPopular();
  try {
    if (response.resultCode === ResultCodeEnum.Error) {
      return thunkAPI.rejectWithValue(response.message);
    }
    return response.data;
  } catch (e) {
    thunkAPI.dispatch(authActions.logout());
    thunkAPI.dispatch(appActions.setUninitialized());
    return thunkAPI.rejectWithValue(ACCESS_DENIED);
  }
});

export const getOnePost = createAsyncThunk<
  TArticle,
  { postId: string },
  { rejectValue: string }
>("posts/one", async (data, thunkAPI) => {
  try {
    const response = await postAPI.getOne(data.postId);
    if (response.resultCode === ResultCodeEnum.Error) {
      return thunkAPI.rejectWithValue(response.message);
    }
    return response.data;
  } catch (e) {
    if ((e as AxiosError)?.response?.status === 404) {
      window.location.href = "/404";
      return thunkAPI.rejectWithValue("");
    }
    thunkAPI.dispatch(authActions.logout());
    thunkAPI.dispatch(appActions.setUninitialized());
    return thunkAPI.rejectWithValue(ACCESS_DENIED);
  }
});

export const editPost = createAsyncThunk<
  void,
  { file: FormData; id: string },
  { rejectValue: string }
>("posts/edit", async (data, thunkAPI) => {
  try {
    const response = await postAPI.updatePost(data.file, data.id);
    if (response.resultCode === ResultCodeEnum.Error) {
      return thunkAPI.rejectWithValue(response.message);
    }
    // thunkAPI.dispatch(getAllPosts({query: ''}));
    return response.data;
  } catch (e) {
    thunkAPI.dispatch(authActions.logout());
    thunkAPI.dispatch(appActions.setUninitialized());
    return thunkAPI.rejectWithValue(ACCESS_DENIED);
  }
});

export const createPost = createAsyncThunk<
  TArticle,
  { file: FormData },
  { rejectValue: string }
>("posts/create", async (data, thunkAPI) => {
  try {
    const response = await postAPI.createPost(data.file);
    if (response.resultCode === ResultCodeEnum.Error) {
      return thunkAPI.rejectWithValue(response.message);
    }
    return response.data;
  } catch (e) {
    thunkAPI.dispatch(authActions.logout());
    thunkAPI.dispatch(appActions.setUninitialized());
    return thunkAPI.rejectWithValue(ACCESS_DENIED);
  }
});

export const deletePost = createAsyncThunk<
  void,
  { payload: TArticle },
  { rejectValue: string }
>("posts/delete", async (data, thunkAPI) => {
  try {
    const response = await postAPI.deletePost(data.payload._id);
    if (response.resultCode === ResultCodeEnum.Error) {
      return thunkAPI.rejectWithValue(response.message);
    }
    return response.data;
  } catch (e) {
    thunkAPI.dispatch(authActions.logout());
    thunkAPI.dispatch(appActions.setUninitialized());
    return thunkAPI.rejectWithValue(ACCESS_DENIED);
  }
});

export const getPopularTags = createAsyncThunk<
  TChipData[],
  {},
  { rejectValue: string }
>("posts/tags", async (__, thunkAPI) => {
  const response = await postAPI.getPopularTags();
  try {
    if (response.resultCode === ResultCodeEnum.Error) {
      return thunkAPI.rejectWithValue(response.message);
    }
    return response.data;
  } catch (e) {
    thunkAPI.dispatch(authActions.logout());
    thunkAPI.dispatch(appActions.setUninitialized());
    return thunkAPI.rejectWithValue(ACCESS_DENIED);
  }
});

export const createPostComment = createAsyncThunk<
  TArticle,
  { comment: TComment; postId: string },
  { rejectValue: string }
>("comments/create", async (data, thunkAPI) => {
  try {
    const response = await postAPI.createPostComment(data.comment, data.postId);
    if (response.resultCode === ResultCodeEnum.Error) {
      return thunkAPI.rejectWithValue(response.message);
    }
    thunkAPI.dispatch(getOnePost({ postId: data.postId }));
    return response.data;
  } catch (e) {
    thunkAPI.dispatch(authActions.logout());
    thunkAPI.dispatch(appActions.setUninitialized());
    return thunkAPI.rejectWithValue(ACCESS_DENIED);
  }
});

export const getRecommendationPost = createAsyncThunk<
  TArticle[],
  { originPostId: string },
  { rejectValue: string }
>("posts/recommendations", async (data, thunkAPI) => {
  const response = await postAPI.getRecommendationPost(data.originPostId);
  try {
    if (response.resultCode === ResultCodeEnum.Error) {
      return thunkAPI.rejectWithValue(response.message);
    }
    return response.data;
  } catch (e) {
    thunkAPI.dispatch(authActions.logout());
    thunkAPI.dispatch(appActions.setUninitialized());
    return thunkAPI.rejectWithValue(ACCESS_DENIED);
  }
});

export const toggleCommentRating = createAsyncThunk<
  void,
  { commentId: string; rating: number },
  { rejectValue: string }
>("posts/commentRating", async (data, thunkAPI) => {
  const response = await postAPI.toggleCommentRating(
    data.commentId,
    data.rating
  );
  try {
    if (response.resultCode === ResultCodeEnum.Error) {
      return thunkAPI.rejectWithValue(response.message);
    }
    return response.data;
  } catch (e) {
    thunkAPI.dispatch(authActions.logout());
    thunkAPI.dispatch(appActions.setUninitialized());
    return thunkAPI.rejectWithValue(ACCESS_DENIED);
  }
});

export const getUserPostComments = createAsyncThunk<
  TArticle[],
  { userId: string },
  { rejectValue: string }
>("posts/comments", async (data, thunkAPI) => {
  const response = await postAPI.getUserPostComments(data.userId);
  try {
    if (response.resultCode === ResultCodeEnum.Error) {
      return thunkAPI.rejectWithValue(response.message);
    }
    return response.data;
  } catch (e) {
    thunkAPI.dispatch(authActions.logout());
    thunkAPI.dispatch(appActions.setUninitialized());
    return thunkAPI.rejectWithValue(ACCESS_DENIED);
  }
});

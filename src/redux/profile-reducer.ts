import {profileAPI} from '../api/profile-api';
import {PhotoType, PostType, ProfileType} from '../types/types';
import {GenericThunkType, InferActionType} from './redux-store';
import {ResultCodeEnum} from '../api/api-types';
import {stopSubmit} from 'redux-form';
import {Action} from 'redux';
import {UploadFile} from 'antd/es/upload/interface';
import {postAPI} from '../api/post-api';

type InitialStateType = {
    posts: Array<PostType>,
    newPostText: string,
    profile: ProfileType | null,
    status: string
}

type ActionsType = InferActionType<typeof actions> | Action<typeof stopSubmit>;
type ThunkType = GenericThunkType<ActionsType>;

const initialState: InitialStateType = {
    posts: [],
    newPostText: '',
    profile: null,
    status: ''
};

enum ActionTypes {
    SN_PROFILE_SET_PROFILE = 'SN/PROFILE/SET_PROFILE',
    SN_PROFILE_SET_STATUS = 'SN/PROFILE/SET_STATUS',
    SN_PROFILE_SET_PHOTO = 'SN/PROFILE/SET_PHOTO',
    SN_PROFILE_DELETE_POST = 'SN/PROFILE/DELETE_POST',

    SN_POSTS_ADD_POST = 'SN/POSTS/ADD_POST',
    SN_POSTS_SET_POSTS = 'SN/POSTS/SET_POSTS',
    SN_POSTS_DELETE_POST = 'SN/POSTS/DELETE_POST',
}

const profileReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch(action.type) {
        // case ActionTypes.SN_POSTS_ADD_POST:
        //     let newPost: PostType = {
        //         id: state.posts.length + 1,
        //         title: '',
        //         text: action.newPostText,
        //         like: 0,
        //         dislike: 0,
        //         tags: [],
        //         viewsCount: 0,
        //         imageUrl: ''
        //     };
        //     return {
        //         ...state,
        //         posts: [...state.posts, newPost],
        //     };
        case ActionTypes.SN_PROFILE_SET_PROFILE:
            return {
                ...state,
                profile: action.profile
            };
        case ActionTypes.SN_PROFILE_SET_STATUS:
            return {
                ...state,
                status: action.status
            };
        case ActionTypes.SN_PROFILE_SET_PHOTO:
            return {
                ...state,
            };


        case ActionTypes.SN_POSTS_SET_POSTS:
            return {
                ...state,
                posts: action.posts
            };

        case ActionTypes.SN_PROFILE_DELETE_POST:
            return {...state, posts: state.posts.filter(p => p.id !== action.postId)};
        default:
            return state;
    }
};

export const actions = {
    addPost: (newPostText: string) => ({type: ActionTypes.SN_POSTS_ADD_POST, newPostText} as const),
    setProfile: (profile: ProfileType) => ({type: ActionTypes.SN_PROFILE_SET_PROFILE, profile} as const),
    setStatus: (status: string) => ({type: ActionTypes.SN_PROFILE_SET_STATUS, status} as const),
    updatePhoto: (photos: PhotoType) => ({type: ActionTypes.SN_PROFILE_SET_PHOTO, photos} as const),

    setPosts: (posts: PostType[]) => ({type: ActionTypes.SN_POSTS_SET_POSTS, posts} as const),
    deletePost: (postId: string) => ({type: ActionTypes.SN_PROFILE_DELETE_POST, postId} as const),
};

export const getUserProfile = (userId: string): ThunkType => async (dispatch) => {
    let profileData = await profileAPI.getProfile(userId);
    dispatch(actions.setProfile(profileData.data));
};

export const getUserStatus = (userId: string): ThunkType => async (dispatch) => {
    let response = await profileAPI.getStatus(userId);
    dispatch(actions.setStatus(response))
};

export const updateUserStatus = (status: string): ThunkType => async (dispatch) => {
    let data = await profileAPI.updateStatus(status);
    if(data.resultCode === ResultCodeEnum.Success) {
        dispatch(actions.setStatus(status))
    }
};

export const saveProfilePhoto = (photos: UploadFile): ThunkType => async (dispatch) => {
    let response = await profileAPI.savePhoto(photos);
    if(response.resultCode === ResultCodeEnum.Success) {
        dispatch(actions.updatePhoto(response.data.photos))
    }
};

export const saveUserProfile = (profile: ProfileType): ThunkType => async (dispatch, getState) => {
    const userId = getState().auth.id.toString();
    const data = await profileAPI.saveProfile(profile);

    if(data.resultCode === ResultCodeEnum.Success && userId) {
        await dispatch(getUserProfile(userId));
    } else {
        dispatch(stopSubmit('edit-profile', {_error: data.messages && data.messages[0]}));
        return Promise.reject(data.messages && data.messages[0])
    }
};

export const getUserPosts = (): ThunkType => async (dispatch) => {
    let postsData = await postAPI.getAll();
    dispatch(actions.setPosts(postsData.data));
};

export const createUserPost = (post: PostType): ThunkType => async (dispatch) => {
    let postsData = await postAPI.createPost(post);

    if(postsData.resultCode === ResultCodeEnum.Success) {
        await dispatch(getUserPosts());
    }
};

export const deletePost = (postId: number): ThunkType => async (dispatch) => {

};

export default profileReducer;

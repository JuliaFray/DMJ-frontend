import {profileAPI} from '../api/profile-api';
import {PhotoType, PostType, ProfileType} from '../types/types';
import {GenericThunkType, InferActionType} from './redux-store';
import {ResultCodeEnum} from '../api/api-types';
import {stopSubmit} from 'redux-form';
import {Action} from 'redux';
import {UploadFile} from 'antd/es/upload/interface';

type InitialStateType = {
    posts: Array<PostType>,
    newPostText: string,
    profile: ProfileType | null,
    status: string
}

type ActionsType = InferActionType<typeof actions> | Action<typeof stopSubmit>;
type ThunkType = GenericThunkType<ActionsType>;

const initialState: InitialStateType = {
    posts: [
        {id: 1, message: 'My first post', like: 10, dislike: 0},
        {id: 2, message: 'Hi, my new post', like: 20, dislike: 1}
    ],
    newPostText: '',
    profile: null,
    status: ''
};

const profileReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch(action.type) {
        case 'SN/PROFILE/ADD_POST':
            let newPost: PostType = {
                id: state.posts.length + 1,
                message: action.newPostText,
                like: 0,
                dislike: 0
            };
            return {
                ...state,
                posts: [...state.posts, newPost],
            };
        case 'SN/PROFILE/SET_PROFILE':
            return {
                ...state,
                profile: action.profile
            };
        case 'SN/PROFILE/SET_STATUS':
            return {
                ...state,
                status: action.status
            };
        case 'SN/PROFILE/SET_PHOTO':
            return {
                ...state,
            };
        case 'SN/PROFILE/DELETE_POST':
            return {...state, posts: state.posts.filter(p => p.id !== action.postId)};
        default:
            return state;
    }
};

export const actions = {
    addPost: (newPostText: string) => ({type: 'SN/PROFILE/ADD_POST', newPostText} as const),
    setProfile: (profile: ProfileType) => ({type: 'SN/PROFILE/SET_PROFILE', profile} as const),
    setStatus: (status: string) => ({type: 'SN/PROFILE/SET_STATUS', status} as const),
    deletePost: (postId: number) => ({type: 'SN/PROFILE/DELETE_POST', postId} as const),
    updatePhoto: (photos: PhotoType) => ({type: 'SN/PROFILE/SET_PHOTO', photos} as const),
};

export const getUserProfile = (userId: number): ThunkType => async (dispatch) => {
    let profileData = await profileAPI.getProfile(userId);
    dispatch(actions.setProfile(profileData));
};

export const getUserStatus = (userId: number): ThunkType => async (dispatch) => {
    let response = await profileAPI.getStatus(userId);
    dispatch(actions.setStatus(response))
};

export const updateUserStatus = (status: string): ThunkType => async (dispatch) => {
    let data = await profileAPI.updateStatus(status);
    if(data.resultCode === ResultCodeEnum.Success) {
        dispatch(actions.setStatus(status))
    }
};

export const deletePost = (postId: number): ThunkType => async (dispatch) => {

};

export const saveProfilePhoto = (photos: UploadFile): ThunkType => async (dispatch) => {
    let response = await profileAPI.savePhoto(photos);
    if (response.resultCode === ResultCodeEnum.Success) {
        dispatch(actions.updatePhoto(response.data.photos))
    }
};

export const saveUserProfile = (profile: ProfileType): ThunkType => async (dispatch, getState) => {
    const userId = getState().auth.id;
    const data = await profileAPI.saveProfile(profile);

    if(data.resultCode === ResultCodeEnum.Success && userId) {
        dispatch(getUserProfile(userId));
    } else {
        dispatch(stopSubmit('edit-profile', {_error: data.messages[0]}));
        return Promise.reject(data.messages[0])
    }
};

export default profileReducer;

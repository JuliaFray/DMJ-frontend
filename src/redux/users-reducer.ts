import {usersAPI} from '../api/users-api';
import {updateObjectInArray} from '../Utils/Validators/helpers';
import {FilterType, UserType} from '../types/types';
import {Dispatch} from 'redux';
import {GenericThunkType, InferActionType} from './redux-store';
import {GenericResponseType, ResultCodeEnum} from '../api/api-types';

export type InitialStateType = {
    users: Array<UserType>,
    pageSize: number,
    totalUsersCount: number,
    currentPage: number,
    isFetching: boolean,
    followingInProgress: Array<number>,
    userId: number | null,
    filter: FilterType
}
type ActionsType = InferActionType<typeof actions>;
type DispatchType = Dispatch<ActionsType>;
type ThunkType = GenericThunkType<ActionsType>;

let initialState: InitialStateType = {
    users: [],
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: [],
    userId: null,
    filter: {
        term: '',
        friend: null
    }
};

const usersReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch(action.type) {
        case 'SN/USER/FOLLOW_USER':
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId,
                    'id', {followed: true}
                )
            };
        case 'SN/USER/UNFOLLOW_USER':
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId,
                    'id', {followed: false}
                )
            };
        case 'SN/USER/SET_USERS':
            return {...state, users: action.users};
        case 'SN/USER/SET_CURRENT_PAGE':
            return {...state, currentPage: action.currentPage};
        case 'SN/USER/SET_TOTAL_USERS_COUNT':
            return {...state, totalUsersCount: action.totalUsersCount};
        case 'SN/USER/TOGGLE_IS_FETCHING':
            return {...state, isFetching: action.isFetching};
        case 'SN/USER/TOGGLE_IS_FOLLOWING_PROGRESS':
            return {
                ...state,
                followingInProgress: action.followingInProgress
                    ? [...state.followingInProgress, action.userId]
                    : []
            };
        case 'SN/USER/SET_FILTER':
            return {...state, filter: action.payload};
        default:
            return state;
    }
};

export const actions = {
    follow: (userId: number) => ({type: 'SN/USER/FOLLOW_USER', userId} as const),
    unfollow: (userId: number) => ({type: 'SN/USER/UNFOLLOW_USER', userId} as const),
    setUsers: (users: Array<UserType>) => ({type: 'SN/USER/SET_USERS', users} as const),
    setCurrentPage: (currentPage: number) => ({type: 'SN/USER/SET_CURRENT_PAGE', currentPage} as const),
    setTotalUsersCount: (totalUsersCount: number) => ({type: 'SN/USER/SET_TOTAL_USERS_COUNT', totalUsersCount} as const),
    setIsFetching: (isFetching: boolean) => ({type: 'SN/USER/TOGGLE_IS_FETCHING', isFetching} as const),
    toggleIsFollowingProgress: (followingInProgress: Array<number>, userId: number) => ({
        type: 'SN/USER/TOGGLE_IS_FOLLOWING_PROGRESS',
        followingInProgress,
        userId
    } as const),
    setFilter: (filter: FilterType) => ({type: 'SN/USER/SET_FILTER', payload: filter} as const)
};


// thunk creator
export const requestAllUsers = (pageSize: number, currentPage: number, filter: FilterType): ThunkType => async (dispatch, getState) => {
    dispatch(actions.setIsFetching(true));
    dispatch(actions.setCurrentPage(currentPage));
    dispatch(actions.setFilter(filter));
    let usersData = await usersAPI.getUsers(pageSize, currentPage, filter);
    dispatch(actions.setUsers(usersData.items));
    dispatch(actions.setTotalUsersCount(usersData.totalCount));
    dispatch(actions.setIsFetching(false));
};

export const unfollowUser = (userId: number): ThunkType => async (dispatch) => {
    await _followUnfollowFlow(dispatch, userId, usersAPI.unfollowUsers.bind(usersAPI), actions.unfollow);
};

export const followUser = (userId: number): ThunkType => async (dispatch) => {
    await _followUnfollowFlow(dispatch, userId, usersAPI.followUsers.bind(usersAPI), actions.follow);
};

const _followUnfollowFlow = async (
    dispatch: DispatchType, userId: number,
    apiMethod: (userId: number) => Promise<GenericResponseType>,
    actionCreator: (userId: number) => ActionsType
) => {
    dispatch(actions.toggleIsFollowingProgress([], userId));
    let response = await apiMethod(userId);
    if (response.resultCode === ResultCodeEnum.Success) {
        dispatch(actionCreator(userId));
    }
    dispatch(actions.toggleIsFollowingProgress([], userId));
};

export default usersReducer;

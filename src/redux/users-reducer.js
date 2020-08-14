import { usersAPI } from './../API/API';
import { updateObjectInArray } from './../Utils/Validators/helpers';

const FOLLOW_USER = 'FOLLOW-USER';
const UNFOLLOW_USER = 'UNFOLLOW-USER';
const SET_USERS = 'SET-USERS';
const SET_CURRENT_PAGE = 'SET-CURRENT-PAGE';
const SET_TOTAL_USERS_COUNT = 'SET-TOTAL-USERS-COUNT';
const TOGGLE_ISFETCHING = 'TOGGLE-ISFETCHING';
const TOGGLE_ISFOLLOWING_PROGRESS = 'TOGGLE_ISFOLLOWING_PROGRESS';


let initialState = {
    users: [],
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: []
}

const usersReducer = (state = initialState, action) => {

    switch (action.type) {
        case FOLLOW_USER:
            console.log('f');
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userID, 'id', {followed: true})
            }

        case UNFOLLOW_USER:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userID, 'id', {followed: false})
            }

        case SET_USERS:
            return { ...state, users: action.users }

        case SET_CURRENT_PAGE:
            return { ...state, currentPage: action.currentPage }

        case SET_TOTAL_USERS_COUNT:
            return { ...state, totalUsersCount: action.totalUsersCount }

        case TOGGLE_ISFETCHING:
            return { ...state, isFetching: action.isFetching }

        case TOGGLE_ISFOLLOWING_PROGRESS:
            return {
                ...state,
                followingInProgress: action.followingInProgress
                    ? [...state.followingInProgress, action.userId]
                    : []
            }

        default:
            return state;
    }
};
// action creator
export const follow = (userID) => ({ type: FOLLOW_USER, userID });
export const unfollow = (userID) => ({ type: UNFOLLOW_USER, userID });
export const setUsers = (users) => ({ type: SET_USERS, users });
export const setCurrentPage = (currentPage) => ({ type: SET_CURRENT_PAGE, currentPage });
export const setTotalUsersCount = (totalUsersCount) => ({ type: SET_TOTAL_USERS_COUNT, totalUsersCount });
export const setIsFetching = (isFetching) => ({ type: TOGGLE_ISFETCHING, isFetching });
export const toggleIsFollowingProgress = (followingInProgress, userId) => ({ type: TOGGLE_ISFOLLOWING_PROGRESS, followingInProgress, userId });


// thunk creator
export const getUsersThunkCreator = (pageSize, currentPage) => {
    return async (dispatch) => {
        dispatch(setIsFetching(true));
        dispatch(setCurrentPage(currentPage));

        let response = await usersAPI.getUsers(pageSize, currentPage);

        dispatch(setUsers(response.items));
        dispatch(setTotalUsersCount(response.totalCount));
        dispatch(setIsFetching(false));
    }
};

const followUnfollowFlow = async (dispatch, userId, apiMethod,actionCreator) => {

    dispatch(toggleIsFollowingProgress(true, userId));
    let response = await apiMethod(userId);
    // console.log(response)

    if (response.resultCode === 0) {
        dispatch(actionCreator(userId));
    }
    dispatch(toggleIsFollowingProgress(false, userId));
}

export const unfollowUserTC = (userId) => async (dispatch) => {
    followUnfollowFlow(dispatch, userId, usersAPI.unfollowUsers.bind(usersAPI), unfollow);
    // console.log('unfollow', unfollow(userId));
};

export const followUserTC = (userId) => async (dispatch) => {
    followUnfollowFlow(dispatch, userId, usersAPI.followUsers.bind(usersAPI), follow);
};

export default usersReducer;
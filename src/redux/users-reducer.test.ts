import usersReducer, {actions, followUser, InitialStateType, unfollowUser} from './users-reducer';
import {usersAPI} from '../api/users-api';
import {GenericResponseType, ResultCodeEnum} from '../api/api-types';

jest.mock('../api/users-api');
const usersAPIMock = usersAPI as jest.Mocked<typeof usersAPI>;

const dispatch = jest.fn();
const getState = jest.fn();

const result: GenericResponseType = {
    resultCode: ResultCodeEnum.Success,
    messages: [],
    data: {}
};

usersAPIMock.followUsers.mockReturnValue(Promise.resolve(result));
usersAPIMock.unfollowUsers.mockReturnValue(Promise.resolve(result));

let state: InitialStateType;

beforeEach(() => {
    state = {
        users: [
            {
                id: 0, name: 'name1', followed: false, status: 'status1',
                photos: {small: null, large: null}
            },
            {
                id: 1, name: 'name2', followed: false, status: 'status2',
                photos: {small: null, large: null}
            },
            {
                id: 2, name: 'name3', followed: true, status: 'status3',
                photos: {small: null, large: null}
            },
            {
                id: 3, name: 'name4', followed: true, status: 'status4',
                photos: {small: null, large: null}
            }
        ],
        pageSize: 10,
        totalUsersCount: 0,
        currentPage: 1,
        isFetching: false,
        followingInProgress: [],
        userId: null
    };
    dispatch.mockClear();
    getState.mockClear();
    usersAPIMock.followUsers.mockClear();
    usersAPIMock.unfollowUsers.mockClear();
});

test('checkFollowUser', () => {
    const newState = usersReducer(state, actions.follow(1));

    expect(newState.users[0].followed).toBeFalsy();
    expect(newState.users[1].followed).toBeTruthy();

});

test('checkUnfollowUser', () => {
    const newState = usersReducer(state, actions.unfollow(3));

    expect(newState.users[2].followed).toBeTruthy();
    expect(newState.users[3].followed).toBeFalsy();
});

test('checkThunkFollowUser', async () => {
    const thunk = followUser(1);
    await thunk(dispatch, getState, {});

    expect(dispatch).toBeCalledTimes(3);

    expect(dispatch).toHaveBeenNthCalledWith(1, actions.toggleIsFollowingProgress([], 1));
    expect(dispatch).toHaveBeenNthCalledWith(2, actions.follow(1));
    expect(dispatch).toHaveBeenNthCalledWith(3, actions.toggleIsFollowingProgress([], 1));
});

test('checkThunkUnfollowUser', async () => {
    const thunk = unfollowUser(1);
    await thunk(dispatch, getState, {});

    expect(dispatch).toBeCalledTimes(3);

    expect(dispatch).toHaveBeenNthCalledWith(1, actions.toggleIsFollowingProgress([], 1));
    expect(dispatch).toHaveBeenNthCalledWith(2, actions.unfollow(1));
    expect(dispatch).toHaveBeenNthCalledWith(3, actions.toggleIsFollowingProgress([], 1));
});

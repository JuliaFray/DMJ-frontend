import React, {Dispatch, SetStateAction, useEffect} from 'react';
import {CircularProgress, Grid} from '@mui/material';
import {IUser} from '../../../types/types';
import {UserCard} from '../UserCard/UserCard';
import {getAllUsers} from '../../../redux/users/users-thunks';
import {useAppDispatch} from '../../../hook/hooks';
import {useSelector} from 'react-redux';
import {getDataLength, getIsFetching, getUsers} from '../../../redux/users/users-selectors';
import {toggleFollowProfile, createFriendProfile} from '../../../redux/profile/profile-thunks';
import {getAuthId} from '../../../redux/auth/auth-selectors';
import CustomPagination from '../../Common/Pagination/CustomPagination';
import style from './Users.module.scss';
import {useParams} from 'react-router-dom';

type IUsersMain = {
    setCurrentPage: Dispatch<SetStateAction<number>>,
    currentPage: number,
    isFollowers: boolean
}

const UsersMain: React.FC<IUsersMain> = (props, context) => {

    const users = useSelector(getUsers);
    const isFetching = useSelector(getIsFetching);
    const profileId = useSelector(getAuthId);
    const dataLength = useSelector(getDataLength);

    const dispatch = useAppDispatch();

    const params = useParams();

    useEffect(() => {
        dispatch(getAllUsers({
            currentPage: props.currentPage,
            isFollowers: props.isFollowers,
            userId: params.id || profileId
        }));
    }, [dispatch, props.currentPage, props.isFollowers]);

    const toggleFollow = (userId: string, isFollow: boolean) => {
        if(profileId) {
            dispatch(
                toggleFollowProfile({
                        profileId: profileId,
                        query: `?userId=${userId}&isFollow=${isFollow}`
                    }
                )
            );
        }
    };

    const createFriend = (userId: string, isAddFriend: boolean) => {
        if(profileId) {
            dispatch(
                createFriendProfile({
                        profileId: profileId,
                        query: `?userId=${userId}&isAddFriend=${isAddFriend}`
                    }
                )
            );
        }
    };

    return (<div className={style.mainUser}>
            {isFetching
                ? <CircularProgress className={style.pending}/>
                : <>
                    <Grid container sx={{margin: 0}}
                          rowSpacing={{xs: 1, sm: 2, md: 3}}
                          columnSpacing={{xs: 1, sm: 2, md: 3}}
                          style={{marginTop: '20px', marginBottom: '20px'}}>
                        {
                            users.map((u: IUser) => (
                                <Grid item xs={12} key={u._id}>
                                    <UserCard user={u}
                                              key={u._id}
                                              toggleFollow={toggleFollow}
                                              createFriend={createFriend}/>
                                </Grid>
                            ))
                        }
                    </Grid>
                    <CustomPagination page={props.currentPage} dataLength={dataLength} setCurrentPage={props.setCurrentPage}/>
                </>
            }
        </div>
    )
}

export default UsersMain;

import React, {Dispatch, SetStateAction, useEffect} from 'react';
import {Grid} from '@mui/material';
import {TUser} from '~entities/profile';
import {useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import {useAppDispatch} from '~shared/hook/hooks';
import {getAuthId} from '~shared/model/auth/auth-selectors';
import {toggleFollowProfile} from '~shared/model/profile/profile-thunks';
import {getIsFetching, getTotalCount, getUsers} from '~shared/model/users/users-selectors';
import {getAllUsers} from '~shared/model/users/users-thunks';
import CustomPagination from '~shared/ui/Pagination/CustomPagination';
import {v4 as uuidv4} from 'uuid';
import {UserCard} from '~widgets/user-card/UserCard';
import {UserSkeleton} from '~widgets/user-card/UserSkeleton';

type IUsersMain = {
    setCurrentPage: Dispatch<SetStateAction<number>>,
    currentPage: number,
    isFollowers: boolean
}

const UsersMain: React.FC<IUsersMain> = (props, context) => {

    const users = useSelector(getUsers);
    const isFetching = useSelector(getIsFetching);
    const profileId = useSelector(getAuthId);
    const dataLength = useSelector(getTotalCount);

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
                        query: `?userId=${userId}&isFollow=${isFollow}`,
                        userId: userId
                    }
                )
            );
        }
    };

    return (
        <div style={{position: 'relative'}}>
            <Grid container sx={{margin: 0}}
                  rowSpacing={{xs: 2, sm: 2, md: 2}}
                  style={{marginTop: '20px', marginBottom: '100px'}}>
                {isFetching
                    ? [...Array(5)].map(() => <Grid item xs={12} key={uuidv4()}><UserSkeleton/></Grid>)
                    : users.map((u: TUser) => (
                        <Grid item xs={12} key={u._id}>
                            <UserCard user={u}
                                      key={u._id}
                                      toggleFollow={toggleFollow}/>
                        </Grid>
                    ))
                }
            </Grid>
            <CustomPagination page={props.currentPage} dataLength={dataLength} setCurrentPage={props.setCurrentPage}/>
        </div>
    )
}

export default UsersMain;
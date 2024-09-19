import React, {Dispatch, SetStateAction, useEffect} from 'react';
import {Grid} from '@mui/material';
import {TUser} from 'entities/profile';
import {useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import {useLazyGetAllUsersQuery} from "shared/api/users-api";
import {useAppDispatch} from 'shared/hook/hooks';
import {getAuthId} from 'shared/model/auth/auth-selectors';
import {toggleFollowProfile} from 'shared/model/profile/profile-thunks';
import {getIsFetching, getTotalCount, getUsers} from 'shared/model/users/users-selectors';
import {CustomPagination} from 'shared/ui/pagination';
import {v4 as uuidv4} from 'uuid';
import {UserRowSkeleton} from 'widgets/user-row/user-row.skeleton';
import {UserRow} from 'widgets/user-row/user-row.ui';

type IUsersMain = {
    setCurrentPage: Dispatch<SetStateAction<number>>,
    currentPage: number,
    isFollowers: boolean
}

const UsersFeed: React.FC<IUsersMain> = (props, context) => {

    const users = useSelector(getUsers);
    const isFetching = useSelector(getIsFetching);
    const profileId = useSelector(getAuthId);


    const dispatch = useAppDispatch();

    const params = useParams();
    
    const [triggerGetAllUsers] = useLazyGetAllUsersQuery();

    useEffect(() => {
        triggerGetAllUsers({
            currentPage: props.currentPage,
            isFollowers: props.isFollowers,
            userId: params.id || profileId
        });
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
        <div style={{position: 'relative', margin: 0, padding: 0}}>

            <Grid container sx={{margin: 0, padding: 0}}
                  rowSpacing={{xs: 1, sm: 2, md: 3}}
                  columnSpacing={{xs: 1, sm: 2, md: 3}}
                  style={{marginBottom: '30px'}}>
                {isFetching
                    ? [...Array(5)].map(() => <Grid item xs={6} key={uuidv4()}><UserRowSkeleton/></Grid>)
                    : users.map((u: TUser) => (
                        <Grid item xs={6} key={u._id}>
                            <UserRow user={u}
                                     key={u._id}
                                     toggleFollow={toggleFollow}/>
                        </Grid>
                    ))
                }
            </Grid>

        </div>
    )
}

export default UsersFeed;

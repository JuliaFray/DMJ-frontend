import React, {Dispatch, SetStateAction, useEffect} from 'react';
import {CircularProgress, Grid} from '@mui/material';
import {IUser} from '../../../types/types';
import {UserCard} from '../UserCard/UserCard';
import {getAllUsers} from '../../../redux/users/users-thunks';
import {useAppDispatch} from '../../../hook/hooks';
import {useSelector} from 'react-redux';
import {getDataLength, getIsFetching, getUsers} from '../../../redux/users/users-selectors';
import {toggleFollowProfile} from '../../../redux/profile/profile-thunks';
import {getAuthId} from '../../../redux/auth/auth-selectors';
import CustomPagination from '../../Common/Pagination/CustomPagination';

type IUsersMain = {
    setCurrentPage: Dispatch<SetStateAction<number>>,
    currentPage: number
}

const UsersMain: React.FC<IUsersMain> = (props, context) => {

    const users = useSelector(getUsers);
    const isFetching = useSelector(getIsFetching);
    const profileId = useSelector(getAuthId);
    const dataLength = useSelector(getDataLength);

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getAllUsers({currentPage: props.currentPage}));
    }, []);

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

    return (<>
            {isFetching
                ? <CircularProgress/>
                : <div>
                    <Grid container rowSpacing={2} columnSpacing={{xs: 1, sm: 2, md: 3}}
                          sx={{margin: 0}} style={{marginTop: "20px"}}>
                        {
                            users.map((u: IUser) => (
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
            }
        </>
    )
}

export default UsersMain;

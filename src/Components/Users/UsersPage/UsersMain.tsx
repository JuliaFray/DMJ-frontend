import React, {useCallback, useEffect} from 'react';
import {CircularProgress, Grid} from '@mui/material';
import {IUser} from '../../../types/types';
import {UserCard} from '../UserCard/UserCard';
import {getAllUsers} from '../../../redux/users/users-thunks';
import useWebSocket, {useAppDispatch} from '../../../hook/hooks';
import {useSelector} from 'react-redux';
import {getCurrentPage, getIsFetching, getPageSize, getTotalUsersCount, getUsers, getUsersFilter} from '../../../redux/users/users-selectors';
import {toggleFollowProfile} from '../../../redux/profile/profile-thunks';
import {getAuthId} from '../../../redux/auth/auth-selectors';
import {Events} from '../../../Utils/DictConstants';
import {appActions} from '../../../redux/app/app-slice';

type QueryParamsType = { term?: string, page?: string, friend?: string };

const UsersMain: React.FC = (props, context) => {

    const totalCount = useSelector(getTotalUsersCount);
    const pageSize = useSelector(getPageSize);
    const currentPage = useSelector(getCurrentPage);

    const filter = useSelector(getUsersFilter);

    const users = useSelector(getUsers);

    const isFetching = useSelector(getIsFetching);
    const profileId = useSelector(getAuthId);

    const dispatch = useAppDispatch();

    useEffect(() => {
        const parsedSearch = {
            page: 0,
            term: '',
            friend: ''
        }

        let actualPage: number = !!parsedSearch.page ? +parsedSearch.page : currentPage;
        let actualFilter = !!parsedSearch.term ? {...filter, term: parsedSearch.term} : filter;
        actualFilter = !!parsedSearch.friend
            ? {
                ...actualFilter,
                friend: parsedSearch.friend === 'null'
                    ? null
                    : parsedSearch.friend === 'false'
                        ? false
                        : true
            }
            : actualFilter;
        dispatch(getAllUsers({pageSize, currentPage: actualPage, filter: actualFilter}));
    }, []);

    // useEffect(() => {
    //     const query: QueryParamsType = {};
    //     if(!!filter.term) query.term = filter.term;
    //     if(filter.friend !== null) query.friend = String(filter.friend);
    //     if(currentPage !== 1) query.page = currentPage.toString();
    // }, [filter, currentPage]);

    // const onPageChanged = (pageNumber: number) => {
    //     requestUsers(pageSize, pageNumber, filter);
    // };
    //
    // const requestUsers = (pageSize: number, pageNumber: number, filter: IFilter) => {
    //     dispatch(getAllUsers({pageSize, currentPage: pageNumber, filter}))
    // };
    //
    // const onFilterChanged = (filter: IFilter) => {
    //     dispatch(getAllUsers({pageSize, currentPage: 1, filter}))
    // };

    // let pagesCount = Math.ceil(totalCount / pageSize);
    // let pages = [];
    // for(let i = 1; i <= pagesCount; i++) {
    //     pages.push(i)
    // }

    const toggleFollow = (userId: string, isFollow: boolean) => {
        if(profileId) {
            dispatch(toggleFollowProfile({profileId: profileId, query: `?userId=${userId}&isFollow=${isFollow}`}));
        }
    };


    return (<>
            {isFetching
                ? <CircularProgress/>
                : <Grid container rowSpacing={2} columnSpacing={{xs: 1, sm: 2, md: 3}}
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
                </Grid>}

            {/*{pages.length > 1 &&*/}
            {/*    <Pagination style={{position: 'absolute', marginTop: 20, bottom: 0}} page={currentPage} count={totalCount} variant="outlined"/>}*/}
        </>
    )
}

export default UsersMain;

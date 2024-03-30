import React, {useEffect} from 'react';
import {IFilter, IUser} from "../../types/types";
import {useSelector} from 'react-redux';
import {
    getCurrentPage,
    getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getTotalUsersCount,
    getUsers,
    getUsersFilter
} from '../../redux/users/users-selectors';
import {followUser, getAllUsers, unfollowUser} from '../../redux/users/users-thunks';
import {useAppDispatch} from '../../hook/hooks';
import {compose} from 'redux';
import withAuthRedirect from '../HOC/withAuthRedirect';
import {CircularProgress, Grid, Pagination} from '@mui/material';
import {UserCard} from './UserCard/UserCard';

type QueryParamsType = { term?: string, page?: string, friend?: string };

const UsersPage: React.FC = React.memo(() => {

    const totalUsersCount = useSelector(getTotalUsersCount);
    const pageSize = useSelector(getPageSize);
    const currentPage = useSelector(getCurrentPage);
    const filter = useSelector(getUsersFilter);
    const users = useSelector(getUsers);
    const followingInProgress = useSelector(getFollowingInProgress);
    const isFetching = useSelector(getIsFetching);

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

    useEffect(() => {
        const query: QueryParamsType = {};
        if(!!filter.term) query.term = filter.term;
        if(filter.friend !== null) query.friend = String(filter.friend);
        if(currentPage !== 1) query.page = currentPage.toString();
    }, [filter, currentPage]);

    const onPageChanged = (pageNumber: number) => {
        requestUsers(pageSize, pageNumber, filter);
    };

    const requestUsers = (pageSize: number, pageNumber: number, filter: IFilter) => {
        dispatch(getAllUsers({pageSize, currentPage: pageNumber, filter}))
    };

    const onFilterChanged = (filter: IFilter) => {
        dispatch(getAllUsers({pageSize, currentPage: 1, filter}))
    };

    const follow = (userId: string) => {
        dispatch(followUser({userId}))
    };

    const unfollow = (userId: string) => {
        dispatch(unfollowUser({userId}))
    };

    let pagesCount = Math.ceil(totalUsersCount / pageSize);
    let pages = [];
    for(let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    return (
        <>
            <Grid container spacing={3}>
                <Grid item xs={3}>filter</Grid>

                <Grid item xs={9}>
                    {isFetching
                        ? <CircularProgress/>
                        : <Grid container rowSpacing={2} columnSpacing={{xs: 1, sm: 2, md: 3}}
                                sx={{margin: 0}} style={{marginTop: "20px"}}>
                            {
                                users && users.map((u: IUser) => (
                                    <Grid item xs={4} key={u._id}>
                                        <UserCard user={u}
                                                  key={u._id}
                                                  unfollow={unfollow}
                                                  follow={follow}/>
                                    </Grid>
                                ))
                            }
                        </Grid>}


                </Grid>


            </Grid>
            <Pagination page={currentPage} count={totalUsersCount} variant="outlined"/>
        </>
    )
});

export default compose<React.ComponentType>(withAuthRedirect)(UsersPage);

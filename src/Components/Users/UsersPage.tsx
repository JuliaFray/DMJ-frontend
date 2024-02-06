import React, {useEffect} from 'react';
import Paginator from '../Paginator/Paginator';
import User from './User';
import StyleSheet from './Users.module.css';
import {FilterType, UserType} from "../../types/types";
import SearchForm from './Search/Search';
import {useDispatch, useSelector} from 'react-redux';
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
import Preloader from '../Common/Preloader/Preloader';
import {useParams} from 'react-router-dom';
import {useAppDispatch} from '../../hook/hooks';
import {compose} from 'redux';
import withAuthRedirect from '../HOC/withAuthRedirect';
// import {parse, stringify} from 'querystring';

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
    const history: any = useParams();

    console.log(users)

    useEffect(() => {
        // const parsedSearch = parse(history.location.search.substring(1)) as QueryParamsType;
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

        // history.push({
        //     pathname: '/users',
        //     search: query
        // });
    }, [filter, currentPage]);

    const onPageChanged = (pageNumber: number) => {
        requestUsers(pageSize, pageNumber, filter);
    };

    const requestUsers = (pageSize: number, pageNumber: number, filter: FilterType) => {
        dispatch(getAllUsers({pageSize, currentPage: pageNumber, filter}))
    };

    const onFilterChanged = (filter: FilterType) => {
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
        <div>
            {isFetching ? <Preloader/> : null}
            <div className={StyleSheet.search}>
                <SearchForm onSubmit={onFilterChanged} isFetching={isFetching}/>
            </div>
            <div className={StyleSheet.cards}>
                {
                    users && users.map((u: UserType) => <User user={u}
                                                     key={u._id}
                                                     followingInProgress={followingInProgress}
                                                     unfollow={unfollow}
                                                     follow={follow}/>)
                }
            </div>
            <Paginator currentPage={currentPage} onPageChanged={onPageChanged}
                       totalItemsCount={totalUsersCount} pageSize={pageSize}/>
        </div>
    )
});

export default compose<React.ComponentType>(withAuthRedirect)(UsersPage);

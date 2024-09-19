import React, {useState} from 'react';
import {Grid} from "@mui/material";
import {connect, useSelector} from "react-redux";
import {compose} from "redux";
import {RootState} from 'shared/model/redux-store';
import UsersFeed from 'widgets/users-feed/users-feed.ui';
import {CustomPagination} from "shared";
import {getTotalCount} from "shared/model/users/users-selectors";

export type IUsersPage = {
    isMainPage: boolean,
    isFollowers: boolean
}

const UsersPage: React.FC<IUsersPage> = React.memo((props, context) => {

    const mdMain = props.isMainPage ? 9 : 12

    const [currentPage, setCurrentPage] = useState(1);
    const dataLength = useSelector(getTotalCount);

    return (
        <Grid container spacing={2} width={'100%'} sx={{margin: 0, padding: 0}}>
            <Grid item md={mdMain} width={'100%'} sx={{margin: 0, padding: 0}}>
                <UsersFeed
                    isFollowers={props.isFollowers}
                    currentPage={currentPage} setCurrentPage={setCurrentPage}
                />
                <CustomPagination page={currentPage} dataLength={dataLength} setCurrentPage={setCurrentPage}/>
            </Grid>
        </Grid>
    )
});

const mapStateToProps = (state: RootState) => ({
    isMainPage: true,
    isFollowers: false
});

const GenericUsersPage = compose<React.ComponentType & IUsersPage>(connect(mapStateToProps))(UsersPage);
export {UsersPage, GenericUsersPage};

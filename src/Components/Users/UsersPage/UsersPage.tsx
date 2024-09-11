import React, {useState} from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {RootState} from '../../../redux/redux-store';
import PageLayout from '../../Common/PageLayout/PageLayout';
import withAuthRedirect from '../../HOC/withAuthRedirect';
import UsersMain from './UsersMain';

export type IUsersPage = {
    isMainPage: boolean,
    isFollowers: boolean
}

const UsersPage: React.FC<IUsersPage> = React.memo((props, context) => {
    const [currentPage, setCurrentPage] = useState(1);
    return (
        <PageLayout isMainPage={props.isMainPage}
                    mainChildren={<UsersMain
                        isFollowers={props.isFollowers}
                        currentPage={currentPage} setCurrentPage={setCurrentPage}
                    />}/>
    )
});

const mapStateToProps = (state: RootState) => ({
    isMainPage: true,
    isFollowers: false
});

export {UsersPage};

export default compose<React.ComponentType & IUsersPage>(connect(mapStateToProps), withAuthRedirect)(UsersPage);

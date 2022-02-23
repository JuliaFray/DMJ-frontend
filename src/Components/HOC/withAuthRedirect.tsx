import React from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {AppStateType} from '../../redux/redux-store';

type MapStateType = {
    isAuth: boolean
}

let mapStateToPropsForRedirect = (state: AppStateType) => ({
    isAuth: state.auth.isAuth
});

function withAuthRedirect<T>(Component: React.ComponentType<T>) {
    const RedirectComponent: React.FC<MapStateType> = (props) => {
        let {isAuth, ...restProps} = props;
        if(!isAuth) {
            return <Redirect to={'/login'}/>
        }
        return <Component {...restProps as T} />
    };

    return connect<MapStateType, {}, T, AppStateType>(mapStateToPropsForRedirect)(RedirectComponent);
}

export default withAuthRedirect;

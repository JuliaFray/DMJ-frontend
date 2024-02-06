import React from 'react';
import {Navigate} from 'react-router-dom';
import {connect} from 'react-redux';
import {RootState} from '../../redux/redux-store';

type MapStateType = {
    isAuth: boolean
}

type MapDispatchProps = {}

let mapStateToPropsForRedirect = (state: RootState) => ({
    isAuth: state.auth.isAuth
});

type HocProps = MapStateType & MapDispatchProps;

function withAuthRedirect<T extends HocProps>(Component: React.ComponentType<T>) {
    const RedirectComponent: React.FC<MapStateType> = (props) => {

        let {isAuth, ...restProps} = props;
        if(!isAuth || !window.localStorage.getItem('token')) {
            return <Navigate to={'/login'}/>
        }
        return <Component {...restProps as T} />
    };

    return connect<MapStateType, {}, T, RootState>(mapStateToPropsForRedirect)(RedirectComponent);
}


export default withAuthRedirect;

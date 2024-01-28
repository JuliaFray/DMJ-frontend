import React from 'react';
import {Navigate} from 'react-router-dom';
import {connect} from 'react-redux';
import {RootState} from '../../redux/redux-store';
import {JSX} from 'react/jsx-runtime';
import IntrinsicAttributes = JSX.IntrinsicAttributes;

type MapStateType = {
    isAuth: boolean
}

let mapStateToPropsForRedirect = (state: RootState) => ({
    isAuth: state.auth.isAuth
});

function withAuthRedirect<T extends IntrinsicAttributes>(Component: React.ComponentType<T>) {
    const RedirectComponent: React.FC<MapStateType> = (props) => {
        let {isAuth, ...restProps} = props;
        if(!isAuth) {
            return <Navigate to={'/login'}/>
        }
        return <Component {...restProps as T} />
    };

    return connect<MapStateType, {}, T, RootState>(mapStateToPropsForRedirect)(RedirectComponent);
}

export default withAuthRedirect;

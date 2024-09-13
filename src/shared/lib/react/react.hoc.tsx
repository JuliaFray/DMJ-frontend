// import React from 'react';
// import IntrinsicAttributes = React.JSX.IntrinsicAttributes;
//
// export function reactHoc<T extends IntrinsicAttributes>(Component: React.ComponentType<T>) {
//     return (props: T) => {
//         return <React.Suspense fallback={<div>loading...</div>}>
//             <Component {...props} />
//         </React.Suspense>
//     }
// }


import React, {
    SuspenseProps,
    Suspense,
    forwardRef,
    ComponentType,
    ForwardedRef,
    createElement,
} from 'react'
import {RootState} from "~shared/model/redux-store";
import {Navigate} from "react-router-dom";
import {connect} from "react-redux";

export function withSuspense<Props extends object>(
    component: ComponentType<Props>,
    suspenseProps: SuspenseProps & {
        FallbackComponent?: ComponentType
    },
) {
    const Wrapped = forwardRef<ComponentType<Props>, Props>(
        (props: Props, ref: ForwardedRef<ComponentType<Props>>) =>
            createElement(
                Suspense,
                {
                    fallback:
                        suspenseProps.fallback ||
                        (suspenseProps.FallbackComponent &&
                            createElement(suspenseProps.FallbackComponent)),
                },
                createElement(component, { ...props, ref }),
            ),
    )

    const name = component.displayName || component.name || 'Unknown'
    Wrapped.displayName = `withSuspense(${name})`

    return Wrapped
}

type MapStateType = {
    isAuth: boolean
}

type MapDispatchProps = {}

let mapStateToPropsForRedirect = (state: RootState) => ({
    isAuth: state.auth.isAuth
});

type HocProps = MapStateType & MapDispatchProps;

export function withAuthRedirect<T extends HocProps>(Component: React.ComponentType<T>) {
    const RedirectComponent: React.FC<MapStateType> = (props) => {

        let {isAuth, ...restProps} = props;
        if(!isAuth && !window.localStorage.getItem('token')) {
            return <Navigate to={'/login'}/>
        }
        return <Component {...restProps as T}/>
    };

    return connect<MapStateType, {}, T, RootState>(mapStateToPropsForRedirect)(RedirectComponent);
}

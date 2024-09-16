import React, {ComponentType, createElement, ForwardedRef, forwardRef, Suspense, SuspenseProps,} from 'react'
import {connect, useSelector} from "react-redux";
import {Navigate} from "react-router-dom";
import {getIsAuth} from "shared/model/auth/auth-selectors";
import {RootState} from "shared/model/redux-store";

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
                createElement(component, {...props, ref}),
            ),
    )

    const name = component.displayName || component.name || 'Unknown'
    Wrapped.displayName = `withSuspense(${name})`

    return Wrapped
}

export function withAuthRedirect<T extends {}>(Component: React.ComponentType<T>) {
    const RedirectComponent: React.FC = (props) => {
        const isAuth = useSelector(getIsAuth);
        let {...restProps} = props;
        if(!isAuth && !window.localStorage.getItem('token')) {
            return <Navigate to={'/login'}/>
        }
        return <Component {...restProps as T}/>
    };

    return connect<{}, {}, T, RootState>((state: RootState) => ({}))(RedirectComponent);
}

import React, {
  ComponentType,
  createElement,
  ForwardedRef,
  forwardRef,
  Suspense,
  SuspenseProps,
} from 'react';

import { connect, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { getIsAuth, RootState } from '../../model';

export function withSuspense<Props extends object>(
  component: ComponentType<Props>,
  suspenseProps: SuspenseProps & {
    FallbackComponent?: ComponentType;
  },
) {
  const Wrapped = forwardRef<ComponentType<Props>, Props>(
    (props: Props, ref: ForwardedRef<ComponentType<Props>>) =>
      createElement(
        Suspense,
        {
          fallback:
            suspenseProps.fallback ||
            (suspenseProps.FallbackComponent && createElement(suspenseProps.FallbackComponent)),
        },
        createElement(component, { ...props, ref }),
      ),
  );

  const name = component.displayName || component.name || 'Unknown';
  Wrapped.displayName = `withSuspense(${name})`;

  return Wrapped;
}

export function withAuthRedirect<T extends NonNullable<unknown>>(
  Component: React.ComponentType<T>,
) {
  const RedirectComponent: React.FC = (props) => {
    const isAuth = useSelector(getIsAuth);
    const { ...restProps } = props;
    if (!isAuth && !window.localStorage.getItem('token')) {
      return <Navigate to='/login' />;
    }
    return <Component {...(restProps as T)} />;
  };

  return connect<NonNullable<unknown>, NonNullable<unknown>, T, RootState>(
    (state: RootState) => ({}),
  )(RedirectComponent);
}

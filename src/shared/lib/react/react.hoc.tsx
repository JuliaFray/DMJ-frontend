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


import {
    SuspenseProps,
    Suspense,
    forwardRef,
    ComponentType,
    ForwardedRef,
    createElement,
} from 'react'

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

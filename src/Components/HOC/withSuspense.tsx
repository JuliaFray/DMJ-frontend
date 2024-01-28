import React from 'react';
import IntrinsicAttributes = React.JSX.IntrinsicAttributes;

export function withSuspense<T extends IntrinsicAttributes>(Component: React.ComponentType<T>) {
    return (props: T) => {
        return <React.Suspense fallback={<div>loading...</div>}>
            <Component {...props} />
        </React.Suspense>
    }
}

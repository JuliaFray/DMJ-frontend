import React from 'react';

export function withSuspense<T>(Component: React.ComponentType<T>) {
    return (props: T) => {
        return <React.Suspense fallback={<div>loading...</div>}>
            <Component {...props} />
        </React.Suspense>
    }
}

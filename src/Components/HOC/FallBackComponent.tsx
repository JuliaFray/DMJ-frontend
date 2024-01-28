import React from 'react';

type Props = {
    error: {
        message: string
    },
    resetErrorBoundary: () => void
}

function MyFallbackComponent(props: Props) {
    return (
        <div role="alert">
            <p>Something went wrong:</p>
            <pre>{props.error.message}</pre>
            <button onClick={props.resetErrorBoundary}>Try again</button>
        </div>
    )
}

export default MyFallbackComponent;

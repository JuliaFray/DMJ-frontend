import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query';

export const authApi2 = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({baseUrl: 'auth'}),
    endpoints: (build) => ({
        checkAuth: build.query({
            query: () => ({
                url: '/auth/status'
            })
        })
    })
})

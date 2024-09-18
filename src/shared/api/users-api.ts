import {BaseQueryFn, createApi, EndpointBuilder, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {UsersResponseType} from "shared/api/api-types";

const baseUrl = 'users';
export const usersApi = createApi({
    reducerPath: 'usersApi',
    baseQuery: fetchBaseQuery({
        baseUrl,
        prepareHeaders: async (headers) => {
            const token = window.localStorage.getItem('token');
            if (token) {
                headers.set('Authorization', token)
            }
            return headers;
        }
    }),
    endpoints: (build: EndpointBuilder<BaseQueryFn, string, string>) => ({
        getAllUsers: build.query<UsersResponseType, { currentPage: number, isFollowers: boolean, userId: string }>({
            query: ({currentPage, isFollowers, userId}) => {
                const searchParams = new URLSearchParams();
                searchParams.append('currentPage', currentPage.toString());
                if(isFollowers) {
                    searchParams.append('isFollowers', isFollowers + '');
                }
                if(userId) {
                    searchParams.append('userId', userId);
                }

                return {
                    url: `?${(searchParams.size ? searchParams.toString() : '')}`,
                    method: 'GET',
                }
            },
            transformResponse: (response: { data: any }, meta, arg) => response.data,
        }),
    })
});

export const {useLazyGetAllUsersQuery} = usersApi;

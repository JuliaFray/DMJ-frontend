import {BaseQueryFn, createApi, EndpointBuilder, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {UsersResponseType} from "shared/api/api-types";
import customFetchBase from "shared/api/custom-fetch-base";

const baseUrl = 'users';
export const usersApi = createApi({
    reducerPath: 'usersApi',
    baseQuery: customFetchBase,
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
                    url: `${baseUrl}?${(searchParams.size ? searchParams.toString() : '')}`,
                    method: 'GET',
                }
            },
        }),
    })
});

export const {useLazyGetAllUsersQuery} = usersApi;

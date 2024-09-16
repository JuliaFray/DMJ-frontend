import {BaseQueryFn, createApi, EndpointBuilder, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import {BASE_URL} from "shared/api/api";

export const usdaApi = createApi({
    reducerPath: 'usdaApi',
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
        prepareHeaders: async (headers) => {
            return headers;
        }
    }),
    endpoints: (build: EndpointBuilder<BaseQueryFn, string, string>) => ({
        getFood: build.mutation<any, any>({
            query: () => ({
                url: `search-food`,
                method: 'POST',
                body: {}
            }),
            transformResponse: (response: { data: any }, meta, arg) => response.data,
        }),
    })
});

export const {useGetFoodMutation, middleware} = usdaApi;

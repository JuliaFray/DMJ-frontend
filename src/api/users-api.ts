import {GenericResponseType, UsersResponseType} from './api-types';
import instance from './api';
import {FilterType} from '../types/types';

export const usersAPI = {
    getUsers(pageSize = 10, currentPage = 1, filter: FilterType) {
        let url: string = `users?count=${pageSize}&page=${currentPage}`;
        url = filter.term.trim().length === 0 ? url : url + `&term=${filter.term}`;
        url = filter.friend === null ? url : url + `&friend=${filter.friend}`;
        return instance
            .get<UsersResponseType>(url)
            .then(response => {
                return response.data
            })
    },

    followUsers(userId: number) {
        return instance
            .post<GenericResponseType>(`follow/${userId}`)
            .then(response => {
                return response.data
            })
    },

    unfollowUsers(userId: number) {
        return instance
            .delete<GenericResponseType>(`follow/${userId}`)
            .then(response => {
                return response.data
            })
    }
};

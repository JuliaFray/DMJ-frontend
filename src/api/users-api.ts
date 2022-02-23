import {GenericResponseType, UsersResponseType} from './api-types';
import {instance} from './api';

export const usersAPI = {
    getUsers(pageSize = 10, currentPage = 1) {
        return instance
            .get<UsersResponseType>(`users?count=${pageSize = 10}&page=${currentPage}`)
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

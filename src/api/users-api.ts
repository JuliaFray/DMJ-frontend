import {GenericResponseType, UsersResponseType} from './api-types';
import instance from './api';
import {IFilter} from '../types/types';

const baseUrl = 'users';
export const usersAPI = {
    getUsers(currentPage = 1, filter: IFilter | null) {
        return instance
            .get<UsersResponseType>(`${baseUrl}?currentPage=${currentPage}`)
            .then(response => {
                return response.data
            })
    },
};

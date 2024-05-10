import {UsersResponseType} from './api-types';
import instance from './api';
import {IFilter} from '../types/types';

const baseUrl = 'users';
export const usersAPI = {
    getUsers(currentPage = 1, isFollowers: boolean, isFriends: boolean, filter: IFilter | null, userId?: string) {
        let query = `?currentPage=${currentPage}`;
        if(isFollowers) {
            query += `&isFollowers=${isFollowers}`
        }
        if(isFriends) {
            query += `&isFriends=${isFriends}`
        }
        if(userId) {
            query += `&userId=${userId}`
        }
        return instance
            .get<UsersResponseType>(`${baseUrl}${query}`)
            .then(response => {
                return response.data
            })
    },
};

import {TUser} from 'entities/profile';
import instance from './api';
import {GenericResponseType} from './api-types';

export const authAPI = {
    checkStatus() {
        return instance
            .get<GenericResponseType<TUser>>(`auth/status`)
            .then(response => {
                return response.data
            })
    }
};

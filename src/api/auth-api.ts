import {IUser} from '../types/types';
import instance from './api';
import {GenericResponseType} from './api-types';

export const authAPI = {
    checkStatus() {
        return instance
            .get<GenericResponseType<IUser>>(`auth/status`)
            .then(response => {
                return response.data
            })
    }
};

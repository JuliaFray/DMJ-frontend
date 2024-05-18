import {GenericResponseType} from './api-types';
import instance from './api';
import {IUser} from '../types/types';

export const authAPI = {
    checkStatus() {
        return instance
            .get<GenericResponseType<IUser>>(`auth/status`)
            .then(response => {
                return response.data
            })
    }
};

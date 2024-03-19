import {GenericResponseType} from './api-types';
import instance from './api';

export const authAPI = {
    checkStatus() {
        return instance
            .get<GenericResponseType<string>>(`auth/status`)
            .then(response => {
                return response.data
            })
    }
};

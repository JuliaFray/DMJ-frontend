import {GenericResponseType, MeResponseType} from "./api-types";
import {instance} from "./api";

export const authAPI = {
    me() {
        return instance
            .get<GenericResponseType<MeResponseType>>(`auth/me`)
            .then(response => {
                return response.data
            })
    }
};

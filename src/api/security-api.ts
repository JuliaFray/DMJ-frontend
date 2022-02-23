import {CaptchaResponseType} from "./api-types";
import {instance} from "./api";

export const securityAPI = {
    getCaptchaUrl() {
        return instance
            .get<CaptchaResponseType>(`security/get-captcha-url`)
            .then(response => {
                return response.data
            })
    }
};

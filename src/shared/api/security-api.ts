import { instance } from './api';
import { CaptchaResponseType } from './api-types';

export const securityAPI = {
  getCaptchaUrl() {
    return instance.get<CaptchaResponseType>(`security/get-captcha-url`).then((response) => {
      return response.data;
    });
  },
};

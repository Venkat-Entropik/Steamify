import { apiInstance } from "../interceptor";
import type {
  loginPayloadType,
  onBoardingType,
  signUpPayloadType,
} from "../types/streamify.types";
import { Constants } from "../utils/constants";

class authServices {
  getCurrentUser() {
    return apiInstance.get(Constants.GET_CURRENT_USER);
  }

  signUp(payload: signUpPayloadType) {
    return apiInstance.post(Constants.SIGN_UP, payload);
  }

  login(payload: loginPayloadType) {
    return apiInstance.post(Constants.LOGIN, payload);
  }

  logout() {
    return apiInstance.post(Constants.LOGOUT);
  }

  onBoarding(payload: onBoardingType) {
    return apiInstance.post(Constants.ONBOARDING, payload);
  }
}

export default new authServices();

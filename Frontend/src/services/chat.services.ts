import { apiInstance } from "../interceptor";
import { Constants } from "../utils/constants";

class chatServices {
  getChatToken() {
    return apiInstance.get(Constants.CHAT_TOKEN);
  }
}

export default new chatServices();

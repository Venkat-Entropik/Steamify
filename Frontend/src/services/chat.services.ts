import { apiInstance } from "../interceptor";
import type { sendMessages } from "../types/streamify.types";
import { Constants } from "../utils/constants";

class chatServices {
  getChatToken() {
    return apiInstance.get(Constants.CHAT_TOKEN);
  }

  getChatByUserId(id: string) {
    return apiInstance.get(`${Constants.GET_MESSAGES_BY_USER_ID}/${id}`);
  }

  sendMessages(payload: sendMessages) {
    return apiInstance.post(
      `${Constants.SEND_MESSAGE}/${payload.id}`,
      payload,
    );
  }
}

export default new chatServices();

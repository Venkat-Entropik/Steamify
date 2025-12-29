import { apiInstance } from "../interceptor";
import { Constants } from "../utils/constants";

class userServices {
  getRecommendedUsers() {
    return apiInstance.get(Constants.GET_RECOMMENDED_USERS);
  }

  getFriends() {
    return apiInstance.get(Constants.GET_FRIENDS);
  }

  sendFriendRequest(userId: string) {
    return apiInstance.post(`${Constants.SEND_FRIEND_REQUEST}/${userId}`);
  }

  acceptFriendRequest(userId: string) {
    return apiInstance.post(
      `${Constants.SEND_FRIEND_REQUEST}/${userId}/accept`
    );
  }

  getFriendRequest() {
    return apiInstance.get(Constants.GET_FRIEND_REQUEST);
  }

  getOutGoingFriendRequest() {
    return apiInstance.get(Constants.GET_OUTGOING_FRIEND_REQUEST);
  }
}

export default new userServices();

import express from "express";
import { protectedRoute } from "../middleware/auth.middleware.js";
import {
  acceptFriendRequest,
  getFriendRequests,
  getMyFriends,
  getOutgoingFriendRequest,
  getRecomendedUsers,
  sendFriendRequest,
} from "../controllers/user.controller.js";

const router = express.Router();

router.use(protectedRoute);

router.get("/get-recommended-users", getRecomendedUsers);
router.get("/friends", getMyFriends);

router.post("/friends-request/:id", sendFriendRequest);
router.put("/friends-request/:id/accept", acceptFriendRequest);

router.get("/friend-request", getFriendRequests);
router.get("/outgoing-friend-requests", getOutgoingFriendRequest);

export default router;

import express from "express"
import { protectedRoute } from "../middleware/auth.middleware.js";
import {
    acceptFriendRequest,
    getFriendRequests,
    getMyFriends,
    getOutgoingReqs,
    getRecommendedUser,
    sendFriendRequest
} from "../Controller/user.controller.js";

const router = express.Router();

router.use(protectedRoute)

router.get("/", getRecommendedUser);
router.get("/friends", getMyFriends);


router.post("/friend-request/:id", sendFriendRequest);
router.put("/friend-request/:id/accept", acceptFriendRequest);

router.get("/friend-request", getFriendRequests);
router.get("/outgoing-friend-request", getOutgoingReqs);



export default router;
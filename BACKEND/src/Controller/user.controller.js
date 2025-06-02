import FriendRequest from "../Models/friendRequest.js";
import User from "../Models/User.js";

export async function getRecommendedUser(req, res) {

    try {
        const currentUserId = req.user._id;
        const currentUser = req.user;

        const recommendedUsers = await User.find({
            $and: [
                { _id: { $ne: currentUserId } }, // exclude the current user
                { _id: { $nin: currentUser.friends } },//exclude all the friend
                { isOnboarded: true }
            ]
        })
        res.status(200).json(recommendedUsers)
    } catch (error) {
        console.log("error in the get recommended controller", error)
        res.status(500).json({ mesasage: "Internal server error" })
    }
}
export async function getMyFriends(req, res) {

    try {
        const user = await User.findById(req.user._id)
            .select("friends")
            .populate(
                "friends",
                "fullname profilePic nativelanguage"
            )

        res.status(200).json(user.friends)
    } catch (error) {
        console.log("get the  error in the get friend controller", error)
        res.status(501).json({ message: "internal server error" })
    }
}

export async function sendFriendRequest(req, res) {
    try {
        const myId = req.user._id;
        const { id: recipientId } = req.params;

        console.log('Logged-in user:', myId);
        console.log('Recipient user:', recipientId);

        //prevent sending request  to yourself
        if (myId === recipientId) {
            return res.status(400).json({ mesasage: 'you can not send the request to yourself' })
        }


        //check about the recipient
        const recipient = await User.findById(recipientId);
        if (!recipient) {
            return res.status(404).json({ message: "the recipient does'nt exist" })
        }

        //check the user is already a  friend
        if (recipient.friends.includes(myId)) {
            return res.status(400).json({ message: "you are already a friend" })
        }

        //check a friend request already exist
        const existingRequest = await FriendRequest.findOne({
            $or: [
                { sender: myId, recipient: recipientId },
                { sender: recipientId, recipient: myId }
            ]
        })
        if (existingRequest) {
            return res.status(400).json({ message: 'a friend  request was already sent' })
        }

        const friendRequest = await FriendRequest.create({
            sender: myId,
            recipient: recipientId
        })
        return res.status(201).json(friendRequest);

    } catch (error) {
        console.log("getting the error on the send friend request controller", error);
        return res.status(500).json({ message: 'internal server error' });
    }
}

export async function acceptFriendRequest(req, res) {
    try {
        const { id: requestId } = req.params;

        const friendRequest = await FriendRequest.findById(requestId);

        if (!friendRequest) {
            return res.status(404).json({ message: 'friend request not found' })
        }

        //check if the recipient is valid 

        if (friendRequest.recipient.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "your are not authorizedd to accept the request" })
        }

        friendRequest.status = "accepted";
        await friendRequest.save();

        //adding the id in each other friends array

        await User.findByIdAndUpdate(friendRequest.sender, {
            $addToSet: { friends: friendRequest.recipient },
        })

        await User.findByIdAndUpdate(friendRequest.recipient, {
            $addToSet: { friends: friendRequest.sender },
        })

        return res.status(200).json({ message: 'friend request accepted' })

    } catch (error) {
        console.log("there is an error in the accept friend request controller", error)
        return res.status(500).json({ message: 'internal server error' })
    }
}

export async function getFriendRequests(req, res) {
    try {
        const incomingRequest = await FriendRequest.find({
            recipient: req.user._id,
            status: "pending"
        }).populate("sender", "fullname nativelanguage location profilePic")

        const acceptRequest = await FriendRequest.find({
            sender: req.user._id,
            status: "accepted"
        }).populate("recipient", "fullname profilePic")

        res.status(200).json({incomingRequest, acceptRequest})
    } catch (error) {
        console.log("error in the getfriend request controller", error);
        res.status(500).json({ message: "internal server error" })
    }

}

export async function getOutgoingReqs(req, res) {
    try {
        const outgoingReq = await FriendRequest.find({
            sender: req.user._id,
            status: "pending",
        }).populate("recipient", "fullname profilePic loacation nativelanguage")

        res.status(200).json(outgoingReq);
    } catch (error) {
        console.log("error while handling the getoutgoingreqs", error);
    }
}
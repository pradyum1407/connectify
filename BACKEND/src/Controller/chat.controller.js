import User from "../Models/User.js"
import Message from "../Models/chat.js";
import FriendRequest from "../Models/friendRequest.js";
import cloudinary from "../Lib/cloudinary.js"

export async function getMessage(req, res) {
    try {
        const myId = req.user._id;
        const { id: userToChatId } = req.params;

        if (myId.toString() === userToChatId) {
            return res.status(400).json({ message: "You cannot view messages with yourself." });
        }

        const areFriends = await FriendRequest.findOne({
            $or: [
                { sender: myId, recipient: userToChatId, status: "accepted" },
                { sender: userToChatId, recipient: myId, status: "accepted" },
            ],
        });

        if (!areFriends) {
            return res.status(403).json({ message: "You can only view messages with friends." });
        }



        const messages = await Message.find({
            $or: [
                { senderId: myId, receiverId: userToChatId },
                { senderId: userToChatId, receiverId: myId },
            ]
        })
        res.status(200).json(messages)

    } catch (error) {
        console.log("error handling the getmessage controller", error)
        res.status(500).json({ messga: "internal server error" })
    }


}


export async function sendMessage(req, res) {
    try {
        const { text, image } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        if (senderId.toString() === receiverId) {
            return res.status(400).json({ message: "You cannot message yourself." });
        }

        const areFriends = await FriendRequest.findOne({
            $or: [
                { sender: senderId, recipient: receiverId, status: "accepted" },
                { sender: receiverId, recipient: senderId, status: "accepted" },
            ],
        });

        if (!areFriends) {
            return res.status(403).json({ message: "You can only message your friends." });
        }


        let imageurl;
        if (image) {
            const uploadResponse = await cloudinary.uploader.upload(image)
            imageurl = uploadResponse.secure_url;
        }

        const newMessage = await Message.create({
            senderId,
            receiverId,
            text,
            image: imageurl,
        })

        await newMessage.save()
        res.status(201).json(newMessage)

        //need to add the functionality of the socket.io

    } catch (error) {
        console.log("error in the send message controller", error);
        res.status(500).json({ message: "internal server error" })

    }
}
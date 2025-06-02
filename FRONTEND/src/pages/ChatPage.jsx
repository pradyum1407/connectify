import {useQuery, useQueryClient } from "@tanstack/react-query"
import { useParams } from "react-router"
import { getMessages, getUserFriends} from "../lib/api";
import useAuthUser from "../hooks/useAuthUser";
import Chatheader from "../components/Chatheader";
import { useRef } from "react";
import { formatMessageTime } from "../lib/utils"
import MessageSkeleton from "../components/skeleton/MessageSkeleton"
import MessageInput from "../components/MessageInput";


const ChatPage = () => {

  const { id } = useParams();
  const { authUser } = useAuthUser()
  const messagEndRef = useRef(null)

  

  const { data: friends = [], isLoading: loadingFriends } = useQuery({
    queryKey: ["friends"],
    queryFn: getUserFriends
  })

  const selectedUser = friends.find(friend => friend._id === id);


  const { data: messages = [], isLoading: isMessageLoading } = useQuery({
    queryKey: ["messages", id],
    queryFn: () => getMessages(id),
    enabled: !!id
  })


  return (
    <>
      <div className="h-screen w-full p-4 sm:p-4 md:p-8 bg-base-200" >
        <div className="h-full max-h-full w-full max-w-6xl mx-auto border border-primary/25 rounded-xl shadow-lg bg-base-100 flex flex-col">
          {/* Header */}

          {selectedUser && (
            <div className="p-4">
              <Chatheader selectedUser={selectedUser} />
            </div>
          )}

          {/* ismessageLoading */}
          {isMessageLoading ? (
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              <MessageSkeleton />
            </div>

          ):(
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message._id}
                className={`chat ${message.senderId === authUser?._id ? "chat-end" : "chat-start"}`}
                ref={messagEndRef}
              >
                <div className=" chat-image avatar">
                  <div className="size-10 rounded-full border">
                    <img
                      src={
                        message.senderId === authUser._id
                          ? authUser.profilePic
                          : selectedUser.profilePic
                      }
                      alt="profile pic"
                    />
                  </div>
                </div>

                <div className="chat-header mb-1">
                  <time className="text-xs opacity-50 ml-1">
                    {formatMessageTime(message.createdAt)}
                  </time>
                </div>

                <div className="chat-bubble flex flex-col">
                  {message.image && (
                    <img
                    src={message.image}
                    alt="Attachment"
                    className="sm:max-w-[200px] rounded-md mb-2"
                    />
                  )}
                  {message.text && <p>{message.text}</p>}
                </div>
              </div>
            ))
            }
          </div>
          )}
          <MessageInput />
        </div>
      </div>
    </>
  );
};


export default ChatPage
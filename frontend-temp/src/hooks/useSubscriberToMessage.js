import { useEffect } from "react";
import {useQueryClient} from "@tanstack/react-query"


const useSubscriberToMessage=(socket,selectedUserId)=>{
const queryClient=useQueryClient()

useEffect(()=>{

if(!socket || !selectedUserId)return;

    
    const handleMessage=(newMessage)=>{
    if(newMessage.senderId !== selectedUserId)return
    
    queryClient.setQueryData(["messages",selectedUserId],(old=[])=>[
        ...old,
        newMessage,
    ]);    
    }
    
    socket.on("newMessage",handleMessage)

    return () =>{
        socket.off("newMessage",handleMessage)
    }
    
    
},[socket,selectedUserId,queryClient])
}
export default  useSubscriberToMessage
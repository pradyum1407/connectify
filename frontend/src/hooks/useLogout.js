import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Logout } from "../lib/api";
import { useSocketStore } from "../store/useSocketStore"

const useLogout =()=>{
  const {disconnectSocket}=useSocketStore();
const queryClient= useQueryClient()

  const {mutate , isPending}= useMutation({
    mutationFn:Logout,
    onSuccess:()=>{
    queryClient.invalidateQueries(["authuser"]),
    disconnectSocket();
    }
  })
return {isPending , logoutMutation:mutate}
}

export default useLogout;
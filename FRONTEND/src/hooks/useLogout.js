import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Logout } from "../lib/api";


const useLogout =()=>{
const queryClient= useQueryClient()

  const {mutate , ispending}= useMutation({
    mutationFn:Logout,
    onSuccess:()=>{
    queryClient.invalidateQueries(["authuser"])
    }
  })
return {ispending , logoutMutation:mutate}
}

export default useLogout;
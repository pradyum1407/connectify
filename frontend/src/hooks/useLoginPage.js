import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Login } from "../lib/api";
import { useSocketStore } from "../store/useSocketStore";



const useLoginPage =()=>{
  const queryClient = useQueryClient();
  const {connectSocket} = useSocketStore();

  const { mutate, isLoading, error } = useMutation({
    mutationFn: Login,
    onSuccess: (data) => {
      queryClient.invalidateQueries(["authuser"]);
      connectSocket(data.user._id)
    },
  });

  return {isLoading,error , loginMutation:mutate}
}
export default useLoginPage;
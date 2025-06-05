import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Login } from "../lib/api";
import connectSocket from "../lib/utils";


const useLoginPage =()=>{
     const queryClient = useQueryClient();

  const { mutate, isLoading, error } = useMutation({
    mutationFn: Login,
    onSuccess: (data) => {
      queryClient.invalidateQueries(["authuser"]);
      connectSocket(data.user._id);
    },
  });

  return {isLoading,error , loginMutation:mutate}
}
export default useLoginPage;
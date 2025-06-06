import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signUp } from "../lib/api";
import { useSocketStore } from "../store/useSocketStore"



const useSignUpPage=()=>{
  
  const { connectSocket } = useSocketStore();
 const queryClient = useQueryClient();
  const { mutate, isPending, error } = useMutation({
    mutationFn: signUp,
    onSuccess: (data) => {
      queryClient.invalidateQueries(["authuser"]);
      connectSocket(data.user._id)
    },
    onError: (err) => {
      console.error("Signup failed", err);
    }
  })

  return {isPending,error,signUpMutation:mutate}
}
export default useSignUpPage;
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signUp } from "../lib/api";

const useSignUpPage=()=>{
 const queryClient = useQueryClient();
  const { mutate, isPending, error } = useMutation({
    mutationFn: signUp,
    onSuccess: () => {
      queryClient.invalidateQueries(["authuser"])
    },
    onError: (err) => {
      console.error("Signup failed", err);
    }
  })

  return {isPending,error,signUpMutation:mutate}
}
export default useSignUpPage;
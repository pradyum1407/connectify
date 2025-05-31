import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Login } from "../lib/api";

const useLoginPage =()=>{
     const queryClient = useQueryClient();

  const { mutate, isLoading, error } = useMutation({
    mutationFn: Login,
    onSuccess: () => {
      queryClient.invalidateQueries(["authuser"]);
    },
  });

  return {isLoading,error , loginMutation:mutate}
}
export default useLoginPage;
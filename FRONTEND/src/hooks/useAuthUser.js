import { useQuery } from "@tanstack/react-query"
import { getAuthUser } from "../lib/api"
import connectSocket from "../lib/utils"



const useAuthUser = () => {
 const authUser = useQuery({
    queryKey: ["authuser"],
    queryFn: getAuthUser,
    retry:false ,
    onSuccess:(data)=>{
      console.log("✅ onSuccess triggered", data);
      if(data?.user){
        connectSocket(data.user)
      }
    },
    onError: (err) => {
    console.error("Auth user fetch error", err);
  }
  })
  return {isLoading:authUser.isLoading , authUser:authUser.data?.user};
  }

export default useAuthUser
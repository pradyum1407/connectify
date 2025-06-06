import { useQuery } from "@tanstack/react-query"
import { getAuthUser } from "../lib/api"
import { useSocketStore } from "../store/useSocketStore";


const useAuthUser = () => {
  const {connectSocket}=useSocketStore()
  const authUser = useQuery({
    queryKey: ["authuser"],
    queryFn: getAuthUser,
    retry: false,
    onsuccess:(data)=>{
  connectSocket(data.user)
    }
  })
  return { isLoading: authUser.isLoading, authUser: authUser.data?.user };
}

export default useAuthUser
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { acceptFriendReqs, getfriendRequest } from "../lib/api";
import { UserCheckIcon } from "lucide-react";

const NotificationPage = () => {

  const queryclient = useQueryClient();

  const { data: friendRequest, isloading } = useQuery({
    queryKey: ["friendRequest"],
    queryFn: getfriendRequest
  })

  const { mutate: acceptReqsMutation, ispending } = useMutation({
    mutationFn: acceptFriendReqs,
    onSuccess: () => {
      queryclient.invalidateQueries(["friendRequest"]),
        queryclient.invalidateQueries(["friends"])
    }
  })

  const incomingRequest = friendRequest?.incomingRequest || []
  const acceptedRequest = friendRequest?.acceptRequest || []

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto max-w-4xl space-y-8">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-6">Notification</h1>

        {isloading ? (
          <div className="flex justify-center py-12">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        ) : (
          <>
            {incomingRequest.length > 0 && (
              <section className="space-y-4">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <UserCheckIcon className="h-5 w-5 text-primary" />
                  Friends Requests
                  <span className="badge badge-primary ml-2">{incomingRequest.length}</span> 
                </h2>

              </section>
            )}

          </>
        )}



      </div>
    </div>
  )
}

export default NotificationPage
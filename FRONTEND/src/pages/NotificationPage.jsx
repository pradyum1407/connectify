import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { acceptFriendReqs, getfriendRequest } from "../lib/api";
import { BellIcon, ClockIcon, MessageSquareIcon, UserCheckIcon } from "lucide-react";
import NoNotificationsFound from "../components/NoNotificationFound"

const NotificationPage = () => {
  const queryClient = useQueryClient();

  const { data: friendRequest, isLoading } = useQuery({
    queryKey: ["friendRequest"],
    queryFn: getfriendRequest,
  });

  const { mutate: acceptReqsMutation, isPending } = useMutation({
    mutationFn: acceptFriendReqs,
    onSuccess: () => {
      queryClient.invalidateQueries(["friendRequest"]);
      queryClient.invalidateQueries(["friends"]);
    },
  });

  const incomingRequest = friendRequest?.incomingRequest || [];
  const acceptedRequest = friendRequest?.acceptRequest || [];

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto max-w-4xl space-y-8">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-6">Notification</h1>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        ) : (
          <>
            {incomingRequest.length > 0 && (
              <section className="space-y-4">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <UserCheckIcon className="h-5 w-5 text-primary" />
                  Friend Requests
                  <span className="badge badge-primary ml-2">{incomingRequest.length}</span>
                </h2>

                <div className="space-y-3">
                  {incomingRequest.map((request) => (
                    <div
                      key={request._id}
                      className="card bg-base-200 shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="card-body p-4">
                        <div className="flex items-center justify-between flex-wrap gap-4">
                          <div className="flex items-center gap-3">
                            <div className="avatar w-14 h-14 rounded-full bg-base-300">
                              <img
                                src={request.sender.profilePic || "/default-avatar.png"}
                                alt={request.sender.fullname}
                                onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.src = "/default-avatar.png";
                                }}
                              />
                            </div>
                            <div>
                              <h3 className="font-semibold">{request.sender.fullname}</h3>
                              <div className="flex flex-wrap gap-1.5 mt-1">
                                <span className="badge badge-secondary badge-sm">
                                  Native: {request.sender.nativelanguage}
                                </span>
                                {request.sender.learninglanguage && (
                                  <span className="badge badge-outline badge-sm">
                                    Learning: {request.sender.learninglanguage}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>

                          <button
                            className="btn btn-primary btn-sm"
                            onClick={() => acceptReqsMutation(request._id)}
                            disabled={isPending}
                          >
                            Accept
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {acceptedRequest.length > 0 && (
              <section className="space-y-4">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <BellIcon className="h-5 w-5 text-success" />
                  New Connections
                </h2>

                <div className="space-y-3">
                  {acceptedRequest.map((notification) => (
                    <div key={notification._id} className="card bg-base-200 shadow-sm">
                      <div className="card-body p-4">
                        <div className="flex items-start gap-3">
                          <div className="avatar mt-1 size-10 rounded-full">
                            <img
                              src={notification.recipient.profilePic || "/default-avatar.png"}
                              alt={notification.recipient.fullname}
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "/default-avatar.png";
                              }}
                            />
                          </div>
                          <div className="flex-1">
                            <h2 className="font-semibold">{notification.recipient.fullname}</h2>
                            <p className="text-sm my-1">
                              {notification.recipient.fullname} accepted your friend request
                            </p>
                            <p className="text-xs flex items-center opacity-70">
                              <ClockIcon className="h-3 w-3 mr-1" />
                              Recently
                            </p>
                          </div>
                          <div className="badge badge-success">
                            <MessageSquareIcon className="h-3 w-3 mr-1" />
                            New Friend
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {incomingRequest.length === 0 && acceptedRequest.length === 0 && (
              <NoNotificationsFound />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default NotificationPage;

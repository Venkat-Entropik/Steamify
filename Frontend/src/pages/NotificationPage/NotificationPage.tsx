import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  BellIcon,
  MessageSquareIcon,
  UserCheckIcon,
  Sparkles,
  ArrowRight,
  ChevronRight
} from "lucide-react";
import usersServices from "../../services/users.services";
import NoNotificationsFound from "../../Components/NoNotificationsFound/NoNotificationsFound";
import type { acceptedReqsType, inComingReqsType } from "../../types/streamify.types";
import { getLanguageFlag } from "../../Components/FriendCard/FriendCard";

const NotificationsPage = () => {
  const queryClient = useQueryClient();

  const { data: friendRequests, isLoading } = useQuery({
    queryKey: ["friendRequests"],
    queryFn: usersServices.getFriendRequest,
    retry: false,
  });

  const { mutate: acceptRequestMutation, isPending } = useMutation({
    mutationFn: usersServices.acceptFriendRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["friendRequests"] });
      queryClient.invalidateQueries({ queryKey: ["friends"] });
    },
  });

  const incomingRequests: inComingReqsType[] =
    friendRequests?.data?.incomingReqs || [];
  const acceptedRequests: acceptedReqsType[] =
    friendRequests?.data?.acceptedReqs || [];

  return (
    <div className="min-h-screen bg-base-100 pb-20">
      <div className="container mx-auto max-w-5xl px-4 sm:px-8 py-10">
        
        {/* HEADER */}
        <div className="flex items-center gap-4 mb-12 animate-in fade-in slide-in-from-left duration-700">
          <div className="size-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shadow-inner">
            <BellIcon className="size-8" />
          </div>
          <div>
            <h1 className="text-4xl font-black tracking-tight">Notifications</h1>
            <p className="text-base-content/60">Manage your connections and new requests.</p>
          </div>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-32 space-y-4">
            <span className="loading loading-spinner loading-lg text-primary"></span>
            <p className="text-base-content/40 font-medium animate-pulse">Syncing your updates...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            
            {/* LEFT COLUMN - INCOMING REQUESTS */}
            <div className="lg:col-span-2 space-y-8">
              <section className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold flex items-center gap-3">
                    <UserCheckIcon className="size-6 text-primary" />
                    Pending Requests
                    <span className="badge badge-primary badge-md ml-1 font-bold">
                      {incomingRequests.length}
                    </span>
                  </h2>
                </div>

                {incomingRequests.length > 0 ? (
                  <div className="space-y-4">
                    {incomingRequests.map((request: inComingReqsType) => (
                      <div
                        key={request._id}
                        className="group relative animate-in fade-in slide-in-from-bottom-4 duration-500"
                      >
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-secondary rounded-3xl blur opacity-0 group-hover:opacity-10 transition duration-500"></div>
                        <div className="relative card bg-base-100 border border-base-200 shadow-sm hover:shadow-xl transition-all duration-300 rounded-3xl overflow-hidden">
                          <div className="card-body p-6">
                            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                              <div className="flex items-center gap-5 w-full">
                                <div className="avatar size-20 ring-4 ring-base-200 ring-offset-2 ring-offset-base-100 rounded-full">
                                  <img src={request.sender.profilePic} alt={request.sender.fullName} className="rounded-full" />
                                </div>
                                <div className="flex-1 overflow-hidden">
                                  <h3 className="text-xl font-bold truncate">
                                    {request.sender.fullName}
                                  </h3>
                                  <div className="flex flex-wrap gap-2 mt-2">
                                    <div className="badge badge-primary badge-outline badge-sm gap-1 py-3 px-2">
                                      {getLanguageFlag(request.sender.nativeLanguage)}
                                      <span className="font-bold">{request.sender.nativeLanguage}</span>
                                    </div>
                                    <div className="badge badge-ghost badge-sm gap-1 py-3 px-2 bg-base-200">
                                      {getLanguageFlag(request.sender.learningLanguage)}
                                      <span className="font-bold">{request.sender.learningLanguage}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="flex items-center gap-2 w-full sm:w-auto">
                                <button
                                  className="btn btn-primary flex-1 sm:flex-none px-8 rounded-2xl shadow-lg shadow-primary/20 gap-2 h-12"
                                  onClick={() => acceptRequestMutation(request._id)}
                                  disabled={isPending}
                                >
                                  {isPending ? <span className="loading loading-spinner"></span> : "Accept"}
                                  <ArrowRight className="size-4" />
                                </button>
                                <button className="btn btn-ghost btn-square rounded-2xl h-12 w-12 border border-base-200">
                                  <ChevronRight className="size-5 opacity-40" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                   <div className="card bg-base-200/50 border-2 border-dashed border-base-300 p-12 text-center rounded-[2.5rem]">
                      <p className="text-base-content/40 font-medium">No pending friend requests.</p>
                   </div>
                )}
              </section>
            </div>

            {/* RIGHT COLUMN - NEW CONNECTIONS */}
            <div className="space-y-8">
              <section className="space-y-6">
                <h2 className="text-2xl font-bold flex items-center gap-3">
                  <Sparkles className="size-6 text-success" />
                  Recent Matches
                </h2>

                {acceptedRequests.length > 0 ? (
                  <div className="space-y-4">
                    {acceptedRequests.map((notification: acceptedReqsType) => (
                      <div
                        key={notification._id}
                        className="card bg-base-100 border border-base-200 shadow-sm hover:shadow-md transition-all rounded-3xl overflow-hidden animate-in fade-in slide-in-from-right-4 duration-500"
                      >
                        <div className="card-body p-5">
                          <div className="flex items-start gap-4">
                            <div className="avatar size-12 ring-2 ring-success/20 ring-offset-1 rounded-full">
                              <img src={notification.recipient.profilePic} alt={notification.recipient.fullName} className="rounded-full" />
                            </div>
                            <div className="flex-1 space-y-1">
                              <h3 className="font-bold">
                                {notification.recipient.fullName}
                              </h3>
                              <p className="text-sm text-base-content/60 leading-snug">
                                accepted your request. Start chatting!
                              </p>
                              <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-success mt-2 bg-success/10 w-fit px-2 py-0.5 rounded-full">
                                <MessageSquareIcon className="size-3" />
                                Connected
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="card bg-base-200/30 p-8 text-center rounded-[2.5rem] border border-base-200">
                     <p className="text-sm text-base-content/40 italic">No recent matches found.</p>
                  </div>
                )}
              </section>
            </div>

            {incomingRequests.length === 0 && acceptedRequests.length === 0 && (
              <div className="lg:col-span-3">
                <NoNotificationsFound />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
export default NotificationsPage;

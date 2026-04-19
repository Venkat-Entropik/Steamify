import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import usersServices from "../../services/users.services";
import { Link } from "react-router";
import {
  CheckCircleIcon,
  MapPinIcon,
  UserPlusIcon,
  UsersIcon,
  Sparkles,
  Search,
  ArrowRight
} from "lucide-react";

import { capitialize } from "../../utils/utils";

import FriendCard, {
  getLanguageFlag,
} from "../../Components/FriendCard/FriendCard";
import NoFriendsFound from "../../Components/NoFriendsFound/NoFriendsFound";
import type { UserType } from "../../types/streamify.types";

const HomePage = () => {
  const queryClient = useQueryClient();

  const { data: friends, isLoading: loadingFriends } = useQuery({
    queryKey: ["friends"],
    queryFn: usersServices.getFriends,
  });

  const { data: recommendedUsers, isLoading: loadingUsers } = useQuery({
    queryKey: ["users"],
    queryFn: usersServices.getRecommendedUsers,
  });

  const recommendationsList: UserType[] = recommendedUsers?.data || [];
  const friendsList: UserType[] = friends?.data || [];

  const { data: outgoingFriendReqs } = useQuery({
    queryKey: ["outgoingFriendReqs"],
    queryFn: usersServices.getOutGoingFriendRequest,
  });

  const outgoingRequestsIds = useMemo(() => {
    const ids = new Set<string>();
    const reqs = outgoingFriendReqs?.data;
    if (reqs && reqs.length > 0) {
      reqs.forEach((req: { recipient: { _id: string } }) => {
        ids.add(req.recipient._id);
      });
    }
    return ids;
  }, [outgoingFriendReqs]);

  const { mutate: sendRequestMutation, isPending } = useMutation({
    mutationFn: usersServices.sendFriendRequest,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["outgoingFriendReqs"] }),
  });

  return (
    <div className="min-h-screen bg-base-100 pb-20">
      {/* HERO / FRIENDS SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-base-100 to-secondary/5 pt-10 pb-16 px-4 sm:px-8">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-end justify-between gap-6 mb-12">
            <div className="space-y-2">
              <h1 className="text-4xl md:text-5xl font-black tracking-tight">Your Connections</h1>
              <p className="text-base-content/60 text-lg">Practice with your language partners and make progress together.</p>
            </div>
            <Link to="/notifications" className="btn btn-primary btn-md gap-2 rounded-2xl shadow-lg shadow-primary/20">
              <UsersIcon className="size-5" />
              Notifications
            </Link>
          </div>

          {loadingFriends ? (
            <div className="flex justify-center py-20">
              <span className="loading loading-spinner loading-lg text-primary" />
            </div>
          ) : friendsList?.length === 0 ? (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
              <NoFriendsFound />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
              {friendsList?.map((friend) => (
                <FriendCard key={friend._id} friend={friend} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* DISCOVER SECTION */}
      <section className="container mx-auto px-4 sm:px-8 mt-16">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10">
          <div className="flex items-center gap-4">
            <div className="size-14 rounded-2xl bg-secondary/10 flex items-center justify-center">
              <Sparkles className="size-8 text-secondary" />
            </div>
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Meet New Learners</h2>
              <p className="text-base-content/60">AI-powered recommendations based on your goals.</p>
            </div>
          </div>
          
          <div className="relative w-full max-w-xs">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-base-content/30" />
            <input 
              type="text" 
              placeholder="Search by language..." 
              className="input input-bordered w-full pl-12 rounded-2xl bg-base-200/50 border-base-300 focus:bg-base-100 transition-all"
            />
          </div>
        </div>

        {loadingUsers ? (
          <div className="flex justify-center py-20">
            <span className="loading loading-spinner loading-lg text-secondary" />
          </div>
        ) : recommendationsList?.length === 0 ? (
          <div className="card bg-base-200/50 border-2 border-dashed border-base-300 p-12 text-center rounded-[2rem]">
            <h3 className="font-bold text-xl mb-2">Expanding the community...</h3>
            <p className="text-base-content/60 max-w-xs mx-auto">
              We're finding more partners for you. Check back soon for fresh recommendations!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recommendationsList?.map((user: UserType) => {
              const hasRequestBeenSent = outgoingRequestsIds.has(user._id);

              return (
                <div
                  key={user._id}
                  className="group relative"
                >
                  <div className="absolute -inset-1 bg-gradient-to-r from-secondary to-primary rounded-[2.5rem] blur opacity-0 group-hover:opacity-10 transition duration-500"></div>
                  <div className="relative card bg-base-100 border border-base-200 shadow-sm hover:shadow-2xl transition-all duration-500 rounded-[2rem] overflow-hidden">
                    <div className="card-body p-8 space-y-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-5">
                          <div className="avatar size-20 ring-4 ring-base-200 ring-offset-2 ring-offset-base-100 rounded-full">
                            <img src={user.profilePic} alt={user.fullName} className="rounded-full" />
                          </div>
                          <div>
                            <h3 className="font-bold text-2xl tracking-tight">
                              {user.fullName}
                            </h3>
                            {user.location && (
                              <div className="flex items-center text-sm opacity-60 mt-1">
                                <MapPinIcon className="size-4 mr-1 text-primary" />
                                {user.location}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="badge badge-secondary badge-outline font-bold">New</div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <div className="badge bg-primary/5 border-primary/20 text-primary py-4 px-3 gap-2">
                          {getLanguageFlag(user.nativeLanguage)}
                          <span className="font-bold">{capitialize(user.nativeLanguage)}</span>
                        </div>
                        <div className="badge bg-secondary/5 border-secondary/20 text-secondary py-4 px-3 gap-2">
                          {getLanguageFlag(user.learningLanguage)}
                          <span className="font-bold">{capitialize(user.learningLanguage)}</span>
                        </div>
                      </div>

                      {user.bio && (
                        <p className="text-base-content/70 leading-relaxed line-clamp-2 italic">
                          "{user.bio}"
                        </p>
                      )}

                      <button
                        className={`btn w-full h-14 rounded-2xl text-lg gap-2 group/btn ${
                          hasRequestBeenSent 
                            ? "btn-ghost bg-success/10 text-success border-success/20 pointer-events-none" 
                            : "btn-primary shadow-xl shadow-primary/20"
                        }`}
                        onClick={() => sendRequestMutation(user._id)}
                        disabled={hasRequestBeenSent || isPending}
                      >
                        {hasRequestBeenSent ? (
                          <>
                            <CheckCircleIcon className="size-6" />
                            Connected!
                          </>
                        ) : (
                          <>
                            <UserPlusIcon className="size-5" />
                            Connect Now
                            <ArrowRight className="size-5 group-hover/btn:translate-x-1 transition-transform" />
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
};

export default HomePage;

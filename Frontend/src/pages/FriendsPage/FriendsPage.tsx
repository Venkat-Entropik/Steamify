import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import usersServices from "../../services/users.services";
import {
  Search,
  Users,
  Globe,
  UserPlus,
  CheckCircle,
  MapPin,
  Loader2,
} from "lucide-react";
import FriendCard, { getLanguageFlag } from "../../Components/FriendCard/FriendCard";
import NoFriendsFound from "../../Components/NoFriendsFound/NoFriendsFound";
import type { UserType } from "../../types/streamify.types";
import { capitialize } from "../../utils/utils";
import { useTranslation } from "react-i18next";

const FriendsPage = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState<"my-friends" | "discover">("my-friends");
  const [searchQuery, setSearchQuery] = useState("");

  const { data: friends, isLoading: loadingFriends } = useQuery({
    queryKey: ["friends"],
    queryFn: usersServices.getFriends,
  });

  const { data: recommendedUsers, isLoading: loadingUsers } = useQuery({
    queryKey: ["users"],
    queryFn: usersServices.getRecommendedUsers,
  });

  const { data: outgoingFriendReqs } = useQuery({
    queryKey: ["outgoingFriendReqs"],
    queryFn: usersServices.getOutGoingFriendRequest,
  });

  const { mutate: sendRequestMutation, isPending: isSendingRequest } = useMutation({
    mutationFn: usersServices.sendFriendRequest,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["outgoingFriendReqs"] }),
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

  const friendsList = useMemo(() => {
    const list: UserType[] = friends?.data || [];
    if (!searchQuery) return list;
    return list.filter((f) =>
      f.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.nativeLanguage.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.learningLanguage.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [friends, searchQuery]);

  const recommendationsList = useMemo(() => {
    const list: UserType[] = recommendedUsers?.data || [];
    if (!searchQuery) return list;
    return list.filter((u) =>
      u.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.nativeLanguage.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.learningLanguage.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [recommendedUsers, searchQuery]);

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{t('friends.community')}</h1>
          <p className="text-base-content/70">{t('friends.communitySubtitle')}</p>
        </div>

        <div className="relative w-full md:w-80 group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-base-content/40 group-focus-within:text-primary transition-colors" />
          <input
            type="text"
            placeholder={t('friends.searchPlaceholder')}
            className="input input-bordered w-full pl-10 bg-base-200 focus:bg-base-100 transition-all"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* TABS */}
      <div className="tabs tabs-boxed bg-base-200 p-1 w-fit">
        <button
          className={`tab gap-2 px-6 h-10 transition-all ${activeTab === "my-friends" ? "tab-active !bg-primary !text-primary-content shadow-sm" : "hover:bg-base-300"}`}
          onClick={() => setActiveTab("my-friends")}
        >
          <Users className="size-4" />
          {t('friends.myFriends')}
          {friends?.data?.length > 0 && (
            <span className={`badge badge-sm ${activeTab === "my-friends" ? "badge-ghost bg-primary-content/20 border-none" : "badge-outline opacity-50"}`}>
              {friends?.data.length}
            </span>
          )}
        </button>
        <button
          className={`tab gap-2 px-6 h-10 transition-all ${activeTab === "discover" ? "tab-active !bg-primary !text-primary-content shadow-sm" : "hover:bg-base-300"}`}
          onClick={() => setActiveTab("discover")}
        >
          <Globe className="size-4" />
          {t('friends.discover')}
        </button>
      </div>

      <div className="min-h-[400px]">
        {activeTab === "my-friends" ? (
          loadingFriends ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <Loader2 className="size-10 text-primary animate-spin" />
              <p className="text-base-content/50 animate-pulse">{t('friends.loadingFriends')}</p>
            </div>
          ) : friendsList.length === 0 ? (
            searchQuery ? (
              <div className="text-center py-20 bg-base-200 rounded-3xl border-2 border-dashed border-base-300">
                <p className="text-lg font-medium">{t('friends.noFriendsMatch', { query: searchQuery })}</p>
                <button onClick={() => setSearchQuery("")} className="btn btn-link no-underline">{t('friends.clearSearch')}</button>
              </div>
            ) : (
              <NoFriendsFound />
            )
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {friendsList.map((friend) => (
                <FriendCard key={friend._id} friend={friend} />
              ))}
            </div>
          )
        ) : (
          /* DISCOVER TAB */
          loadingUsers ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <Loader2 className="size-10 text-primary animate-spin" />
              <p className="text-base-content/50 animate-pulse">{t('friends.loadingPartners')}</p>
            </div>
          ) : recommendationsList.length === 0 ? (
            <div className="card bg-base-200 p-12 text-center border-2 border-dashed border-base-300 rounded-3xl">
              <Globe className="size-12 mx-auto text-base-content/20 mb-4" />
              <h3 className="font-semibold text-xl mb-2">
                {searchQuery ? t('friends.noPartnersMatch', { query: searchQuery }) : t('friends.noRecommendations')}
              </h3>
              <p className="text-base-content/60 max-w-xs mx-auto">
                {t('friends.checkBackLater')}
              </p>
              {searchQuery && (
                <button onClick={() => setSearchQuery("")} className="btn btn-outline btn-sm mt-4">{t('friends.clearSearch')}</button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendationsList.map((user) => {
                const hasRequestBeenSent = outgoingRequestsIds.has(user._id);
                return (
                  <div key={user._id} className="card bg-base-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                    <div className="card-body p-6 space-y-4">
                      <div className="flex items-center gap-4">
                        <div className="avatar size-16 group-hover:scale-105 transition-transform">
                          <img src={user.profilePic} alt={user.fullName} className="rounded-2xl" />
                        </div>
                        <div className="flex-1 overflow-hidden">
                          <h3 className="font-bold text-lg truncate">{user.fullName}</h3>
                          {user.location && (
                            <div className="flex items-center text-xs text-base-content/60 mt-1">
                              <MapPin className="size-3 mr-1" />
                              {user.location}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <span className="badge badge-secondary gap-1 py-3 px-3">
                          {getLanguageFlag(user.nativeLanguage)}
                          <span className="text-xs">{t('friends.native')}: {capitialize(user.nativeLanguage)}</span>
                        </span>
                        <span className="badge badge-outline gap-1 py-3 px-3">
                          {getLanguageFlag(user.learningLanguage)}
                          <span className="text-xs">{t('friends.learning')}: {capitialize(user.learningLanguage)}</span>
                        </span>
                      </div>

                      {user.bio && (
                        <p className="text-sm text-base-content/70 line-clamp-2 italic italic">
                          "{user.bio}"
                        </p>
                      )}

                      <button
                        className={`btn w-full mt-2 transition-all ${
                          hasRequestBeenSent 
                            ? "btn-disabled bg-base-300" 
                            : "btn-primary shadow-lg hover:shadow-primary/30"
                        }`}
                        onClick={() => sendRequestMutation(user._id)}
                        disabled={hasRequestBeenSent || isSendingRequest}
                      >
                        {hasRequestBeenSent ? (
                          <>
                            <CheckCircle className="size-4 mr-2" />
                            {t('friends.requestSent')}
                          </>
                        ) : isSendingRequest ? (
                          <span className="loading loading-spinner loading-sm" />
                        ) : (
                          <>
                            <UserPlus className="size-4 mr-2" />
                            {t('friends.connect')}
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default FriendsPage;

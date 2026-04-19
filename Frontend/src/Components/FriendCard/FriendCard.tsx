import { Link } from "react-router";
import { LANGUAGE_TO_FLAG } from "../../utils/Static";
import type { friendType } from "../../types/streamify.types";
import { MessageCircle } from "lucide-react";

interface FriendCardProps {
  friend: friendType;
}

const FriendCard = ({ friend }: FriendCardProps) => {
  return (
    <div className="group relative">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-secondary rounded-2xl blur opacity-0 group-hover:opacity-20 transition duration-500"></div>
      
      <div className="relative card bg-base-100 border border-base-200 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden">
        <div className="card-body p-5">
          <div className="flex items-center gap-4 mb-4">
            <div className="avatar size-14 ring-2 ring-primary/20 ring-offset-2 ring-offset-base-100 rounded-full">
              <img src={friend.profilePic} alt={friend.fullName} className="rounded-full" />
            </div>
            <div className="overflow-hidden">
              <h3 className="font-bold text-lg truncate">{friend.fullName}</h3>
              <div className="flex items-center gap-1 text-xs opacity-60">
                <span className="size-2 bg-success rounded-full animate-pulse"></span>
                Active Now
              </div>
            </div>
          </div>

          <div className="space-y-2 mb-5">
            <div className="flex flex-wrap gap-2">
              <div className="badge badge-primary badge-outline gap-1.5 py-3 border-primary/30">
                {getLanguageFlag(friend.nativeLanguage)}
                <span className="text-[10px] uppercase font-bold tracking-wider opacity-60">Native:</span>
                <span className="font-bold">{friend.nativeLanguage}</span>
              </div>
              <div className="badge badge-secondary badge-outline gap-1.5 py-3 border-secondary/30">
                {getLanguageFlag(friend.learningLanguage)}
                <span className="text-[10px] uppercase font-bold tracking-wider opacity-60">Learning:</span>
                <span className="font-bold">{friend.learningLanguage}</span>
              </div>
            </div>
          </div>

          <Link 
            to={`/chat/${friend._id}`} 
            className="btn btn-primary w-full gap-2 shadow-lg shadow-primary/20 group-hover:scale-[1.02] transition-transform"
          >
            <MessageCircle className="size-4" />
            Message
          </Link>
        </div>
      </div>
    </div>
  );
};
export default FriendCard;

export function getLanguageFlag(language: string) {
  if (!language) return null;

  const langLower = language.toLowerCase();
  const countryCode = LANGUAGE_TO_FLAG[langLower as keyof typeof LANGUAGE_TO_FLAG];

  if (countryCode) {
    return (
      <img
        src={`https://flagcdn.com/24x18/${countryCode}.png`}
        alt={`${langLower} flag`}
        className="h-3.5 rounded-sm object-cover"
      />
    );
  }
  return null;
}
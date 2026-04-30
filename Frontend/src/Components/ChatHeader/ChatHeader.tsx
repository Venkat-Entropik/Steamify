import { XIcon } from "lucide-react";
import { useSocketStore } from "../../store/useSocketStore";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import ProfileAvatar from "../ProfileAvatar/ProfileAvatar";

function ChatHeader() {
  const { t } = useTranslation();
  const { selectedUser, setSelectedUser, onlineUsers } = useSocketStore();
  const isOnline = selectedUser ? onlineUsers.includes(selectedUser._id) : false;

  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedUser(null);
    };

    window.addEventListener("keydown", handleEscKey);

    // cleanup function
    return () => window.removeEventListener("keydown", handleEscKey);
  }, [setSelectedUser]);

  if (!selectedUser) return null;
  return (
    <div
    data-testid="chat-header"
      className="flex justify-between items-center bg-base-100/30 backdrop-blur-sm border-b
   border-base-content/5 max-h-[84px] px-6 py-4 flex-none z-10"
    >
      <div className="flex items-center space-x-4">
        <div className={`relative ${isOnline ? "online" : "offline"}`}>
          <ProfileAvatar
            profilePic={selectedUser.profilePic}
            profilePicType={selectedUser.profilePicType}
            className="w-14 h-14 ring-2 ring-base-200 ring-offset-2 ring-offset-base-100 transition-all"
            fullName={selectedUser.fullName}
          />
          {isOnline && (
            <span className="absolute bottom-0 right-0 size-3.5 bg-success rounded-full border-2 border-base-100 animate-pulse"></span>
          )}
        </div>

        <div>
          <h3 className="text-base-content font-bold text-lg tracking-tight">
            {selectedUser.fullName}
          </h3>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className={`size-2 rounded-full ${isOnline ? "bg-success" : "bg-base-content/30"}`}></span>
            <p className="text-base-content/50 text-xs font-bold uppercase tracking-wider">
              {isOnline ? t('common.online') : t('common.offline')}
            </p>
          </div>
        </div>
      </div>

      <button 
        onClick={() => setSelectedUser(null)}
        className="btn btn-ghost btn-circle hover:bg-error/10 hover:text-error transition-all"
        aria-label="close header"
      >
        <XIcon className="size-6 opacity-40 hover:opacity-100" />
      </button>
    </div>
  );
}
export default ChatHeader;

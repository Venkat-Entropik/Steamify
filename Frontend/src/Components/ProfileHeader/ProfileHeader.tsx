import { LogOutIcon } from "lucide-react";
import useAuthUser from "../../hooks/useAuthUser";
import type { UserType } from "../../types/streamify.types";
import { useSocketStore } from "../../store/useSocketStore";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import ProfileAvatar from "../ProfileAvatar/ProfileAvatar";

function ProfileHeader() {
  const { t } = useTranslation();
  const { unSubscribeFromMessages, setSelectedUser } = useSocketStore();
  const { authData } = useAuthUser();
  const authUser: UserType = authData?.data;
  const navigate = useNavigate();

  const handleLogout = (): void => {
    unSubscribeFromMessages();
    setSelectedUser(null);
    navigate("/");
  };

  if (!authUser) return null;

  return (
    <div className="p-6 border-b border-slate-700/50">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* AVATAR - VIEW ONLY */}
          <ProfileAvatar
            profilePic={authUser.profilePic}
            profilePicType={authUser.profilePicType}
            className="size-14 ring-2 ring-slate-700/50"
            fullName={authUser.fullName}
          />

          {/* USERNAME & ONLINE TEXT */}
          <div>
            <h3 className="text-slate-200 font-medium text-base max-w-[180px] truncate">
              {authUser.fullName}
            </h3>

            <p className="text-slate-400 text-xs">{t('common.online')}</p>
          </div>
        </div>

        {/* BUTTONS */}
        <div className="flex gap-4 items-center">
          {/* LOGOUT BTN */}
          <button
            className="text-slate-400 hover:text-slate-200 transition-colors"
            onClick={handleLogout}
          >
            <LogOutIcon className="size-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
export default ProfileHeader;
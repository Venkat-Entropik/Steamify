import { useState, useRef } from "react";
import { LogOutIcon } from "lucide-react";
import useAuthUser from "../../hooks/useAuthUser";
import type { UserType } from "../../types/streamify.types";
import { useSocketStore } from "../../store/useSocketStore";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";

function ProfileHeader() {
  const { t } = useTranslation();
  const { unSubscribeFromMessages, setSelectedUser } = useSocketStore();
  const { authData } = useAuthUser();
  const authUser: UserType = authData?.data;
  const [selectedImg, setSelectedImg] = useState<string | null>(null);
  const navigate = useNavigate();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = async () => {
      const base64Image = reader.result as string;
      setSelectedImg(base64Image);
      // await updateProfile({ profilePic: base64Image });
    };
  };

  const handleLogout = (): void => {
    unSubscribeFromMessages();
    setSelectedUser(null);
    navigate("/")
  };

  return (
    <div className="p-6 border-b border-slate-700/50">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* AVATAR */}
          <div className="avatar online">
            <button
              className="size-14 rounded-full overflow-hidden relative group"
              onClick={() => fileInputRef.current?.click()}
            >
              <img
                src={selectedImg || authUser.profilePic || "/avatar.png"}
                alt="User image"
                className="size-full object-cover"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                <span className="text-white text-xs">{t('common.change')}</span>
              </div>
            </button>

            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>

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
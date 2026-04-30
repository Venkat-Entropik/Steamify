import { Link, useLocation, useNavigate } from "react-router";
import { BellIcon, CameraIcon, LogOutIcon, ShipWheelIcon } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import authServices from "../../services/auth.services";
import ThemeSelector from "../ThemeSelector/ThemeSelector";
import LanguageSelector from "../LanguageSelector/LanguageSelector";
import { useTranslation } from "react-i18next";
import { type FC, useState } from "react";
import useAuthUser from "../../hooks/useAuthUser";
import type { UserType } from "../../types/streamify.types";
import { useSocketStore } from "../../store/useSocketStore";
import ProfileAvatar from "../ProfileAvatar/ProfileAvatar";
import ProfileUpdatePopover from "../ProfileUpdatePopover/ProfileUpdatePopover";

const Navbar: FC = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const isChatPage = location.pathname?.startsWith("/chat");
  const { authData } = useAuthUser();
  const authUser: UserType = authData?.data;
  const { unSubscribeFromMessages, setSelectedUser } = useSocketStore();

  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const queryClient = useQueryClient();

  const { mutate: logoutMutation } = useMutation({
    mutationFn: authServices.logout,
    onSuccess: () => {
      unSubscribeFromMessages();
      setSelectedUser(null);
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      navigate("/");
    },
  });

  return (
    <>
      <nav className="bg-base-200 border-b border-base-300 sticky top-0 z-30 h-16 flex items-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-end w-full">
            {isChatPage && (
              <div className="pl-5">
                <Link to="/" className="flex items-center gap-2.5">
                  <ShipWheelIcon className="size-9 text-primary" />
                  <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary  tracking-wider">
                    {t('common.appName')}
                  </span>
                </Link>
              </div>
            )}

            <div className="flex items-center gap-3 sm:gap-4 ml-auto">
              <Link to={"/notifications"}>
                <button className="btn btn-ghost btn-circle">
                  <BellIcon className="h-6 w-6 text-base-content opacity-70" />
                </button>
              </Link>
            </div>

            <LanguageSelector />
            <ThemeSelector />

            <div className={`dropdown dropdown-end ${isProfileOpen ? 'dropdown-open' : ''}`}>
              <div
                tabIndex={0}
                className="cursor-pointer group relative"
                onClick={() => setIsProfileOpen(!isProfileOpen)}
              >
                <ProfileAvatar
                  profilePic={authUser?.profilePic}
                  profilePicType={authUser?.profilePicType}
                  className="w-10 h-10 border-2 border-primary/20 group-hover:border-primary transition-colors"
                  fullName={authUser?.fullName}
                />
                <div className="absolute -bottom-1 -right-1 bg-primary text-primary-content rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                  <CameraIcon className="size-3" />
                </div>
              </div>
              {isProfileOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-[90]" 
                    onClick={() => setIsProfileOpen(false)}
                  />
                  <ProfileUpdatePopover 
                    onClose={() => setIsProfileOpen(false)} 
                  />
                </>
              )}
            </div>

            <button
              className="btn btn-ghost btn-circle ml-2"
              onClick={() => logoutMutation()}
            >
              <LogOutIcon className="h-6 w-6 text-base-content opacity-70" />
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;

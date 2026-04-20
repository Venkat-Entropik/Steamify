import { Link, useLocation } from "react-router";
import useAuthUser from "../../hooks/useAuthUser";
import { BellIcon, HomeIcon, ShipWheelIcon, UsersIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import ProfileAvatar from "../ProfileAvatar/ProfileAvatar";

const Sidebar = () => {
  const { t } = useTranslation();
  const { authData } = useAuthUser();
  const authUser = authData?.data;
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <aside className="w-64 bg-base-200 border-r border-base-300 hidden lg:flex flex-col h-screen sticky top-0">
      <div className="p-3.5 border-b border-base-300">
        <Link to="/" className="flex items-center gap-2.5">
          <ShipWheelIcon className="size-9 text-primary" />
          <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary  tracking-wider">
            {t('common.appName')}
          </span>
        </Link>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        <Link
          to="/"
          className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case ${currentPath === "/" ? "btn-active" : ""
            }`}
        >
          <HomeIcon className="size-5 text-base-content opacity-70" />
          <span>{t('nav.home')}</span>
        </Link>

        <Link
          to="/friends"
          className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case ${currentPath === "/friends" ? "btn-active" : ""
            }`}
        >
          <UsersIcon className="size-5 text-base-content opacity-70" />
          <span>{t('nav.friends')}</span>
        </Link>

        <Link
          to="/notifications"
          className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case ${currentPath === "/notifications" ? "btn-active" : ""
            }`}
        >
          <BellIcon className="size-5 text-base-content opacity-70" />
          <span>{t('nav.notifications')}</span>
        </Link>
      </nav>

      <div className="p-4 border-t border-base-300">
        <div className="flex items-center gap-3">
          <ProfileAvatar
            profilePic={authUser?.profilePic}
            profilePicType={authUser?.profilePicType}
            className="w-10 h-10"
            fullName={authUser?.fullName}
          />
          <div className="flex-1 overflow-hidden">
            <p className="font-semibold text-sm truncate">{authUser?.fullName}</p>
            <p className="text-xs text-success flex items-center gap-1">
              <span className="size-2 rounded-full bg-success inline-block" />
              {t('common.online')}
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
};
export default Sidebar;
import { Link, useLocation, useNavigate } from "react-router";
import { BellIcon, CameraIcon, LogOutIcon, ShipWheelIcon, SmileIcon, XIcon } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import authServices from "../../services/auth.services";
import ThemeSelector from "../ThemeSelector/ThemeSelector";
import LanguageSelector from "../LanguageSelector/LanguageSelector";
import { useTranslation } from "react-i18next";
import { type FC, useState, useRef, useMemo } from "react";
import useAuthUser from "../../hooks/useAuthUser";
import type { UserType } from "../../types/streamify.types";
import toast from "react-hot-toast";
import { useSocketStore } from "../../store/useSocketStore";
import ProfileAvatar from "../ProfileAvatar/ProfileAvatar";
import Avatar, { genConfig } from "react-nice-avatar";

const Navbar: FC = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const isChatPage = location.pathname?.startsWith("/chat");
  const { authData } = useAuthUser();
  const authUser: UserType = authData?.data;
  const { unSubscribeFromMessages, setSelectedUser } = useSocketStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const queryClient = useQueryClient();

  // Generate some random avatar configs for selection
  const avatarConfigs = useMemo(() => {
    return Array.from({ length: 8 }, (_, i) => ({
      sex: i % 2 === 0 ? "man" : "woman",
      faceColor: ["#F9C9B6", "#AC6651"][i % 2],
      earSize: "small",
      eyeStyle: "circle",
      noseStyle: "short",
      mouthStyle: "smile",
      shirtStyle: "hoody",
      glassesStyle: "none",
      hairColor: "#000",
      hairStyle: "normal",
      hatStyle: "none",
      hatColor: "#000",
      eyeBrowStyle: "up",
      shirtColor: ["#F4D150", "#9287FF", "#6BD9E9"][i % 3],
      bgColor: ["#E0E0E0", "#FFEDEF", "#F0FFE1"][i % 3],
      seed: Math.random() * 1000
    } as any));
  }, []);

  const { mutate: updateProfileMutation } = useMutation({
    mutationFn: authServices.updateProfile,
    onSuccess: () => {
      toast.success(t("Profile updated successfully!"));
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      setIsModalOpen(false);
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to update profile");
    },
  });

  const { mutate: logoutMutation } = useMutation({
    mutationFn: authServices.logout,
    onSuccess: () => {
      unSubscribeFromMessages();
      setSelectedUser(null);
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      navigate("/");
    },
  });

  const validateAndUpload = (file: File) => {
    // 1. Format check
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      toast.error("Please upload a valid image (JPEG, PNG, or WebP)");
      return;
    }

    // 2. Size check (2MB)
    if (file.size > 2 * 1024 * 1024) {
      toast.error("Image size must be less than 2MB");
      return;
    }

    // 3. Weekly limit check
    if (authUser?.lastProfilePicUpdate) {
      const lastUpdate = new Date(authUser.lastProfilePicUpdate);
      const now = new Date();
      const diffTime = Math.abs(now.getTime() - lastUpdate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays < 7) {
        toast.error(`Weekly limit: Next update in ${7 - diffDays} days.`);
        return;
      }
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      const base64Image = reader.result as string;
      updateProfileMutation({ profilePic: base64Image, profilePicType: "image" });
    };
  };

  const handleAvatarSelect = (config: any) => {
    // Weekly limit check
    if (authUser?.lastProfilePicUpdate) {
      const lastUpdate = new Date(authUser.lastProfilePicUpdate);
      const now = new Date();
      const diffTime = Math.abs(now.getTime() - lastUpdate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays < 7) {
        toast.error(`Weekly limit: Next update in ${7 - diffDays} days.`);
        return;
      }
    }
    updateProfileMutation({ profilePic: JSON.stringify(config), profilePicType: "avatar" });
  };

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

            <div
              className="cursor-pointer group relative"
              onClick={() => setIsModalOpen(true)}
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

            <button
              className="btn btn-ghost btn-circle ml-2"
              onClick={() => logoutMutation()}
            >
              <LogOutIcon className="h-6 w-6 text-base-content opacity-70" />
            </button>
          </div>
        </div>
      </nav>

      {/* Profile Update Modal */}
      {isModalOpen && (
        <div className="modal modal-open">
          <div className="modal-box bg-base-100 border border-slate-700/50 max-w-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-xl text-slate-200">{t('common.profile')}</h3>
              <button
                className="btn btn-ghost btn-sm btn-circle"
                onClick={() => setIsModalOpen(false)}
              >
                <XIcon className="size-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Image Upload Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-slate-400 mb-2">
                  <CameraIcon className="size-4" />
                  <span className="text-sm font-medium">Upload Image</span>
                </div>
                <div
                  className="aspect-square rounded-2xl border-2 border-dashed border-slate-700 flex flex-col items-center justify-center gap-4 hover:border-primary/50 transition-colors cursor-pointer group bg-slate-800/30"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <ProfileAvatar
                    profilePic={authUser?.profilePic}
                    profilePicType={authUser?.profilePicType}
                    className="size-24 border-4 border-slate-700"
                    fullName={authUser?.fullName}
                  />
                  <div className="text-center">
                    <p className="text-sm font-medium text-slate-300 group-hover:text-primary transition-colors">
                      Click to change
                    </p>
                    <p className="text-xs text-slate-500 mt-1">Max 2MB (JPEG, PNG)</p>
                  </div>
                </div>
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) validateAndUpload(file);
                  }}
                />
              </div>

              {/* Avatar Selection Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-slate-400 mb-2">
                  <SmileIcon className="size-4" />
                  <span className="text-sm font-medium">Choose Avatar</span>
                </div>
                <div className="grid grid-cols-4 gap-3 max-h-[280px] overflow-y-auto p-1">
                  {avatarConfigs.map((config, idx) => (
                    <button
                      key={idx}
                      className="aspect-square rounded-xl overflow-hidden hover:scale-110 active:scale-95 transition-all ring-primary/40 hover:ring-2"
                      onClick={() => handleAvatarSelect(config)}
                    >
                      <Avatar className="size-full" {...genConfig(config)} />
                    </button>
                  ))}
                </div>
                <p className="text-xs text-slate-500 text-center mt-2 italic">
                  Tip: Weekly limit applies to both images and avatars
                </p>
              </div>
            </div>
          </div>
          <div className="modal-backdrop" onClick={() => setIsModalOpen(false)}></div>
        </div>
      )}
    </>
  );
};

export default Navbar;

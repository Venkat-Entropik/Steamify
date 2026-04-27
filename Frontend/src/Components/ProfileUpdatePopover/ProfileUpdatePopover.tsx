import { CameraIcon, SmileIcon, XIcon } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import authServices from "../../services/auth.services";
import { useTranslation } from "react-i18next";
import { type FC, useRef, useMemo } from "react";
import useAuthUser from "../../hooks/useAuthUser";
import type { UserType } from "../../types/streamify.types";
import toast from "react-hot-toast";
import ProfileAvatar from "../ProfileAvatar/ProfileAvatar";
import Avatar, { genConfig, type AvatarConfig } from "react-nice-avatar";

interface ProfileUpdatePopoverProps {
  onClose?: () => void;
}

const ProfileUpdatePopover: FC<ProfileUpdatePopoverProps> = ({ onClose }) => {
  const { t } = useTranslation();
  const { authData } = useAuthUser();
  const authUser: UserType = authData?.data;
  const fileInputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();

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
      seed: i * 100
    } as AvatarConfig));
  }, []);

  const { mutate: updateProfileMutation } = useMutation({
    mutationFn: authServices.updateProfile,
    onSuccess: () => {
      toast.success(t("Profile updated successfully!"));
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      onClose?.();
    },
    onError: () => {
      toast.error("Failed to update profile");
    },
  });

  const validateAndUpload = (file: File) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      toast.error("Please upload a valid image (JPEG, PNG, or WebP)");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      toast.error("Image size must be less than 2MB");
      return;
    }

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

  const handleAvatarSelect = (config: AvatarConfig) => {
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
    <div className="dropdown-content mt-3 p-6 shadow-2xl bg-base-200 backdrop-blur-lg rounded-2xl w-[320px] md:w-[400px] border border-base-content/10 z-[100]">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-lg text-base-content">{t('common.profile')}</h3>
        {onClose && (
          <button className="btn btn-ghost btn-xs btn-circle" onClick={onClose}>
            <XIcon className="size-4" />
          </button>
        )}
      </div>

      <div className="space-y-6">
        {/* Image Upload Section */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-base-content/70">
            <CameraIcon className="size-4" />
            <span className="text-xs font-medium">Upload Image</span>
          </div>
          <div
            className="aspect-video rounded-xl border-2 border-dashed border-base-content/20 flex flex-col items-center justify-center gap-2 hover:border-primary/50 transition-colors cursor-pointer group bg-base-300/30"
            onClick={() => fileInputRef.current?.click()}
          >
            <ProfileAvatar
              profilePic={authUser?.profilePic}
              profilePicType={authUser?.profilePicType}
              className="size-16 border-2 border-base-content/20"
              fullName={authUser?.fullName}
            />
            <div className="text-center">
              <p className="text-xs font-medium text-base-content/80 group-hover:text-primary transition-colors">
                Click to change
              </p>
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
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-base-content/70">
            <SmileIcon className="size-4" />
            <span className="text-xs font-medium">Choose Avatar</span>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {avatarConfigs.map((config, idx) => (
              <button
                key={idx}
                className="aspect-square rounded-lg overflow-hidden hover:scale-110 active:scale-95 transition-all ring-primary/40 hover:ring-2"
                onClick={() => handleAvatarSelect(config)}
              >
                <Avatar className="size-full" {...genConfig(config)} />
              </button>
            ))}
          </div>
          <p className="text-[10px] text-base-content/50 text-center italic mt-2">
            Weekly limit applies to both images and avatars
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfileUpdatePopover;

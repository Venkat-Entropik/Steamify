import Avatar, { genConfig } from "react-nice-avatar";
import type { FC } from "react";

interface ProfileAvatarProps {
  profilePic?: string;
  profilePicType?: "image" | "avatar";
  className?: string;
  fullName?: string;
}

const ProfileAvatar: FC<ProfileAvatarProps> = ({
  profilePic,
  profilePicType = "image",
  className = "size-10",
  fullName,
}) => {
  if (profilePicType === "avatar" && profilePic) {
    let config = null;
    try {
      config = genConfig(JSON.parse(profilePic));
    } catch (error) {
      console.error("Failed to parse avatar config", error);
    }

    if (config) {
      return (
        <div
          className={`overflow-hidden rounded-full ${className}`}
          data-testid="profile-avatar"
        >
          <Avatar className="size-full" {...config} />
        </div>
      );
    }
  }

  return (
    <div className={`overflow-hidden rounded-full bg-slate-700 ${className}`}>
      <img
        src={profilePic || "/avatar.png"}
        alt={fullName || "User profile"}
        className="size-full object-cover"
        onError={(e) => {
          (e.target as HTMLImageElement).src = "/avatar.png";
        }}
      />
    </div>
  );
};

export default ProfileAvatar;

import type { FC } from "react";
import type { Socket } from "socket.io-client";

export type route = {
  routeProps: {
    path: string;
    element: FC;
  };
  name: string;
};

export type ChatPageProps = Record<string, never>;

export type signUpPayloadType = {
  email: string;
  password: string;
  fullName: string;
};

export type loginPayloadType = Omit<signUpPayloadType, "fullName">;

export type onBoardingType = {
  fullName: string;
  bio: string;
  nativeLanguage: string;
  learningLanguage: string;
  location: string;
  profilePic?: string;
};

export type UserType = {
  _id: string;
  fullName: string;
  email: string;
  bio: string;
  profilePic: string;
  profilePicType?: "image" | "avatar";
  nativeLanguage: string;
  learningLanguage: string;
  location: string;
  isOnBoarded: boolean;
  friends: string[];
  createdAt: string;
  updatedAt: string;
  lastProfilePicUpdate?: string;
  __v: number;
};

export type friendType = Pick<
  UserType,
  "_id" | "fullName" | "learningLanguage" | "nativeLanguage" | "profilePic" | "profilePicType"
>;

export type requestStatus = "pending" | "accepted";

export type recipientType = Pick<UserType, "_id" | "fullName" | "profilePic" | "profilePicType">;

export type senderTypes = Pick<
  UserType,
  "_id" | "profilePic" | "profilePicType" | "fullName" | "nativeLanguage" | "learningLanguage"
>;

export interface acceptedReqsType {
  _id: string;
  sender: string;
  recipient: recipientType;
  status: recipientType;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface inComingReqsType {
  _id: string;
  sender: senderTypes;
  recipient: recipientType;
  status: recipientType;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export type acceptedFriendRequestType = Record<
  "acceptedReqs",
  acceptedReqsType[]
>;
export type incomingFriendRequestType = Record<
  "incomingReqs",
  inComingReqsType[]
>;

export interface sendMessages {
  id: string;
  text: string;
  image: string;
}

export interface Message {
  _id: string;
  senderId: string;
  receiverId: string;
  text?: string;
  image?: string;
  createdAt: string;
  updatedAt: string;
}

export interface socketStore {
  socket: Socket | null;
  onlineUsers: string[];
  messages: Message[];
  isMessagesLoading: boolean;
  selectedUser: UserType | null;
  setSelectedUser: (user: UserType | null) => void;
  getSelectedUser: (userId: string) => Promise<void>;
  connectSocket: () => void;
  disconnectSocket: () => void;
  subscribeToMessage: () => void;
  unSubscribeFromMessages: () => void;
  getMessagesByUserId: (userId: string | undefined) => Promise<void>;
  sendMessage: (receiverId: string, messageData: { text?: string; image?: string | null }) => Promise<void>;
}
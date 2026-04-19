import { useEffect, useRef } from "react";
import MessageInput from "../MessageInput/MessageInput";
import ChatHeader from "../ChatHeader/ChatHeader";
import MessagesLoadingSkeleton from "../MessagesLoadingSkeleton/MessagesLoadingSkeleton";
import NoChatHistoryPlaceholder from "../NoChatHistoryPlaceholder/NoChatHistoryPlaceholder";
import useAuthUser from "../../hooks/useAuthUser";
import { useSocketStore } from "../../store/useSocketStore";
import type { UserType } from "../../types/streamify.types";
import { useParams } from "react-router";

function ChatContainer() {
  const { id: targetUserId } = useParams();
  const {
    getMessagesByUserId,
    messages,
    subscribeToMessage,
    unSubscribeFromMessages,
    isMessagesLoading,
    getSelectedUser,
    setSelectedUser,
  } = useSocketStore();
  const { authData } = useAuthUser();
  const authUser: UserType = authData?.data?.user;
  const messageEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (targetUserId) {
      getSelectedUser(targetUserId);
      getMessagesByUserId(targetUserId);
    }
    subscribeToMessage();

    return () => {
      unSubscribeFromMessages();
      setSelectedUser(null);
    };
  }, [getMessagesByUserId, getSelectedUser, setSelectedUser, subscribeToMessage, unSubscribeFromMessages, targetUserId]);

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <>
      <ChatHeader />
      <div className="flex-1 px-6 overflow-y-auto py-8">
        {messages.length > 0 && !isMessagesLoading ? (
          <div className="max-w-3xl mx-auto space-y-6">
            {messages.map((msg) => (
              <div
                key={msg._id}
                className={`chat ${msg.senderId === authUser._id ? "chat-end" : "chat-start"}`}
              >
                <div
                  className={`chat-bubble relative min-h-[40px] px-4 py-2 rounded-2xl shadow-sm ${
                    msg.senderId === authUser._id
                      ? "bg-gradient-to-br from-primary to-primary-focus text-primary-content"
                      : "bg-base-300 text-base-content"
                  }`}
                >
                  {msg.image && (
                    <div className="mb-2 relative group/img">
                      <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-xl blur opacity-0 group-hover/img:opacity-20 transition duration-300"></div>
                      <img src={msg.image} alt="Shared" className="relative rounded-xl max-h-64 object-cover border border-base-content/5 shadow-inner" />
                    </div>
                  )}
                  {msg.text && <p className="text-[15px] leading-relaxed font-medium">{msg.text}</p>}
                  <p className={`text-[10px] mt-1.5 font-bold uppercase tracking-widest opacity-40 flex items-center gap-1 ${
                    msg.senderId === authUser._id ? "justify-end" : "justify-start"
                  }`}>
                    {new Date(msg.createdAt).toLocaleTimeString(undefined, {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messageEndRef} />
          </div>
        ) : isMessagesLoading ? (
          <MessagesLoadingSkeleton />
        ) : (
          <NoChatHistoryPlaceholder name="" />
        )}
      </div>

      <MessageInput />
    </>
  );
}

export default ChatContainer;
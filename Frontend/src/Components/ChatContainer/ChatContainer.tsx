import { useEffect, useRef } from "react";
import { MessageInput } from "stream-chat-react";
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
    // getMessagesByUserId,
    messages,
    subscribeToMessage,
    unSubscribeFromMessages,
  } = useSocketStore();
  const { authData } = useAuthUser();
  const authUser:UserType = authData?.data;
  const messageEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getMessagesByUserId(targetUserId);
    subscribeToMessage();

    return () => unSubscribeFromMessages();
  }, [subscribeToMessage, unSubscribeFromMessages, targetUserId]);

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
                  className={`chat-bubble relative ${
                    msg.senderId === authUser._id
                      ? "bg-cyan-600 text-white"
                      : "bg-slate-800 text-slate-200"
                  }`}
                >
                  {msg.image && (
                    <img src={msg.image} alt="Shared" className="rounded-lg h-48 object-cover" />
                  )}
                  {msg.text && <p className="mt-2">{msg.text}</p>}
                  <p className="text-xs mt-1 opacity-75 flex items-center gap-1">
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
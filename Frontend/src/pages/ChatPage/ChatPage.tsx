import BorderAnimatedContainer from "../../Components/BorderAnimatedContainer/BorderAnimatedContainer";
import ProfileHeader from "../../Components/ProfileHeader/ProfileHeader";
import ChatContainer from "../../Components/ChatContainer/ChatContainer";

function ChatPage() {
  return (
    <div className="relative w-full max-w-6xl h-[800px]">
      <BorderAnimatedContainer>
        <div className="w-80 bg-slate-800/50 backdrop-blur-sm flex flex-col">
          <ProfileHeader />
        </div>

        <div className="flex-1 flex flex-col bg-slate-900/50 backdrop-blur-sm">
          <ChatContainer /> 
        </div>
      </BorderAnimatedContainer>
    </div>
  );
}
export default ChatPage;
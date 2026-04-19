import BorderAnimatedContainer from "../../Components/BorderAnimatedContainer/BorderAnimatedContainer";
import ProfileHeader from "../../Components/ProfileHeader/ProfileHeader";
import ChatContainer from "../../Components/ChatContainer/ChatContainer";
import { useThemeStore } from "../../store/useThemeStore";

function ChatPage() {
  const { theme } = useThemeStore();
  return (
    <div
      className="min-h-[calc(100vh-80px)] w-full bg-base-200/50 flex items-center justify-center p-4 md:p-8"
      data-theme={theme}
    >
      {/* Background Decorative Elements */}
      <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-primary/10 blur-[120px] rounded-full -mr-32 -mt-32 pointer-events-none"></div>
      <div className="fixed bottom-0 left-0 w-[500px] h-[500px] bg-secondary/10 blur-[120px] rounded-full -ml-32 -mb-32 pointer-events-none"></div>

      <div className="w-full max-w-6xl h-[750px] relative z-10 animate-in fade-in zoom-in duration-700">
        <BorderAnimatedContainer>
          <div className="flex w-full h-full bg-base-100/40 backdrop-blur-2xl shadow-2xl rounded-2xl overflow-hidden border border-base-content/5">
            
            {/* SIDEBAR - PROFILE (More contrast) */}
            <div className="hidden md:flex w-80 bg-base-300/50 backdrop-blur-xl border-r border-base-content/10 flex-col shrink-0">
               <div className="h-full bg-gradient-to-b from-transparent via-primary/5 to-transparent">
                  <ProfileHeader />
               </div>
            </div>

            {/* MAIN CHAT AREA (Clean & Focused) */}
            <div className="flex-1 flex flex-col bg-base-100 relative overflow-hidden">
              <div className="absolute inset-0 bg-grid-slate-500/[0.02] pointer-events-none"></div>
              <ChatContainer />
            </div>

          </div>
        </BorderAnimatedContainer>
      </div>
    </div>
  );
}
export default ChatPage;
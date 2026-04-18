import { VideoIcon } from "lucide-react";

interface CallButtonProps {
  handleVideoCall: () => void;
}

function CallButton({ handleVideoCall }: CallButtonProps) {
  return (
    <div
      className="p-3 border-b flex items-center justify-end max-w-7xl mx-auto w-full absolute top-0"
      data-testid="call-button"
    >
      <button
        onClick={handleVideoCall}
        className="btn btn-success btn-sm text-white"
      >
        <VideoIcon className="size-6" data-testid="video-icon" />
      </button>
    </div>
  );
}

export default CallButton;

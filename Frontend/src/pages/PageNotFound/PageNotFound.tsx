import type { FC } from "react";
import { Link } from "react-router";
import { Ghost, Home, ArrowLeft } from "lucide-react";

const PageNotFound: FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4 overflow-hidden">
      <div className="max-w-md w-full text-center space-y-8 relative">
        {/* Background glow effects */}
        <div className="absolute -top-24 -left-24 w-64 h-64 bg-primary/10 blur-[100px] rounded-full"></div>
        <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-secondary/10 blur-[100px] rounded-full"></div>

        <div className="relative inline-block group">
          <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full scale-150 animate-pulse"></div>
          <Ghost className="w-32 h-32 mx-auto text-primary relative animate-bounce transition-transform duration-500 group-hover:scale-110" />
        </div>

        <div className="space-y-4 relative">
          <div className="absolute inset-0 flex items-center justify-center -z-10">
            <span className="text-[12rem] font-black text-base-content/5 select-none blur-[2px]">
              404
            </span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-base-content sm:text-5xl">
            Page Not Found
          </h1>
          <p className="text-lg text-base-content/70 max-w-xs mx-auto">
            Oops! The page you're looking for has vanished into the digital void.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
          <Link
            to="/"
            className="btn btn-primary btn-lg gap-2 w-full sm:w-auto hover:shadow-lg transition-all active:scale-95"
          >
            <Home className="w-5 h-5" />
            Go Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="btn btn-outline btn-lg gap-2 w-full sm:w-auto hover:bg-base-300 transition-all active:scale-95"
          >
            <ArrowLeft className="w-5 h-5" />
            Go Back
          </button>
        </div>

        <div className="pt-12 flex justify-center gap-3">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-primary/40 animate-bounce"
              style={{ animationDelay: `${i * 150}ms` }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
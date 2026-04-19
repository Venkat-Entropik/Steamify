import { type FC, useEffect } from "react";
import { Link } from "react-router";
import {
  ShipWheelIcon,
  Globe,
  MessageSquare,
  Video,
  Users,
  ArrowRight,
  Languages,
  Zap,
  Sparkles,
} from "lucide-react";
import welcomeHero from "../../assets/generated/welcome_hero.png";

const WelcomePage: FC = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-active");
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px", // Trigger slightly before element is fully in view
      },
    );

    // Select all elements with the reveal-up class
    const revealElements = document.querySelectorAll(".reveal-up");
    revealElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-base-100 flex flex-col overflow-x-hidden">
      {/* NAVBAR */}
      <nav className="container mx-auto px-6 py-6 flex justify-between items-center relative z-10">
        <div className="flex items-center gap-2.5">
          <ShipWheelIcon className="size-10 text-primary animate-spin-slow" />
          <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider">
            Streamify
          </span>
        </div>
        <div className="flex items-center gap-4">
          <Link
            to="/login"
            className="btn btn-ghost hidden sm:flex hover:bg-primary/10"
          >
            Log In
          </Link>
          <Link
            to="/signup"
            className="btn btn-primary px-8 shadow-lg shadow-primary/20 hover:scale-105 transition-transform"
          >
            Join Now
          </Link>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="container mx-auto px-6 pt-12 lg:pt-20 pb-20 flex flex-col lg:flex-row items-center gap-16 relative">
        {/* Background blobs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 blur-[120px] rounded-full -z-10 animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-secondary/10 blur-[150px] rounded-full -z-10 animate-pulse delay-700"></div>

        <div className="flex-1 space-y-8 text-center lg:text-left animate-in slide-in-from-left duration-1000">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20 mb-4">
            <Zap className="size-4" />
            <span>New: AI-Powered Language Exchange</span>
          </div>
          <h1 className="text-5xl lg:text-7xl font-black leading-tight tracking-tight">
            Master Any Language <br />
            <span className="text-primary italic">
              Through Real Connection.
            </span>
          </h1>
          <p className="text-xl text-base-content/70 max-w-2xl leading-relaxed">
            Steamify connects you with native speakers worldwide for immersive
            conversations. Practice, learn, and make friends in a vibrant
            community designed for fluent outcomes.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-6 pt-4">
            <Link
              to="/signup"
              className="btn btn-primary btn-lg px-10 gap-2 h-16 text-lg group"
            >
              Start Your Journey
              <ArrowRight className="size-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <div className="flex -space-x-3 items-center">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="size-10 rounded-full border-2 border-base-100 overflow-hidden shadow-sm"
                >
                  <img
                    src={`https://i.pravatar.cc/150?u=${i + 10}`}
                    alt="User"
                  />
                </div>
              ))}
              <p className="ml-4 text-sm font-medium text-base-content/60">
                Joined by <span className="text-primary font-bold">2,000+</span>{" "}
                learners this week
              </p>
            </div>
          </div>
        </div>

        <div className="flex-1 relative animate-in zoom-in duration-1000">
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent blur-3xl rounded-full scale-110"></div>
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
            <img
              src={welcomeHero}
              alt="Language Learning Community"
              className="relative rounded-2xl shadow-2xl border border-white/10 w-full hover:scale-[1.02] transition-transform duration-500"
            />
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="bg-base-200/50 py-32 overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="text-center space-y-4 mb-20 reveal-up">
            <h2 className="text-4xl lg:text-6xl font-bold">
              Everything you need to be fluent
            </h2>
            <p className="text-base-content/60 max-w-xl mx-auto text-lg">
              Our platform combines cutting-edge tech with human connection to
              accelerate your learning journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              className="reveal-up [transition-delay:100ms]"
              icon={<Globe className="size-10 text-primary" />}
              title="Global Community"
              description="Connect with native speakers from over 150 countries and diverse backgrounds."
            />
            <FeatureCard
              className="reveal-up [transition-delay:200ms]"
              icon={<MessageSquare className="size-10 text-secondary" />}
              title="Real-time Chat"
              description="Smart messaging with built-in translation, transliteration and corrections."
            />
            <FeatureCard
              className="reveal-up [transition-delay:300ms]"
              icon={<Video className="size-10 text-accent" />}
              title="Video Calls"
              description="Crystal-clear face-to-face practice sessions with native speakers anytime."
            />
            <FeatureCard
              className="reveal-up [transition-delay:400ms]"
              icon={<Users className="size-10 text-success" />}
              title="Study Groups"
              description="Join themed rooms and learn together with peers who share your interests."
            />
          </div>
        </div>
      </section>

      {/* FINAL CTA SECTION */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary/5 -z-10 skew-y-3"></div>
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-4xl mx-auto space-y-10 reveal-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 text-secondary font-bold text-sm uppercase tracking-widest">
              <Sparkles className="size-4" />
              Limited Time Offer
            </div>
            <h2 className="text-5xl lg:text-7xl font-black">
              Ready to speak like a local?
            </h2>
            <p className="text-xl text-base-content/70">
              Join thousands of language enthusiasts who have already
              transformed their speaking skills with Streamify.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
              <Link
                to="/signup"
                className="btn btn-primary btn-lg px-12 h-16 text-lg shadow-xl shadow-primary/20 hover:scale-105 transition-transform"
              >
                Get Started for Free
              </Link>
              <Link
                to="/login"
                className="btn btn-outline btn-lg px-12 h-16 text-lg"
              >
                View Pricing
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 border-t border-base-200 bg-base-100">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <ShipWheelIcon className="size-6 text-primary/50" />
            <span className="font-bold opacity-50">Streamify © 2026</span>
          </div>
          <div className="flex gap-8 text-sm opacity-60">
            <a href="#" className="hover:text-primary transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Contact Us
            </a>
          </div>
          <div className="flex gap-4">
            <div className="size-8 rounded-lg bg-base-300 flex items-center justify-center hover:bg-primary/20 transition-colors cursor-pointer">
              <Languages className="size-4" />
            </div>
          </div>
        </div>
      </footer>

      {/* Custom Styles */}
      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }

        .reveal-up {
          opacity: 0;
          transform: translateY(40px);
          transition: all 1s cubic-bezier(0.22, 1, 0.36, 1);
          will-change: transform, opacity;
        }

        .reveal-active {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
      `}</style>
    </div>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  className?: string;
}

const FeatureCard = ({
  icon,
  title,
  description,
  className,
}: FeatureCardProps) => {
  return (
    <div
      className={`card bg-base-100 p-8 shadow-lg hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 border border-base-200/50 group ${className}`}
    >
      <div className="mb-6 transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
        {icon}
      </div>
      <h3 className="text-2xl font-bold mb-3">{title}</h3>
      <p className="text-base-content/60 leading-relaxed text-lg">
        {description}
      </p>
    </div>
  );
};

export default WelcomePage;

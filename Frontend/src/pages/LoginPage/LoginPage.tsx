import { ShipWheelIcon, Mail, Lock, ArrowRight, Github } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import authIllustration from "../../assets/generated/auth_illustration.png";
import { useForm } from "react-hook-form";
import type { loginPayloadType } from "../../types/streamify.types";
import { emailRegexPattern } from "../../utils/Static";
import authServices from "../../services/auth.services";
import toast from "react-hot-toast";
import LanguageSwitcher from "../../Components/LanguageSwitcher/LanguageSwitcher";

const LoginPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const {
    register,
    formState: { isSubmitting, isValid, errors },
    handleSubmit,
  } = useForm<loginPayloadType>({
    mode: "onBlur",
    defaultValues: { email: "", password: "" },
  });

  const queryClient = useQueryClient();
  const { mutate: loginMutation, isPending } = useMutation({
    mutationFn: authServices.login,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] }).then(() => {
        navigate("/");
      });
    },
    onError: (loginError) => toast.error(loginError.message),
  });

  const handleLogin = (data: loginPayloadType) => {
    loginMutation(data);
  };

  return (
    <div className="min-h-screen bg-base-100 flex items-center justify-center p-4 overflow-hidden relative">
      {/* Language Switcher - Floating */}
      <div className="fixed top-8 right-8 z-50">
        <LanguageSwitcher />
      </div>

      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full -mr-64 -mt-64"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/5 blur-[120px] rounded-full -ml-64 -mb-64"></div>

      <div className="w-full max-w-6xl grid lg:grid-cols-2 bg-base-100 rounded-[2rem] shadow-2xl overflow-hidden border border-base-200 relative z-10 animate-in fade-in zoom-in duration-700">
        
        {/* LEFT SIDE - FORM */}
        <div className="p-8 md:p-16 flex flex-col justify-center">
          <div className="mb-12 flex items-center gap-3">
            <ShipWheelIcon className="size-10 text-primary" />
            <span className="text-3xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              {t('common.appName')}
            </span>
          </div>

          <div className="space-y-2 mb-10">
            <h1 className="text-4xl font-bold tracking-tight">{t('auth.welcomeBack')}</h1>
            <p className="text-base-content/60">{t('auth.continueJourney')}</p>
          </div>

          <form onSubmit={handleSubmit(handleLogin)} className="space-y-6">
            <div className="space-y-4">
              {/* EMAIL FIELD */}
              <div className="form-control">
                <label className="label py-1">
                  <span className="label-text font-medium">{t('auth.email')}</span>
                </label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-base-content/30 group-focus-within:text-primary transition-colors" />
                  <input
                    type="email"
                    placeholder="name@example.com"
                    className={`input input-bordered w-full pl-12 h-14 bg-base-200 focus:bg-base-100 transition-all ${errors.email ? 'input-error' : ''}`}
                    {...register("email", {
                      required: t('errors.emailRequired'),
                      pattern: {
                        value: emailRegexPattern,
                        message: t('errors.invalidEmail'),
                      },
                    })}
                  />
                </div>
                {errors.email && <p className="text-error text-xs mt-1 ml-1">{errors.email.message}</p>}
              </div>

              {/* PASSWORD FIELD */}
              <div className="form-control">
                <label className="label py-1 flex justify-between">
                  <span className="label-text font-medium">{t('auth.password')}</span>
                  <Link to="#" className="label-text-alt text-primary hover:underline font-medium">{t('auth.forgotPassword')}</Link>
                </label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-base-content/30 group-focus-within:text-primary transition-colors" />
                  <input
                    type="password"
                    placeholder="••••••••"
                    className={`input input-bordered w-full pl-12 h-14 bg-base-200 focus:bg-base-100 transition-all ${errors.password ? 'input-error' : ''}`}
                    {...register("password", {
                      required: t('errors.passwordRequired'),
                      minLength: {
                        value: 8,
                        message: t('errors.passwordTooShort'),
                      },
                    })}
                  />
                </div>
                {errors.password && <p className="text-error text-xs mt-1 ml-1">{errors.password.message}</p>}
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full h-14 text-lg shadow-lg shadow-primary/20 gap-2 group rounded-xl"
              disabled={isPending || !isValid || isSubmitting}
            >
              {isPending || isSubmitting ? (
                <span className="loading loading-spinner"></span>
              ) : (
                <>
                  {t('auth.signIn')}
                  <ArrowRight className="size-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>

            <div className="divider text-xs text-base-content/30 uppercase tracking-widest font-bold">{t('auth.orContinue')}</div>

            <button type="button" className="btn btn-outline w-full h-14 gap-3 border-base-300 hover:bg-base-200 rounded-xl">
              <Github className="size-5" />
              {t('auth.signInWithGithub')}
            </button>

            <p className="text-center text-base-content/60 pt-4">
              {t('auth.noAccount')}{" "}
              <Link to="/signup" className="text-primary font-bold hover:underline transition-all">
                {t('auth.createAccount')}
              </Link>
            </p>
          </form>
        </div>

        {/* RIGHT SIDE - ILLUSTRATION */}
        <div className="hidden lg:flex flex-col items-center justify-center bg-gradient-to-br from-primary/10 via-base-200 to-secondary/10 p-16 relative">
          <div className="absolute inset-0 bg-grid-slate-200/50 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10"></div>
          
          <div className="relative max-w-sm w-full animate-float">
            <div className="absolute inset-0 bg-primary/20 blur-[80px] rounded-full scale-125"></div>
            <img
              src={authIllustration}
              alt="Login illustration"
              className="relative z-10 w-full drop-shadow-2xl"
              draggable="false"
            />
          </div>

          <div className="text-center mt-12 space-y-4 max-w-xs relative z-10">
            <h2 className="text-2xl font-bold">{t('auth.loginHeroTitle')}</h2>
            <p className="text-base-content/60 italic">{t('auth.loginHeroQuote')}</p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
          100% { transform: translateY(0px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default LoginPage;

import { ShipWheelIcon, Mail, Lock, User, ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import authIllustration from "../../assets/generated/auth_illustration.png";
import { useForm } from "react-hook-form";
import type { signUpPayloadType } from "../../types/streamify.types";
import { emailRegexPattern } from "../../utils/Static";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import authServices from "../../services/auth.services";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import LanguageSwitcher from "../../Components/LanguageSwitcher/LanguageSwitcher";

const SignUpPage = () => {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting, isLoading },
  } = useForm<signUpPayloadType>({ mode: "onBlur" });

  const queryClient = useQueryClient();
  const {
    mutate: signupMutation,
    isPending,
  } = useMutation({
    mutationFn: authServices.signUp,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["authUser"] }),
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error?.response?.data?.message || t('errors.signupFailed'));
    },
  });

  const handleSignup = (data: signUpPayloadType) => {
    signupMutation(data);
  };

  return (
    <div data-testid="signup" className="min-h-screen bg-base-100 flex items-center justify-center p-4 overflow-hidden relative">
      {/* Language Switcher - Floating */}
      <div className="fixed top-8 right-8 z-50">
        <LanguageSwitcher />
      </div>

      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-secondary/5 blur-[120px] rounded-full -ml-64 -mt-64"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full -mr-64 -mb-64"></div>

      <div className="w-full max-w-6xl grid lg:grid-cols-2 bg-base-100 rounded-[2rem] shadow-2xl overflow-hidden border border-base-200 relative z-10 animate-in fade-in zoom-in duration-700">
        
        {/* LEFT SIDE - FORM */}
        <div className="p-8 md:p-16 flex flex-col justify-center order-2 lg:order-1">
          <div className="mb-10 flex items-center gap-3">
            <ShipWheelIcon className="size-10 text-primary" />
            <span className="text-3xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              {t('common.appName')}
            </span>
          </div>

          <div className="space-y-2 mb-8">
            <h1 className="text-4xl font-bold tracking-tight">{t('auth.createAccount')}</h1>
            <p className="text-base-content/60">{t('auth.joinCommunity')}</p>
          </div>

          <form onSubmit={handleSubmit(handleSignup)} className="space-y-5">
            <div className="space-y-4">
              {/* FULL NAME */}
              <div className="form-control">
                <label className="label py-1">
                  <span className="label-text font-medium">{t('auth.fullName')}</span>
                </label>
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-base-content/30 group-focus-within:text-primary transition-colors" />
                  <input
                    type="text"
                    placeholder="John Doe"
                    className={`input input-bordered w-full pl-12 h-14 bg-base-200 focus:bg-base-100 transition-all ${errors.fullName ? 'input-error' : ''}`}
                    {...register("fullName", {
                      required: t('errors.nameRequired'),
                      minLength: { value: 3, message: t('errors.nameTooShort') },
                      maxLength: { value: 20, message: t('errors.nameTooLong') },
                    })}
                  />
                </div>
                {errors.fullName && <p className="text-error text-xs mt-1 ml-1">{errors.fullName.message}</p>}
              </div>

              {/* EMAIL */}
              <div className="form-control">
                <label className="label py-1">
                  <span className="label-text font-medium">{t('auth.email')}</span>
                </label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-base-content/30 group-focus-within:text-primary transition-colors" />
                  <input
                    type="email"
                    placeholder="Enter email"
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

              {/* PASSWORD */}
              <div className="form-control">
                <label className="label py-1">
                  <span className="label-text font-medium">{t('auth.password')}</span>
                </label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-base-content/30 group-focus-within:text-primary transition-colors" />
                  <input
                    type="password"
                    placeholder="Enter password"
                    className={`input input-bordered w-full pl-12 h-14 bg-base-200 focus:bg-base-100 transition-all ${errors.password ? 'input-error' : ''}`}
                    {...register("password", {
                      required: t('errors.passwordRequired'),
                      minLength: { value: 6, message: t('errors.passwordTooShort') },
                    })}
                  />
                </div>
                {errors.password && <p className="text-error text-xs mt-1 ml-1">{errors.password.message}</p>}
              </div>
            </div>

            <div className="form-control pt-2">
              <label className="label cursor-pointer justify-start gap-3">
                <input 
                  type="checkbox" 
                  aria-label="terms"
                  className="checkbox checkbox-primary checkbox-sm rounded-md" 
                  required 
                />
                <span className="text-sm text-base-content/60">
                  {t('auth.termsAgree')}{" "}
                  <span className="text-primary font-bold">{t('auth.terms')}</span>{" "}
                  {t('auth.and')}{" "}
                  <span className="text-primary font-bold">{t('auth.privacy')}</span>
                </span>
              </label>
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full h-14 text-lg shadow-lg shadow-primary/20 gap-2 group mt-4 rounded-xl"
              disabled={isLoading || isPending || isSubmitting || !isValid}
            >
              {isPending ? (
                <span className="loading loading-spinner"></span>
              ) : (
                <>
                  {t('auth.createAccount')}
                  <ArrowRight className="size-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>

            <p className="text-center text-base-content/60 pt-6">
              {t('auth.alreadyHaveAccount')}{" "}
              <Link to="/login" className="text-primary font-bold hover:underline transition-all">
                {t('auth.signIn')}
              </Link>
            </p>
          </form>
        </div>

        {/* RIGHT SIDE - ILLUSTRATION */}
        <div className="hidden lg:flex flex-col items-center justify-center bg-gradient-to-tr from-secondary/10 via-base-200 to-primary/10 p-16 relative order-1 lg:order-2">
          <div className="absolute inset-0 bg-grid-slate-200/50 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10"></div>
          
          <div className="relative max-w-sm w-full animate-float">
            <div className="absolute inset-0 bg-secondary/20 blur-[80px] rounded-full scale-125"></div>
            <img
              src={authIllustration}
              alt="Signup illustration"
              className="relative z-10 w-full drop-shadow-2xl"
              draggable="false"
            />
          </div>

          <div className="text-center mt-12 space-y-4 max-w-xs relative z-10">
            <h2 className="text-2xl font-bold">{t('auth.signupHeroTitle')}</h2>
            <p className="text-base-content/60">{t('auth.signupHeroQuote')}</p>
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

export default SignUpPage;

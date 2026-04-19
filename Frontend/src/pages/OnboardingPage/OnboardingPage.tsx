import { useState, type FC } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import Avatar, { genConfig } from "react-nice-avatar";
import {
  LoaderIcon,
  MapPinIcon,
  ShipWheelIcon,
  ShuffleIcon,
  Mars,
  Venus,
  User,
  Languages,
  ArrowRight,
  Info,
} from "lucide-react";
import useAuthUser from "../../hooks/useAuthUser";
import type { onBoardingType, UserType } from "../../types/streamify.types";
import { LANGUAGES } from "../../utils/Static";
import { useForm } from "react-hook-form";
import authServices from "../../services/auth.services";
import { useNavigate } from "react-router";

const OnboardingPage: FC = () => {
  const { authData } = useAuthUser();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const authUser: UserType = authData?.data?.user;

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isValid, errors },
    setValue,
    getValues,
    watch,
  } = useForm<onBoardingType>({
    defaultValues: {
      fullName: authUser?.fullName || "",
      bio: authUser?.bio || "",
      nativeLanguage: authUser?.nativeLanguage || "",
      learningLanguage: authUser?.learningLanguage || "",
      location: authUser?.location || "",
      profilePic: authUser?.profilePic || "",
    },
    mode: "onBlur",
  });

  const [isMale, setIsMale] = useState<boolean>(true);
  const { mutate: onboardingMutation, isPending } = useMutation({
    mutationFn: authServices.onBoarding,
    onSuccess: () => {
      toast.success("Profile onboarded successfully");
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      navigate("/");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data?.message || "Something went wrong");
    },
  });

  const submit = (data: onBoardingType) => {
    onboardingMutation(data);
  };

  const handleRandomAvatar = (): void => {
    const config: unknown = genConfig({
      sex: isMale ? "man" : "woman",
    });
    const stringifyConfig = JSON.stringify(config);
    setValue("profilePic", stringifyConfig);
    toast.success("Random profile picture generated!");
  };

  const handleChangeGender = (): void => {
    setIsMale((prev) => !prev);
  };

  return (
    <div className="min-h-screen bg-base-100 flex items-center justify-center p-4 md:p-8 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 blur-[120px] rounded-full -mr-48 -mt-48 animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary/5 blur-[120px] rounded-full -ml-48 -mb-48 animate-pulse delay-1000"></div>

      <div className="w-full max-w-4xl bg-base-100 rounded-[2.5rem] shadow-2xl border border-base-200 overflow-hidden relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
        <div className="grid lg:grid-cols-5 h-full">
          <div className="lg:col-span-2 bg-gradient-to-br from-primary to-secondary p-10 text-primary-content flex flex-col justify-between">
            <div className="space-y-8">
              <div className="flex items-center gap-3">
                <ShipWheelIcon className="size-10 text-white" />
                <span className="text-2xl font-black tracking-tighter">
                  Streamify
                </span>
              </div>
              <div className="space-y-4">
                <h1 className="text-4xl font-bold leading-tight">
                  Welcome to the community!
                </h1>
                <p className="text-primary-content/80">
                  Let's set up your profile to help you find the perfect
                  language partner.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <StepItem
                number={1}
                title="Identity"
                description="Set your name and avatar"
                active
              />
              <StepItem
                number={2}
                title="Details"
                description="Tell us about your languages"
                active
              />
              <StepItem
                number={3}
                title="Connect"
                description="Find your first partner"
              />
            </div>
          </div>

          {/* RIGHT SIDE - FORM */}
          <div className="lg:col-span-3 p-8 md:p-12 overflow-y-auto max-h-[90vh]">
            <form onSubmit={handleSubmit(submit)} className="space-y-8">
              {/* AVATAR SECTION */}
              <div className="flex flex-col items-center space-y-6 bg-base-200/50 p-8 rounded-3xl border border-dashed border-base-300">
                <div className="relative group">
                  <div className="absolute -inset-2 bg-gradient-to-r from-primary to-secondary rounded-full blur opacity-25 group-hover:opacity-50 transition duration-500"></div>
                  <div className="size-36 rounded-full bg-base-100 p-1 relative z-10 overflow-hidden shadow-xl border-2 border-base-300">
                    {
                      // eslint-disable-next-line react-hooks/incompatible-library
                      watch("profilePic") ? (
                        <Avatar
                          className="w-full h-full rounded-full"
                          {...JSON.parse(getValues("profilePic") || "{}")}
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full bg-base-200">
                          <User className="size-16 text-base-content/20" />
                        </div>
                      )
                    }
                  </div>
                  <button
                    type="button"
                    onClick={handleChangeGender}
                    className="absolute bottom-1 right-1 size-10 rounded-full bg-base-100 shadow-lg border border-base-200 flex items-center justify-center z-20 hover:scale-110 transition-transform"
                  >
                    {isMale ? (
                      <Mars className="size-5 text-blue-500" />
                    ) : (
                      <Venus className="size-5 text-pink-500" />
                    )}
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleRandomAvatar}
                  className="btn btn-outline btn-sm gap-2 hover:bg-primary hover:text-white transition-all rounded-full px-6"
                >
                  <ShuffleIcon className="size-4" />
                  Generate Random Avatar
                </button>
              </div>

              <div className="grid grid-cols-1 gap-6">
                {/* FULL NAME */}
                <div className="form-control">
                  <label className="label py-1">
                    <span className="label-text font-bold text-base-content/70 uppercase text-xs tracking-widest">
                      Display Name
                    </span>
                  </label>
                  <input
                    type="text"
                    {...register("fullName", {
                      required: "Name is required",
                      minLength: { value: 3, message: "Too short" },
                      maxLength: { value: 20, message: "Too long" },
                    })}
                    className="input input-bordered w-full h-14 bg-base-200 focus:bg-base-100 transition-all text-lg"
                    placeholder="How should we call you?"
                  />
                  {errors.fullName && (
                    <p className="text-error text-xs mt-1">
                      {errors.fullName.message}
                    </p>
                  )}
                </div>

                {/* BIO */}
                <div className="form-control">
                  <label className="label py-1">
                    <span className="label-text font-bold text-base-content/70 uppercase text-xs tracking-widest">
                      Bio
                    </span>
                  </label>
                  <textarea
                    {...register("bio", {
                      required: "Bio is required",
                      maxLength: {
                        value: 250,
                        message: "Bio must be 250 characters or fewer",
                      },
                    })}
                    className="textarea textarea-bordered h-28 bg-base-200 focus:bg-base-100 transition-all text-lg p-4"
                    placeholder="Tell us about your learning goals..."
                  />
                  {errors.bio && (
                    <p className="text-error text-xs mt-1">
                      {errors.bio.message}
                    </p>
                  )}
                </div>

                {/* LANGUAGES */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="form-control">
                    <label className="label py-1">
                      <span className="label-text font-bold text-base-content/70 uppercase text-xs tracking-widest">
                        Native
                      </span>
                    </label>
                    <div className="relative">
                      <Languages className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-base-content/30" />
                      <select
                        {...register("nativeLanguage", {
                          required: "Required",
                        })}
                        className="select select-bordered w-full pl-12 h-14 bg-base-200"
                      >
                        <option value="">Select Native</option>
                        {LANGUAGES.map((lang) => (
                          <option
                            key={`native-${lang}`}
                            value={lang.toLowerCase()}
                          >
                            {lang}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="form-control">
                    <label className="label py-1">
                      <span className="label-text font-bold text-base-content/70 uppercase text-xs tracking-widest">
                        Learning
                      </span>
                    </label>
                    <div className="relative">
                      <Languages className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-base-content/30" />
                      <select
                        {...register("learningLanguage", {
                          required: "Required",
                        })}
                        className="select select-bordered w-full pl-12 h-14 bg-base-200"
                      >
                        <option value="">Select Learning</option>
                        {LANGUAGES.map((lang) => (
                          <option
                            key={`learning-${lang}`}
                            value={lang.toLowerCase()}
                          >
                            {lang}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* LOCATION */}
                <div className="form-control">
                  <label className="label py-1">
                    <span className="label-text font-bold text-base-content/70 uppercase text-xs tracking-widest">
                      Location
                    </span>
                  </label>
                  <div className="relative">
                    <MapPinIcon className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-base-content/30" />
                    <input
                      type="text"
                      {...register("location", {
                        required: "Location is required",
                      })}
                      className="input input-bordered w-full pl-12 h-14 bg-base-200"
                      placeholder="City, Country"
                    />
                  </div>
                </div>
              </div>

              <div className="alert bg-primary/5 border-none rounded-2xl flex items-start gap-4">
                <Info className="size-5 text-primary mt-1" />
                <p className="text-sm text-base-content/70">
                  Your profile will be visible to other learners to help you
                  connect for practice sessions.
                </p>
              </div>

              <button
                className="btn btn-primary w-full h-16 text-lg shadow-xl shadow-primary/20 group"
                disabled={!isValid || isSubmitting || isPending}
                type="submit"
              >
                {isSubmitting || isPending ? (
                  <LoaderIcon className="animate-spin size-6" />
                ) : (
                  <>
                    Complete Your Profile
                    <ArrowRight className="size-6 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

const StepItem: FC<{
  number: number;
  title: string;
  description: string;
  active?: boolean;
}> = ({ number, title, description, active }) => (
  <div
    className={`flex items-start gap-4 transition-all duration-500 ${active ? "opacity-100" : "opacity-40"}`}
  >
    <div
      className={`size-10 rounded-full flex items-center justify-center font-bold border-2 ${active ? "bg-white text-primary border-white shadow-lg" : "border-white/40 text-white/40"}`}
    >
      {number}
    </div>
    <div className="space-y-1">
      <h3 className="font-bold leading-none">{title}</h3>
      <p className="text-xs text-primary-content/60">{description}</p>
    </div>
  </div>
);

export default OnboardingPage;

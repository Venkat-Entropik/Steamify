import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
// import { completeOnboarding } from "../lib/api";
import {
  LoaderIcon,
  MapPinIcon,
  ShipWheelIcon,
  ShuffleIcon,
} from "lucide-react";
import useAuthUser from "../../hooks/useAuthUser";
import type { onBoardingType, UserType } from "../../types/streamify.types";
import { LANGUAGES } from "../../utils/Static";
import { useForm } from "react-hook-form";

const OnboardingPage = () => {
  const { authData } = useAuthUser();
  const queryClient = useQueryClient();

  const authUser: UserType = authData?.data?.user;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    getValues,
    setValue,
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
  console.log("get", getValues("profilePic"));
  // const { mutate: onboardingMutation, isPending } = useMutation({
  //   mutationFn: completeOnboarding,
  //   onSuccess: () => {
  //     toast.success("Profile onboarded successfully");
  //     queryClient.invalidateQueries({ queryKey: ["authUser"] });
  //   },

  //   onError: (error) => {
  //     toast.error(error.response.data.message);
  //   },
  // });

  const submit = (data: onBoardingType) => {
    console.log("data", data);
  };

  const handleRandomAvatar = () => {
    const idx = Math.floor(Math.random() * 100) + 1; // 1-100 included
    const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`;

    setValue("profilePic", randomAvatar);
    toast.success("Random profile picture generated!");
  };

  return (
    <div className="min-h-screen bg-base-100 flex items-center justify-center p-4">
      <div className="card bg-base-200 w-full max-w-3xl shadow-xl">
        <div className="card-body p-6 sm:p-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6">
            Complete Your Profile
          </h1>

          <form onSubmit={handleSubmit(submit)} className="space-y-6">
            {/* PROFILE PIC CONTAINER */}
            <div className="flex flex-col items-center justify-center space-y-4">
              {/* IMAGE PREVIEW */}
              <div className="size-32 rounded-full bg-base-300 overflow-hidden">
                {watch("profilePic") ? (
                  <img
                    src={watch("profilePic")}
                    alt="Profile Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    {/* <CameraIcon className="size-12 text-base-content opacity-40" /> */}
                  </div>
                )}
              </div>

              {/* Generate Random Avatar BTN */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleRandomAvatar}
                  className="btn btn-accent"
                >
                  <ShuffleIcon className="size-4 mr-2" />
                  Generate Random Avatar
                </button>
              </div>
            </div>

            {/* FULL NAME */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Full Name</span>
              </label>
              <input
                type="text"
                {...register("fullName", {
                  minLength: {
                    value: 3,
                    message: "Full name should be greater than 3 characters",
                  },
                  maxLength: {
                    value: 20,
                    message: "Full name must be 20 characters or fewer",
                  },
                })}
                className="input input-bordered w-full"
                placeholder="Your full name"
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Bio</span>
              </label>
              <textarea
                {...register("bio", {
                  minLength: {
                    value: 3,
                    message: "bio should be greater than 3 characters",
                  },
                  maxLength: {
                    value: 250,
                    message: "Bio must be 250 characters or fewer",
                  },
                })}
                className="textarea textarea-bordered h-24"
                placeholder="Tell others about yourself and your language learning goals"
              />
            </div>

            {/* LANGUAGES */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* NATIVE LANGUAGE */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Native Language</span>
                </label>
                <select
                  {...register("nativeLanguage", {
                    required: {
                      value: true,
                      message: "Native language is required",
                    },
                  })}
                  className="select select-bordered w-full"
                >
                  <option value="">Select your native language</option>
                  {LANGUAGES.map((lang) => (
                    <option key={`native-${lang}`} value={lang.toLowerCase()}>
                      {lang}
                    </option>
                  ))}
                </select>
              </div>

              {/* LEARNING LANGUAGE */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Learning Language</span>
                </label>
                <select
                  {...register("learningLanguage", {
                    required: {
                      value: true,
                      message: "Learning Language is required",
                    },
                  })}
                  className="select select-bordered w-full"
                >
                  <option value="">Select language you're learning</option>
                  {LANGUAGES.map((lang) => (
                    <option key={`learning-${lang}`} value={lang.toLowerCase()}>
                      {lang}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* LOCATION */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Location</span>
              </label>
              <div className="relative">
                <MapPinIcon className="absolute top-1/2 transform -translate-y-1/2 left-3 size-5 text-base-content opacity-70" />
                <input
                  type="text"
                  {...register("location", {
                    required: {
                      value: true,
                      message: "Location is required",
                    },
                  })}
                  className="input input-bordered w-full pl-10"
                  placeholder="City, Country"
                />
              </div>
            </div>

            {/* SUBMIT BUTTON */}

            <button
              className="btn btn-primary w-full"
              disabled={!isValid || isSubmitting}
              type="submit"
            >
              {!isSubmitting ? (
                <>
                  <ShipWheelIcon className="size-5 mr-2" />
                  Complete Onboarding
                </>
              ) : (
                <>
                  <LoaderIcon className="animate-spin size-5 mr-2" />
                  Onboarding...
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default OnboardingPage;

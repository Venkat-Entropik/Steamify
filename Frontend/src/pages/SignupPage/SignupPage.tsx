import { useState } from "react";
import { ShipWheelIcon } from "lucide-react";
import { Link } from "react-router";
import signUpIllustration from "../../assets/signup-illustration.svg";
import { useForm } from "react-hook-form";
import type { signUpPayloadType } from "../../types/streamify.types";
import { emailRegexPattern } from "../../utils/Static";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import authServices from "../../services/auth.services";
import toast from "react-hot-toast";

// import useSignUp from "../hooks/useSignUp";

const SignUpPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting, isLoading },
  } = useForm<signUpPayloadType>({ mode: "onBlur" });

  const firstErrorMessage = Object.values(errors)[0]?.message;

  // This is how we did it at first, without using our custom hook
  const queryClient = useQueryClient();
  const {
    mutate: signupMutation,
    isPending,
    error,
  } = useMutation({
    mutationFn: authServices.signUp,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["authUser"] }),
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Signup failed.");
    },
  });

  // This is how we did it using our custom hook - optimized version
  // const { isPending, error, signupMutation } = useSignUp();

  const handleSignup = (data: signUpPayloadType) => {
    console.log("data", data);
    signupMutation(data);
  };

  return (
    <div
      className="h-screen flex items-center justify-center p-4 sm:p-6 md:p-8"
      data-theme="forest"
      data-testid="signup"
    >
      <div className="border border-primary/25 flex flex-col lg:flex-row w-full max-w-5xl mx-auto bg-base-100 rounded-xl shadow-lg overflow-hidden">
        {/* SIGNUP FORM - LEFT SIDE */}
        <div className="w-full lg:w-1/2 p-4 sm:p-8 flex flex-col">
          <div className="mb-4 flex items-center justify-start gap-2">
            <ShipWheelIcon className="size-9 text-primary" />
            <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider">
              Streamify
            </span>
          </div>

          {firstErrorMessage && (
            <div className="alert alert-error mb-4">
              <span>{firstErrorMessage}</span>
            </div>
          )}

          <div className="w-full">
            <form onSubmit={handleSubmit(handleSignup)}>
              <div className="space-y-4">
                <div>
                  <h2 className="text-xl font-semibold">Create an Account</h2>
                  <p className="text-sm opacity-70">
                    Join Streamify and start your language learning adventure!
                  </p>
                </div>

                <div className="space-y-3">
                  {/* FULLNAME */}
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text">Full Name</span>
                    </label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      className="input input-bordered w-full"
                      {...register("fullName", {
                        required: true,
                        maxLength: {
                          value: 20,
                          message: "name should be less than 20 characters",
                        },
                        minLength: {
                          value: 3,
                          message: "name should be greater than 3 characters",
                        },
                      })}
                      required
                    />
                  </div>
                  {/* EMAIL */}
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text">Email</span>
                    </label>
                    <input
                      type="email"
                      placeholder="Enter email"
                      className="input input-bordered w-full"
                      {...register("email", {
                        required: true,
                        pattern: {
                          value: emailRegexPattern,
                          message: "Enter a valid email address",
                        },
                      })}
                      required
                    />
                  </div>
                  {/* PASSWORD */}
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text">Password</span>
                    </label>
                    <input
                      type="password"
                      placeholder="Enter password"
                      className="input input-bordered w-full"
                      {...register("password", {
                        required: true,
                        maxLength: {
                          value: 20,
                          message: "Password should be less than 20 characters",
                        },
                        minLength: {
                          value: 6,
                          message:
                            "Password should be greater than 6 characters",
                        },
                      })}
                      required
                    />
                    <p className="text-xs opacity-70 mt-1">
                      Password must be at least 6 characters long
                    </p>
                  </div>

                  <div className="form-control">
                    <label className="label cursor-pointer justify-start gap-2">
                      <input
                        type="checkbox"
                        className="checkbox checkbox-sm"
                        required
                        placeholder="termsAndCondition"
                      />
                      <span className="text-xs leading-tight">
                        I agree to the{" "}
                        <span className="text-primary hover:underline">
                          terms of service
                        </span>{" "}
                        and{" "}
                        <span className="text-primary hover:underline">
                          privacy policy
                        </span>
                      </span>
                    </label>
                  </div>
                </div>

                <button
                  className="btn btn-primary w-full"
                  type="submit"
                  disabled={isLoading || isSubmitting || !isValid}
                >
                  {isLoading || isPending ? (
                    <>
                      <span className="loading loading-spinner loading-xs"></span>
                      Loading...
                    </>
                  ) : (
                    "Create Account"
                  )}
                </button>

                <div className="text-center mt-4">
                  <p className="text-sm">
                    Already have an account?{" "}
                    <Link to="/login" className="text-primary hover:underline">
                      Sign in
                    </Link>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>

        <div className="hidden lg:flex w-full lg:w-1/2 bg-primary/10 items-center justify-center">
          <div className="max-w-md p-8">
            <div className="relative aspect-square max-w-sm mx-auto">
              <img
                src={signUpIllustration}
                alt="Language connection illustration"
                className="w-full h-full"
                draggable={false}
              />
            </div>

            <div className="text-center space-y-3 mt-6">
              <h2 className="text-xl font-semibold">
                Connect with language partners worldwide
              </h2>
              <p className="opacity-70">
                Practice conversations, make friends, and improve your language
                skills together
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;

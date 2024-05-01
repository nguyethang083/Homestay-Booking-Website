import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";
import { Link, useLocation, useNavigate } from "react-router-dom";

export type SignInFormData = {
  email: string;
  password: string;
};

const SignIn = () => {
  const { showToast } = useAppContext();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const location = useLocation();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<SignInFormData>();

  const mutation = useMutation(apiClient.signIn, {
    onSuccess: async () => {
      //localStorage.setItem("isLoggedIn", "true");
      showToast({ message: "Sign in Successful!", type: "SUCCESS" });
      await queryClient.invalidateQueries("validateToken");
      navigate(location.state?.from?.pathname || "/");
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });

  return (
    <div className="container mx-auto p-1 flex justify-center min-h-[380px]">
      <form className="flex flex-col gap-5 shadow-lg w-1/2" onSubmit={onSubmit}>
        <div className="flex items-center justify-center">
          <div className="flex flex-col w-5/6">
            <h2 className="text-4xl font-semibold mb-3 text-center">
              Welcome back
            </h2>
            <h2 className="text-lg opacity-60 mb-6 text-center">
              Login to access your Golobe account
            </h2>
            <label className="text-gray-700 text-sm font-bold mb-1">
              Email
            </label>
            <input
              type="email"
              className="border border-mint rounded w-full py-1 px-2 font-normal"
              {...register("email", { required: "This field is required" })}
            />
            {errors.email && (
              <span className="text-red-500">{errors.email.message}</span>
            )}
            <label className="text-gray-700 text-sm font-bold mb-1 mt-4">
              Password
            </label>
            <input
              type="password"
              className="border border-mint rounded w-full py-1 px-2 font-normal"
              {...register("password", {
                required: "This field is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            />
            {errors.password && (
              <span className="text-red-500">{errors.password.message}</span>
            )}
          </div>
        </div>
        <div className="flex flex-col items-center">
          <button
            type="submit"
            className="bg-mint text-black p-2 font-semibold hover:bg-orange-500 hover:text-white text-sm w-5/6 rounded py-2 mt-2"
          >
            Login
          </button>
          <div className="mt-4">
            <span className="text-sm">
              Not Registered?{" "}
              <Link className="text-orange-500 font-medium" to="/register">
                Create an account here
              </Link>
            </span>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignIn;

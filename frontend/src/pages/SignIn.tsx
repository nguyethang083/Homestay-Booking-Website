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
    <form className="flex flex-col gap-5" onSubmit={onSubmit}>
      <div className="flex items-center justify-center">
        <div className="flex flex-col w-1/2">
          <h2 className="text-3xl font-bold font-trade-gothic mb-2">Login</h2>
          <h2 className="text-xl font-thin mb-5">
            Login to access your Golobe account
          </h2>
          <label className="text-gray-700 text-sm font-bold mb-1">Email</label>
          <input
            type="email"
            className="border border-black rounded w-full py-1 px-2 font-normal"
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
            className="border border-black rounded w-full py-1 px-2 font-normal"
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
          className="bg-mint text-black p-2 font-medium hover:bg-orange-500 hover:text-white text-sm w-1/2 rounded py-2 mt-2 "
        >
          Login
        </button>
        <div className="mt-4">
          <span className="text-sm font-medium">
            Not Registered?{" "}
            <Link className="text-orange-500" to="/register">
              Create an account here
            </Link>
          </span>
        </div>
      </div>
    </form>
  );
};

export default SignIn;

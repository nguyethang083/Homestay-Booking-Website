import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";
import { Link, useNavigate } from "react-router-dom";

export type RegisterFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Register = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { showToast } = useAppContext();

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>();

  const mutation = useMutation(apiClient.register, {
    onSuccess: async () => {
      showToast({ message: "Registration Success!", type: "SUCCESS" });
      await queryClient.invalidateQueries("validateToken");
      navigate("/");
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });

  return (
    <div className="flex items-center justify-center">
      <form className="flex flex-col gap-5" onSubmit={onSubmit}>
        <h2 className="text-3xl font-bold font-trade-gothic -mb-2">Sign Up</h2>
        <h2 className="text-xl font-thin mb-1">
          Set up so you can access your personal account
        </h2>
        <div className="flex flex-col md:flex-row gap-5">
          <div className="flex flex-col">
            <label className="text-gray-700 text-sm font-bold">
              First Name
              <input
                className="border border-black rounded w-full py-1 px-2 font-normal"
                {...register("firstName", {
                  required: "This field is required",
                })}
              ></input>
            </label>
            {errors.firstName && (
              <span
                style={{ fontSize: "14px" }}
                className="text-red-500 font-normal"
              >
                {errors.firstName.message}
              </span>
            )}
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700 text-sm font-bold flex-1">
              Last Name
              <input
                className="border border-black rounded w-full py-1 px-2 font-normal"
                {...register("lastName", {
                  required: "This field is required",
                })}
              ></input>
            </label>
            {errors.lastName && (
              <span
                style={{ fontSize: "14px" }}
                className="text-red-500 font-normal"
              >
                {errors.lastName.message}
              </span>
            )}
          </div>
        </div>
        <label className="text-gray-700 text-sm font-bold flex-1">
          Email
          <input
            type="email"
            className="border border-black rounded w-full py-1 px-2 font-normal"
            {...register("email", { required: "This field is required" })}
          ></input>
          {errors.email && (
            <span className="text-red-500 font-normal">
              {errors.email.message}
            </span>
          )}
        </label>
        <label className="text-gray-700 text-sm font-bold flex-1">
          Password
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
          ></input>
          {errors.password && (
            <span className="text-red-500 font-normal">
              {errors.password.message}
            </span>
          )}
        </label>
        <label className="text-gray-700 text-sm font-bold flex-1">
          Confirm Password
          <input
            type="password"
            className="border border-black rounded w-full py-1 px-2 font-normal"
            {...register("confirmPassword", {
              validate: (val) => {
                if (!val) {
                  return "This field is required";
                } else if (watch("password") !== val) {
                  return "Your passwords do no match";
                }
              },
            })}
          ></input>
          {errors.confirmPassword && (
            <span className="text-red-500 font-normal">
              {errors.confirmPassword.message}
            </span>
          )}
        </label>
        <div className="flex flex-col items-center">
          <button
            type="submit"
            className="bg-mint text-black p-2 font-medium hover:bg-orange-500 hover:text-white w-full text-sm rounded py-2 mt-2"
          >
            Create account
          </button>
          <div className="mt-4">
            <span className="text-sm font-medium">
              Already have an account?{" "}
              <Link className="text-orange-500" to="/sign-in">
                Login
              </Link>
            </span>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;

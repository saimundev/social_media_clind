import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRegusterUserMutation } from "../../store/services/authApi";
import toast from "react-hot-toast";

import { getUser } from "../../store/features/AuthSlice";
import { useAppDispatch } from "../../store/hooks";

export interface IFormData {
  name: string;
  email: string;
  password: string;
}

const schema = yup
  .object({
    name: yup.string().required().min(3).max(30),
    email: yup.string().required().email().min(5).max(50),
    password: yup.string().required().min(5).max(30),
  })
  .required();

const Reguster = () => {
  const [RegusterData, { data, isLoading, isSuccess, error }] =
    useRegusterUserMutation();
  const [message, setMessage] = useState("");
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormData>({
    resolver: yupResolver(schema),
  });

  //   show error message
  useEffect(() => {
    error && toast.error((error as any).data?.message);
  }, [error]);

  //show success message
  useEffect(() => {
    if (isSuccess) {
      toast.success("User Create Successfull");
      setMessage(
        "Congratulation! Successfully crate account. Plese Varefied your email"
      );
      localStorage.setItem("auth", JSON.stringify(data));
      dispatch(getUser(data));

      //clear input
      reset({
        email: "",
        name: "",
        password: "",
      });
    }
  }, [isSuccess]);

  const handleReguster = handleSubmit(async (data) => {
    await RegusterData(data);
  });
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="w-1/3 p-4 shadow-2xl">
        {message && (
          <p className="text-lg text-green-500 font-medium py-2">{message}</p>
        )}
        <form onSubmit={handleReguster}>
          <div className="">
            <input
              type="text"
              {...register("name")}
              id=""
              placeholder="Enter Your Name..."
              className="w-full p-3 rounded border border-gray-300 outline-none"
            />
            {/* Errow Message */}
            <p className="text-sm text-red-500 font-medium">
              {errors?.name?.message}
            </p>
          </div>
          <div className="mt-5">
            <input
              type="text"
              {...register("email")}
              id=""
              placeholder="Enter Your Email..."
              className="w-full p-3 rounded border border-gray-300 outline-none"
            />
            {/* Errow Message */}
            <p className="text-sm text-red-500 font-medium">
              {errors?.email?.message}
            </p>
          </div>
          <div className="mt-5">
            <input
              type="password"
              {...register("password")}
              id=""
              placeholder="Enter Your Password..."
              className="w-full p-3 rounded border border-gray-300 outline-none"
            />
            {/* Errow Message */}
            <p className="text-sm text-red-500 font-medium">
              {errors?.password?.message}
            </p>
          </div>
          <button
            disabled={isLoading}
            className="bg-green-500 text-white rounded font-medium px-6 py-2 w-full block mt-5"
          >
            {isLoading ? "Pending" : "Submit"}
          </button>
          <Link
            to="/login"
            className="text-sm font-medium text-blue-500 block mt-3 text-center"
          >
            Alrady have account? Login Plese
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Reguster;

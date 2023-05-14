import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { IFormData } from "./Reguster";
import { useLoginUserMutation } from "../../store/services/authApi";
import toast from "react-hot-toast";
import { useAppDispatch } from "../../store/hooks";
import { getUser } from "../../store/features/AuthSlice";


const schema = yup
  .object({
    email: yup.string().required().email().min(5).max(50),
    password: yup.string().required().min(5).max(30),
  })
  .required();

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormData>({
    resolver: yupResolver(schema),
  });

  const [loginUserData, {data,isLoading, isSuccess, error }] =
    useLoginUserMutation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  //   show error message
  useEffect(() => {
    error && toast.error((error as any).data?.message);
  }, [error]);

  useEffect(() => {
    if (isSuccess) {
      navigate("/");
      toast.success("Login successfull");
      localStorage.setItem("auth",JSON.stringify(data))
      dispatch(getUser(data))
    }
  }, [isSuccess]);

  const handleLogin = handleSubmit(async (data) => {
    await loginUserData(data);
  });
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="w-1/3 p-4 shadow-2xl">
        <form onSubmit={handleLogin}>
          <div className="">
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
          <Link
            to="/forget-password"
            className="text-sm font-medium text-blue-500 block mt-2 text-right"
          >
            Foreated Your Password
          </Link>
          <button
            disabled={isLoading}
            className="bg-green-500 text-white rounded font-medium px-6 py-2 w-full block mt-5"
          >
            {isLoading ? "Pendig..." : "Submit"}
          </button>
          <Link
            to="/reguster"
            className="text-sm font-medium text-blue-500 block mt-3 text-center"
          >
            Don't You have a account? Reguster Plese
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;

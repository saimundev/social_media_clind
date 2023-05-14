import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useForgetPasswordUpdateMutation } from "../../store/services/authApi";
import { toast } from "react-hot-toast";

const UPdatePassword = () => {
  const [password, setPassword] = useState("");
  const [passwordCon, setPasswordCon] = useState("");
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [passwordUpdate, { isLoading, isSuccess, error }] =
    useForgetPasswordUpdateMutation();
  const navigation = useNavigate();

  useEffect(()=>{
    error && toast.error((error as any)?.data?.message)
  },[error])

  useEffect(() => {
    if (isSuccess) {
      toast.success("Password update successfull");
      navigation("/login");
    }
  }, [isSuccess]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if(!password || !passwordCon ) return toast.error("Password and confirm password is required")
    if(password !== passwordCon ) return toast.error("Password and confirm password not same")
    const updatePassword = {
        password:password
    }
    await passwordUpdate({token,updatePassword});
  };
  return (
    <div className="flex justify-center mt-10">
      <div className="w-1/3">
        <div className="">
          <h1 className="text-2xl font-medium mb-4 dark:text-gray-300">
            Enter Your New Password
          </h1>
          <p className="text-sm text-gray-500 font-medium mb-2 dark:text-gray-400">
            Enter Your Password and confirm password
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mt-3">
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              placeholder="Enter Your Password..."
              className="w-full dark:bg-gray-700 dark:border-gray-600 p-2 rounded border border-gray-300 outline-none"
              name=""
              id=""
            />
          </div>

          <div className="mt-3">
            <input
              type="password"
              onChange={(e) => setPasswordCon(e.target.value)}
              value={passwordCon}
              placeholder="Enter Your Confirm Password..."
              className="w-full dark:bg-gray-700 dark:border-gray-600 p-2 rounded border border-gray-300 outline-none"
              name=""
              id=""
            />
          </div>
          <button
            disabled={isLoading}
            className="bg-green-500 dark:bg-gray-700 text-white rounded px-8 py-2 block mt-4"
          >
            {isLoading ? "Pending..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UPdatePassword;

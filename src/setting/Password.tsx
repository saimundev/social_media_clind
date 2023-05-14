import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useChanglePasswordMutation } from "../store/services/authApi";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { useNavigate } from "react-router-dom";
import { logOUt } from "../store/features/AuthSlice";

const Password = () => {
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [conNewPassword, setConNewPassword] = useState("");
  const [passwordData, { isLoading, isSuccess, error }] =
    useChanglePasswordMutation();
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const email = user?.user?.email;
  const navigate = useNavigate();

  useEffect(() => {
    error && toast.error((error as any)?.data?.message);
  }, [error]);

  useEffect(() => {
    if (isSuccess) {
      dispatch(logOUt());
      navigate("/login");
      toast.success("Password chagnel successfully")
    }
  }, [isSuccess]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password || !newPassword || !conNewPassword) {
      return toast.error("All Field Are required");
    }

    if(newPassword !== conNewPassword){
        return toast.error("Password and confirm password not match")
    }

    const data = {
      password,
      newPassword,
      email,
    };

    await passwordData(data);
  };
  return (
    <div className="flex justify-center mt-10">
      <div className="w-1/2">
        <div className="">
          <h1 className="text-2xl font-medium mb-2 dark:text-gray-300">
            Are You Sure. Change Your Password
          </h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mt-3">
            <span className="text-gray-500 font-medium ">
              Enter Your Password
            </span>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              placeholder="Enter Your Password..."
              className="w-full dark:bg-gray-700 dark:border-gray-600 p-2 rounded border border-gray-300 outline-none mt-1"
              name=""
              id=""
            />
          </div>
          <div className="mt-3">
            <span className="text-gray-500 font-medium">
              Enter Your New Password
            </span>
            <input
              type="password"
              onChange={(e) => setNewPassword(e.target.value)}
              value={newPassword}
              placeholder="Enter Your New Password..."
              className="w-full dark:bg-gray-700 dark:border-gray-600 p-2 rounded border border-gray-300 outline-none mt-1"
              name=""
              id=""
            />
          </div>
          <div className="mt-3">
            <span className="text-gray-500 font-medium">
              Enter Your New Confirm Password
            </span>
            <input
              type="password"
              onChange={(e) => setConNewPassword(e.target.value)}
              value={conNewPassword}
              placeholder="Enter Your Current Password..."
              className="w-full dark:bg-gray-700 dark:border-gray-600 p-2 rounded border border-gray-300 outline-none mt-1"
              name=""
              id=""
            />
          </div>
          <button className="bg-green-500 dark:bg-gray-700 text-white rounded px-8 py-2 block mt-4">
            {isLoading ? "Pending..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Password;

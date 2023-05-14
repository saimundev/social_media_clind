import React, { useEffect, useState } from "react";

import ProfileInfo from "./ProfileInfo";
import ProfilePost from "./PrifilePost";
import Container from "../../components/Container";
import Friend from "./Friend";
import Header from "../../components/Header";
import {
  useGetSinglePostQuery,
  useUpdatePostMutation,
} from "../../store/services/postApi";
import { toast } from "react-hot-toast";
import { BsXLg } from "react-icons/bs";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  useGetUserQuery,
  useUpdateCoverPhotoMutation,
  useUpdateUserMutation,
} from "../../store/services/authApi";
import { coverModel, profileModel } from "../../store/features/AuthSlice";

const Profile = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [status, setStatus] = useState("");
  const [profile, setProfile] = useState<any>(null);

  const [post, setPost] = useState("");
  const [image, setImage] = useState<any>(null);
  const [coverImage, setCoverImage] = useState<any>(null);
  const [show, setShow] = useState(false);
  const [id, setId] = useState(0);
  const feachId = (postId: number) => {
    setId(postId);
  };
  const {
    show: showModel,
    user,
    profileShow,
  } = useAppSelector((state) => state.auth);
  const { data } = useGetSinglePostQuery(id);
  const [updatePostData, { isLoading, isSuccess, error }] =
    useUpdatePostMutation();
  const [coverUp, { isLoading: loding, isSuccess: success }] =
    useUpdateCoverPhotoMutation();
  const [userUpdaeData, { isLoading: lod, isSuccess: succ, }] =
    useUpdateUserMutation();

  const getId = user?.user?._id;

  const { data: userData } = useGetUserQuery(getId);

  useEffect(() => {
    setName(userData?.name);
    setAddress(userData?.address);
    setCity(userData?.city);
    setStatus(userData?.status);
  }, [getId, userData]);

  const dispatch = useAppDispatch();

  // errror feach data
  useEffect(() => {
    error && toast.error("something went wrong");
    setShow(false);
  }, [error]);

  //errror feach data
  useEffect(() => {
    isSuccess && toast.success("Update successfull");
    setShow(false);
  }, [isSuccess]);

  useEffect(() => {
    setPost(data?.post);
  }, [id, data]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!post) return toast.error("Empty in not allowed");

    const formData = new FormData();
    formData.append("post", post);
    formData.append("image", image);

    //send data
    await updatePostData({ formData, id });
  };

  //user id
  const userId = user?.user?._id;

  //success message cover photo
  useEffect(() => {
    if (success) {
      toast.success("Cover Photo Update Successfully");
      dispatch(coverModel(false));
    }
  }, [success]);

  //udpae cover photo
  const hanldeCoverPhoto = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("coverImage", coverImage);

    //send data
    coverUp({ formData, userId });
  };

  useEffect(() => {
    if (succ) {
      toast.success("User Update Successfull");
      dispatch(profileModel(false));
    }
  }, [succ]);

  const handleUpdateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return toast.error("name is required");

    //form data
    const formData = new FormData();
    formData.append("name", name);
    formData.append("address", address);
    formData.append("city", city);
    formData.append("status", status);
    formData.append("profile", profile);

    //send data
    await userUpdaeData({ formData, userId });
  };

  return (
    <>
      {show && (
        <div className="w-full h-screen fixed bg-black/80 z-50 flex justify-center items-center">
          <div className="w-1/3 bg-white dark:bg-gray-700 dark:text-gray-300 p-5 rounded">
            <form onSubmit={handleUpdate}>
              <div className="">
                <textarea
                  onChange={(e) => setPost(e.target.value)}
                  value={post}
                  name=""
                  id=""
                  className="w-full h-[100px] outline-none border dark:bg-gray-700 dark:text-gray-300 border-gray-300 rounded"
                ></textarea>
              </div>
              {!image && (
                <img
                  src={data?.image}
                  className="w-full h-[200px] object-cover"
                />
              )}
              {image ? (
                <div className="relative">
                  <img
                    src={URL.createObjectURL(image)}
                    className="w-full h-[200px] object-cover"
                    alt=""
                  />
                  <div
                    onClick={() => setImage("")}
                    className="absolute top-2 right-2 text-2xl border border-black p-1 cursor-pointer text-red-500"
                  >
                    <BsXLg />
                  </div>
                </div>
              ) : (
                <div className="mt-2">
                  <label className="block">
                    <span className="sr-only">Choose profile photo</span>
                    <input
                      type="file"
                      onChange={(e: any) => setImage(e.target.files[0])}
                      className="block w-full text-sm text-gray-500 cursor-pointer mt-1
      file:mr-4 file:py-2 file:px-4
      file:cursor-pointer
      file:rounded-md file:border-0
      file:text-sm file:font-semibold
      file:bg-green-500 file:text-white
      hover:file:bg-green-600
    "
                    />
                  </label>
                </div>
              )}

              <button className="w-full bg-green-500 text-white font-medium rounded p-2 block mt-5">
                {isLoading ? "Pending..." : "Update"}
              </button>
              <button
                onClick={() => setShow((prev) => !prev)}
                className="w-full border border-red-500 text-red-500 hover:bg-red-500 hover:text-white duration-300 font-medium rounded p-2 block mt-5"
              >
                cancel
              </button>
            </form>
          </div>
        </div>
      )}

      {showModel && (
        <div className="fixed w-full h-screen flex justify-center items-center bg-black/60 z-50">
          <div className="w-1/3 bg-white dark:bg-gray-700 dark:text-gray-300 rounded p-8">
            <form onSubmit={hanldeCoverPhoto}>
              {coverImage ? (
                <img
                  onClick={() => setCoverImage("")}
                  src={URL.createObjectURL(coverImage)}
                  alt=""
                  className="w-full h-[200px] object-cover"
                />
              ) : (
                <input
                  type="file"
                  onChange={(e: any) => setCoverImage(e.target.files[0])}
                  name=""
                  id=""
                  className="file:bg-green-500 file:p-2 file:text-white file:border file:border-green-500 file:rounded border border-gray-300 w-full rounded cursor-pointer text-lg"
                />
              )}

              <button
                disabled={loding}
                type="submit"
                className="bg-green-500 text-white rounded p-2 w-full block mt-8"
              >
                {loding ? "Pending..." : "Update"}
              </button>

              <button
                onClick={() => dispatch(coverModel(false))}
                className="bg-red-500 text-white rounded p-2 w-full block mt-3"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}

      {profileShow && (
        <div className="w-full h-screen fixed bg-black/60 flex justify-center items-center z-50">
          <form
            onSubmit={handleUpdateUser}
            className="p-5 w-1/3 rounded bg-white dark:bg-gray-700 dark:text-gray-300 "
          >
            <div className="mt-3">
              <input
                type="text"
                placeholder="Enter Your Name"
                className="w-full rounded p-2 border dark:bg-gray-700 dark:text-gray-300 border-gray-300 outline-none"
                name=""
                onChange={(e) => setName(e.target.value)}
                value={name}
                id=""
              />
            </div>
            <div className="mt-3">
              <input
                type="text"
                placeholder="Enter Your address"
                className="w-full rounded dark:bg-gray-700 dark:text-gray-300 p-2 border border-gray-300 outline-none"
                onChange={(e) => setAddress(e.target.value)}
                value={address}
                name=""
                id=""
              />
            </div>
            <div className="mt-3">
              <input
                type="text"
                placeholder="Enter Your city"
                className="w-full rounded dark:bg-gray-700 dark:text-gray-300 p-2 border border-gray-300 outline-none"
                onChange={(e) => setCity(e.target.value)}
                value={city}
                name=""
                id=""
              />
            </div>
            <div className="mt-3">
              <select
                name=""
                id=""
                className="w-full p-2 outline-none border dark:bg-gray-700 dark:text-gray-300 border-gray-300 cursor-pointer"
                onChange={(e) => setStatus(e.target.value)}
                value={status}
              >
                <option disabled value="">
                  Chose A Status
                </option>
                <option value="single">Single</option>
                <option value="relationship">RealtionShip</option>
                <option value="marid">Marid</option>
              </select>
            </div>

            {!profile && (
              <img
                src={userData?.profile}
                alt=""
                className="w-full h-[200px] object-cover rounded mt-3"
              />
            )}
            {profile ? (
              <img
                src={URL.createObjectURL(profile)}
                alt="image"
                className="w-full h-[200px] object-cover rounded mt-3"
              />
            ) : (
              <div className="mt-3">
                <input
                  type="file"
                  placeholder="Enter Your city"
                  className=" file:rounded file:cursor-pointer file:p-2 w-full rounded file:outline-none file:border-0 file:text-white file:font-semibold cursor-pointer file:bg-green-500 border border-gray-300 outline-none"
                  name=""
                  onChange={(e: any) => setProfile(e.target.files[0])}
                  id=""
                />
              </div>
            )}

            <button
              disabled={lod}
              className="w-full p-2 text-white bg-green-500 rounded font-semibold mt-6"
            >
              {lod ? "Pending" : "Update"}
            </button>
            <button
              onClick={() => dispatch(profileModel(false))}
              className="w-full p-2 border border-red-500 rounded mt-4 font-semibold text-red-500 hover:bg-red-500 hover:text-white duration-300"
            >
              Cancel
            </button>
          </form>
        </div>
      )}
      <Header />
      <Container>
        <div className="grid grid-cols-[350px_1fr_300px] gap-6 mt-6">
          <div className="">
            <ProfileInfo />
          </div>
          <ProfilePost setShow={setShow} feachId={feachId} />
          <div className="">
            <h1 className="text-lg font-medium">Friend List</h1>
            <Friend />
          </div>
        </div>
      </Container>
    </>
  );
};

export default Profile;

import React, { useEffect, useState } from "react";
import {
  useCreatePostMutation,
} from "../../store/services/postApi";
import { useAppSelector } from "../../store/hooks";
import toast from "react-hot-toast";
import { BsXLg } from "react-icons/bs";
import ShowPost from "./ShowPost";

const ProfilePost = ({setShow,feachId}:{setShow:React.Dispatch<React.SetStateAction<boolean>>,feachId:(postId: number) => void}) => {
  const { user } = useAppSelector((state) => state.auth);

  const [postCreate, { isLoading: loding, isSuccess, error }] =
    useCreatePostMutation();
  const [post, setPost] = useState("");
  const [image, setImage] = useState<any>(null);

  //create post errror message
  useEffect(() => {
    error && toast.error((error as any).data.message);
  }, [error]);

  //create post success message
  useEffect(() => {
    isSuccess && toast.success("Post Create Successfull");
  }, [isSuccess]);

  // //feach post errror message
  // useEffect(() => {
  //   err && toast.error((err as any).data.message);
  // }, [err]);

  const userId = user?.user?._id;
  const handelSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    //form validation
    if (!post) return toast.error("Post is Required");

    //form data
    const formData = new FormData();
    formData.append("userId", userId);
    formData.append("post", post);
    formData.append("image", image);

    //send data
    await postCreate(formData);

    //clear input
    setPost("");
    setImage("");
  };

  return (
    <div className="mt-0">
      <form onSubmit={handelSubmit} className="mb-10">
        <div className="">
          <textarea
            name=""
            id=""
            value={post}
            onChange={(e) => setPost(e.target.value)}
            placeholder="What's on your mind"
            className="w-full h-[100px] p-2 dark:bg-gray-700 dark:border-gray-500 font-medium text-sm text-gray-500 border border-gray-300 rounded outline-none"
          ></textarea>
        </div>
        {image ? (
          <div className="relative">
            <img
              src={URL.createObjectURL(image)}
              alt=""
              className="w-full h-[200px] object-cover rounded"
            />
            <div
              onClick={() => setImage(null)}
              className="absolute top-2 right-2 text-white text-lg cursor-pointer font-bold border-2 border-black p-1"
            >
              <BsXLg />
            </div>
          </div>
        ) : (
          <div className="">
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
      dark:file:bg-gray-700
    "
              />
            </label>
          </div>
        )}
        <button
          disabled={loding}
          className="bg-green-500 w-full p-2 dark:bg-gray-700 rounded text-white font-medium text-md mt-4"
        >
          {loding ? "Pending..." : "Post"}
        </button>
      </form>
      <ShowPost setShow={setShow} feachId={feachId}/>
    </div>
  );
};

export default ProfilePost;

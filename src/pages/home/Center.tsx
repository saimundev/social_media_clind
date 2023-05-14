import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useCreatePostMutation } from "../../store/services/postApi";
import { useAppSelector } from "../../store/hooks";
import { BsXLg } from "react-icons/bs";
import ShowTimeLine from "./ShowTimeLine";

const Center = () => {
  const [postCreate, { isLoading, isSuccess, error }] = useCreatePostMutation();
  const [post, setPost] = useState("");
  const [image, setImage] = useState<any>(null);
  const { user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    error && toast.error((error as any).data.message);
  }, [error]);

  useEffect(() => {
    isSuccess && toast.success("Post Create Successfull");
  }, [isSuccess]);

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
    setImage("")
  };

  return (
    <div>
      <form onSubmit={handelSubmit}>
        <div className="">
          <textarea
            name=""
            id=""
            value={post}
            onChange={(e) => setPost(e.target.value)}
            placeholder="What's on your mind"
            className="w-full h-[100px] p-2 dark:bg-gray-800 dark:border-gray-600 font-medium text-sm text-gray-500 border border-gray-300 rounded outline-none"
          ></textarea>
        </div>
        {image ? (
          <div className="relative">
            <img
              src={URL.createObjectURL(image)}
              alt=""
              className="w-full h-[200px] object-cover rounded"
            />
            <div onClick={()=>setImage(null)} className="absolute top-2 right-2 text-white text-lg cursor-pointer font-bold border-2 border-black p-1">
            <BsXLg/>
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
      dark:file:bg-gray-800
    "
              />
            </label>
          </div>
        )}
        <button
          disabled={isLoading}
          className="bg-green-500 w-full dark:bg-gray-800 p-2 rounded text-white font-medium text-md mt-4"
        >
          {isLoading ? "Pending..." : "Post"}
        </button>
      </form>

      {/* show post */}
      <ShowTimeLine />
    </div>
  );
};

export default Center;

import React, { useEffect, useState } from "react";
import {
  MdOutlineFavoriteBorder,
  MdFavorite,
  MdOutlineInsertComment,
} from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useCommentPostMutation, useDeletePostMutation, useLikePostMutation } from "../store/services/postApi";
import { toast } from "react-hot-toast";
import moment from "moment"

const ProfileCart = ({ post,userData,setShow,feachId }:{
    setShow: React.Dispatch<React.SetStateAction<boolean>>;
    feachId: (postId: number) => void;
    post:any
    userData:any
  }) => {
  const [menuShow, setMenuShow] = useState(false);
  const [showComment, setShowComment] = useState(false);
  const [commentText, setCommentText] = useState("");

  const [likePost] = useLikePostMutation();
  const [commnet, {isLoading }] = useCommentPostMutation();
  const [deletePostItem, { error: err }] = useDeletePostMutation();

  const handleDelete = (id: number) => {
    deletePostItem(id);
    toast.success("Delete Successfull");
  };
console.log(post)
    //delete error message
    useEffect(() => {
        err && toast.error("something went wrong");
      }, [err]);

  const hanldeLike = async (postId: number) => {
    const currentUser = {
      userId: userData?._id,
    };

    await likePost({ currentUser, postId });
  };

  const handleComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if(!commentText) return toast.error("comment is required");
    const postComment = {
      userId: userData?._id,
      comment: commentText,
    };
    const userPostId = post._id
    await commnet({ postComment, userPostId });

    //clear input
    setCommentText("");
  };

  return (
    <div className="mt-14">
      <div className="flex items-center justify-between gap-4">
        <div className="flex gap-4 items-center">
          <img
            src={userData?.profile}
            className="w-[50px] h-[50px] rounded-full "
            alt=""
          />
          <div className="flex flex-col">
            <span className="text-lg font-semibold dark:text-gray-500">{userData?.name}</span>
            <span className="text-sm font-medium text-gray-500">
              {moment(post.createdAt).fromNow()}
            </span>
          </div>
        </div>
        <div
          className="text-xl p-2 cursor-pointer relative"
          onClick={() => setMenuShow((prev) => !prev)}
        >
          <BsThreeDotsVertical className="dark:text-gray-500"/>
          {/* Dropdown menu */}
          {menuShow && (
            <div className="w-[150px] absolute top-[100%] left-0 dark:bg-gray-600 bg-white rounded shadow-lg border border-gray-300 text-center divide-y dark:divide-gray-700 divide-gray-300">
              <div
                className=""
                onClick={() => [feachId(post._id), setShow((prev) => !prev)]}
              >
                <Link
                  to="#"
                  className="text-sm font-medium py-2 block hover:bg-green-500 hover:text-white duration-300"
                >
                  Edit
                </Link>
              </div>
              <div className="" onClick={() => handleDelete(post._id)}>
                <Link
                  to="#"
                  className="text-sm font-medium py-2 block hover:bg-red-500 hover:text-white duration-300"
                >
                  Delete
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
      <h1 className="text-md font-reguler py-3 dark:text-gray-500">{post.post}</h1>
      <img
        src={post.image}
        className="w-full h-[300px] object-cover rounded"
        alt=""
      />

      <div className="flex justify-between py-1">
        <div
          onClick={() => hanldeLike(post._id)}
          className="text-4xl border dark:border-gray-700 border-gray-300 flex-1 px-2 flex justify-center items-center hover:bg-gray-300 duration-300 cursor-pointer"
        >
          {post?.likes?.includes(userData?._id) ? (
            <MdFavorite style={{ color: "red" }} />
          ) : (
            <MdOutlineFavoriteBorder className="dark:text-gray-600"/>
          )}
          <span className="text-xl ml-2 font-medium text-red-500">
            {post?.likes?.length > 0 ? post?.likes?.length : ""}
          </span>
        </div>
        <div
          onClick={() => setShowComment((prev) => !prev)}
          className="text-4xl border border-gray-300 dark:border-gray-600 flex-1 flex justify-center hover:bg-gray-300 duration-300 cursor-pointer"
        >
          <MdOutlineInsertComment className="dark:text-gray-600"/>
          <h5 className="text-xl font-semibold ml-2 dark:text-gray-600">
            {post?.comments?.length > 0 && post?.comments?.length}
          </h5>
        </div>
      </div>

      {/* add comment */}
      {showComment ? (
        <div className="">
          <form onSubmit={handleComment} className="mb-6">
            <input
              type="text"
              className="w-full p-2 outline-none"
              placeholder="Write A Comment..."
              onChange={(e) => setCommentText(e.target.value)}
              value={commentText}
              name=""
              id=""
            />
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-1 rounded mt-1"
            >
              {isLoading ? "pending..." : "Comment"}
            </button>
          </form>

          {/* show comment */}
          <div className="">
            {post?.comments?.map((comment: any) => (
              <div className="mb-4">
                <div className="flex gap-3 items-center">
                  {userData?.profile ? (
                    <img
                      className="w-[40px] h-[40px] object-cover rounded-full border border-black"
                      src={userData?.profile}
                      alt=""
                    />
                  ) : (
                    userData?.name?.slice(0, 1)
                  )}
                  <h4 className="text-sm font-medium text-gray-600">
                    {userData?.name}
                  </h4>
                </div>
                <h2 className="text-md font-semibold mt-1">
                  {comment.comment}
                </h2>
              </div>
            ))}
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default ProfileCart;

import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { useCommentPostMutation, useLikePostMutation } from '../store/services/postApi';
import { toast } from 'react-hot-toast';
import {
    MdOutlineFavoriteBorder,
    MdFavorite,
    MdOutlineInsertComment,
  } from "react-icons/md";
import { useAppSelector } from '../store/hooks';
const FriendCart = ({post,userData}:{post:any,userData:any}) => {
    const [commentText, setCommentText] = useState("");
    const [showComment, setShowComment] = useState(false);
    const { user } = useAppSelector(state =>state.auth)
    const [commnet, { isSuccess, isLoading }] = useCommentPostMutation();
    const [likePost] = useLikePostMutation();

    const currentUserId = user?.user?._id;


    const hanldeLike = async (postId: number) => {
        const currentUser = {
          userId: currentUserId,
        };
    
        await likePost({ currentUser, postId });
      };

      useEffect(() => {
        if (isSuccess) {
          toast.success("Comment Added Successfull");
          setShowComment(false);
        }
      }, [isSuccess]);
    
    
      const handleComment = async (e: React.FormEvent) => {
        e.preventDefault();
        if(!commentText) return toast.error("comment is required");
        const postComment = {
          userId: user?.user?._id,
          comment: commentText,
        };
        const userPostId = post._id
        await commnet({ postComment, userPostId });
    
        //clear input
        setCommentText("");
      };
    
  return (
    <div className="mb-10">
    <div className="flex items-center justify-between gap-4">
      <div className="flex gap-4 items-center">
      {userData?.profile ? <img
          src={userData?.profile}
          className="w-[50px] h-[50px] rounded-full "
          alt=""
        />: <div className="w-[50px] h-[50px] rounded-full flex justify-center items-center font-medium text-lg border border-gray-300 dark:border-gray-600 dark:text-gray-500">{userData?.name?.slice(0,1)}</div> }  
        <div className="flex flex-col">
          <span className="text-lg font-semibold dark:text-gray-500">
            {userData?.name}
          </span>
          <span className="text-sm font-medium text-gray-500">
            {moment(post?.createdAt).fromNow()}
          </span>
        </div>
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
          className="text-4xl border border-gray-300 dark:border-gray-600 flex-1 px-2 flex justify-center items-center hover:bg-gray-300 duration-300 cursor-pointer"
        >
          {post?.likes?.includes(currentUserId) ? (
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
          <h5 className="text-xl font-semibold ml-2 dark:text-gray-500">
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
                  {comment?.commentBy?.profile ? (
                    <img
                      className="w-[40px] h-[40px] object-cover rounded-full border border-black"
                      src={comment?.commentBy?.profile}
                      alt=""
                    />
                  ) : (
                   <div className="w-[40px] h-[40px] object-cover rounded-full border border-black flex justify-center items-center font-medium">{ comment?.commentBy?.name?.slice(0, 1)}</div>
                  )}
                  <h4 className="text-sm font-medium text-gray-600">
                    {comment?.commentBy?.name}
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
  )
}

export default FriendCart
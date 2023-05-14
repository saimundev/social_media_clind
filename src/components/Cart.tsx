import React, { useEffect, useState } from "react";
import profileImage from "../assets/profile.png";
import moment from "moment";
import {
  MdOutlineFavoriteBorder,
  MdFavorite,
  MdOutlineInsertComment,
} from "react-icons/md";
import {
  useCommentPostMutation,
  useLikePostMutation,
} from "../store/services/postApi";
import { toast } from "react-hot-toast";
import { useAppSelector } from "../store/hooks";
import { useGetUserQuery } from "../store/services/authApi";
import { Link } from "react-router-dom";

const Cart = ({ post }: any) => {
  const [commentText, setCommentText] = useState("");
  const [showComment, setShowComment] = useState(false);
  const {data} = useGetUserQuery(post.userId)
  const [commnet, { isSuccess, isLoading, error }] = useCommentPostMutation();
  const [likePost, { error: err }] = useLikePostMutation();
  const { user } = useAppSelector((state) => state.auth);
  const id = user?.user?._id;



  useEffect(() => {
    err && toast.error("somethinge went wrong");
  }, [err]);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Comment Added Successfull");
      setShowComment(false);
    }
  }, [isSuccess]);

  useEffect(() => {
    error && toast.error("somethinge went wrong.Try again later");
  }, [error]);

  const hanldeLike = async (postId: number) => {
    const currentUser = {
      userId: id,
    };

    await likePost({ currentUser, postId });
  };

  const handleComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if(!commentText) return toast.error("comment is required");
    const postComment = {
      userId: id,
      comment: commentText,
    };
    const userPostId = post._id;
    await commnet({ postComment, userPostId });

    //clear input
    setCommentText("");
  };

  return (
    <div className="mt-14">
      <div className="flex items-center gap-4">
       {data?.profile ? <img src={data?.profile} alt="" className="w-[50px] h-[50px] rounded-full " /> : <img
          src={profileImage}
          className="w-[50px] h-[50px] rounded-full "
          alt=""
        />} 
        <div className="flex flex-col">
        {user?.user?._id === post?.userId ?<Link to="/profile"> <span className="text-lg font-semibold dark:text-gray-500">{data?.name}</span></Link> :<Link to={`/friend-profile/${post?.userId}`}> <span className="text-lg font-semibold dark:text-gray-500">{data?.name}</span></Link> } 
          <span className="text-sm font-medium text-gray-500">
            {moment(post.createdAt).fromNow()}
          </span>
        </div>
      </div>
      <h1 className="text-md font-medium py-4 dark:text-gray-500">{post.post}</h1>
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
          {post?.likes?.includes(id) ? (
            <MdFavorite style={{ color: "red" }} />
          ) : (
            <MdOutlineFavoriteBorder className="dark:text-gray-700"/>
          )}
          <span className="text-xl ml-2 font-medium text-red-500">
            {post?.likes?.length > 0 ? post?.likes?.length : ""}
          </span>
        </div>
        <div
          onClick={() => setShowComment((prev) => !prev)}
          className="text-4xl border dark:text-gray-500 dark:border-gray-700 dark:hover:bg-gray-700 border-gray-300 flex-1 flex justify-center hover:bg-gray-300 duration-300 cursor-pointer"
        >
          <MdOutlineInsertComment />
          <h5 className="text-xl font-semibold ml-2">
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
          <div >
            {post?.comments?.map((com: any) => (
              <div className="mb-4">
                <div className="flex gap-3 items-center">
                  {com?.commentBy?.profile ? (
                    <img
                      className="w-[40px] h-[40px] object-cover rounded-full border border-black"
                      src={com.commentBy.profile}
                      alt=""
                    />
                  ) : (
                    com?.commentBy?.name?.slice(0, 1)
                  )}
                  <h4 className="text-sm font-medium text-gray-600">{com.commentBy.name}</h4>
                </div>
                <h2 className="text-md font-semibold mt-1">{com.comment}</h2>
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

export default Cart;

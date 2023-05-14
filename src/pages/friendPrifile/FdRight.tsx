import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
  useGetFriendQuery,
  useGetUserQuery,
  useUserFolllowMutation,
  useUserUnFolllowMutation
} from "../../store/services/authApi";
import profileImage from "../../assets/profile.png";
import { useAppSelector } from "../../store/hooks";
import { toast } from "react-hot-toast";
import FdLoding from "../../components/FdLoding";

const FdRight = () => {
  const { id } = useParams();
  const { user } = useAppSelector((state) => state.auth);
  const userId = user?.user?._id;
  const { data, isLoading } = useGetFriendQuery(id);
  const [follow, { error, }] =
    useUserFolllowMutation();
    const { data: userData} = useGetUserQuery(userId);
    console.log("follow",userData)

    const [unFollow,{error:err}] = useUserUnFolllowMutation();

  useEffect(() => {
    error && toast.error((error as any)?.data?.message);
  }, [error]);

  useEffect(() => {
    err && toast.error((err as any)?.data?.message);
  }, [err]);

console.log(userData?.followings?.includes(userId))
  
  const hanldeFollow = async () => {
    const currentUser = {
      userId:userId
    }
    await follow({ currentUser, id });
  };

  const hanldeUnFollow = async()=>{
    const currentUser = {
      userId:userId
    }

    await unFollow({currentUser,id})
  }
  return (
    <div className="">
      <div className="text-center mt-10">
       {userData?.followings?.includes(id) ? <button
          className="bg-green-500 px-10 py-2 dark:bg-gray-600 dark:text-gray-300  rounded font-medium text-md text-white"
          onClick={hanldeUnFollow}
        >
          unFollow
        </button> :  <button
          className="bg-green-500 dark:bg-gray-600 dark:text-gray-300 px-10 py-2 rounded font-medium text-md text-white"
          onClick={hanldeFollow}
        >
          Followed
        </button>}
       

        
      </div>
      <h1 className="text-lg font-medium mt-12">Friend List</h1>
      {isLoading && <FdLoding/>}
      <div className="grid grid-cols-2 gap-4 mt-2">
        {data?.length
          ? data.map((item: any) => (
              <Link to={`/friend-profile/${item._id}`}>
                <div className="border border-gray-300 dark:border-gray-700 rounded p-3 cursor-pointer">
                  <img
                    src={item.image ? item.image : profileImage}
                    alt=""
                    className="w-[60px] h-[60px] border border-green-500 rounded-full mx-auto"
                  />
                  <h1 className="text-md font-medium dark:text-gray-500 text-green-500 text-center mt-2">
                    {item.name}
                  </h1>
                </div>
              </Link>
            ))
          : <div className="">NO FRIEND</div> }
      </div>
    </div>
  );
};

export default FdRight;

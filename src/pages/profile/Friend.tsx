
import { useAppSelector } from "../../store/hooks";
import profileImage from "../../assets/profile.png";
import { useGetFriendQuery } from "../../store/services/authApi";
import { Link } from "react-router-dom";
import FdLoding from "../../components/FdLoding";
const Friend = () => {
  const { user } = useAppSelector((state) => state.auth);
  const id = user?.user?._id
  console.log("id",id)
  const { data, isLoading } = useGetFriendQuery(id);
  console.log("data",data)

  if(isLoading) return <FdLoding/>

  return (
    <div className="">

      <div className="grid grid-cols-2 gap-4 mt-2">
        {data?.length
          ? data.map((item: any) => (
              <Link to={`/friend-profile/${item._id}`}>
                <div className="border border-gray-300 dark:border-gray-600 rounded p-3 cursor-pointer">
                  <img
                    src={item.image ? item.image : profileImage}
                    alt=""
                    className="w-[60px] h-[60px] border border-green-500 rounded-full mx-auto"
                  />
                  <h1 className="text-md font-medium text-green-500 text-center mt-2">
                    {item.name}
                  </h1>
                </div>
              </Link>
            ))
          : <div className=" font-semibold text-md">No Friend Yet</div>}
      </div>
    </div>
  );
};

export default Friend;

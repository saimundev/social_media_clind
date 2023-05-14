import { useState } from "react";
import { useAllUserQuery } from "../../store/services/authApi";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";
import FdListLoding from "../../components/FdListLoding";
const Right = () => {
  const [search,setSearch] =useState("");
  const { user } = useAppSelector((state:any) =>state.auth)
  const { data, isLoading } = useAllUserQuery(search);
  const id = user?.user?._id;
  
  const filterUser = data?.filter((friend:any) =>friend._id !== id);

  return (
    <div className="">
      <h1 className="font-bold text-md uppercase text-green-500 mb-4 dark:text-gray-500">All Users</h1>
      <div className="mb-4">
        <input
          type="search"
          name=""
          placeholder="Search By Name..."
          id=""
          onChange={(e)=>setSearch(e.target.value)}
          value={search}
          className="w-full font-medium text-sm p-2 border dark:bg-gray-700 dark:border-gray-600 border-gray-300 rounded outline-none"
        />
      </div>

      {isLoading ?  <FdListLoding/> : filterUser?.length
        ? filterUser.map((item: any) => (
            <div className="">
              <Link to={`/friend-profile/${item._id}`}>
              <div className="flex items-center gap-4 mb-2 cursor-pointer rounded dark:hover:bg-gray-600 hover:bg-gray-200">
                <div className="w-[40px] h-[40px] rounded-full border border-gray-300 flex justify-center items-center">
                  {item.profile ? (
                    <img
                      src={item.profile}
                      alt="Profile"
                      className="w-[40px] h-[40px] rounded-full object-cover"
                    />
                  ) : (
                    <h1 className="text-lg font-medium dark:text-gray-500">{item.name?.slice(0, 1)}</h1>
                  )}
                </div>
                <h1 className="text-md font-medium dark:text-gray-500">{item.name}</h1>
              </div>
              </Link>
            </div>
          ))
        : "no data"}
    </div>
  );
};

export default Right;
